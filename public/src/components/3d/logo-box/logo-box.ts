// @ts-nocheck
import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default defineComponent({
  name: "logo-box",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
  },
  mounted() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.x = -4;
    camera.position.y = 3;
    camera.position.z = 3;

    renderer.render(scene, camera);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);
    const axesHelper = new THREE.AxesHelper();
    // scene.add(lightHelper, gridHelper, axesHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    function addStar() {
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(200)
      .fill()
      .forEach(addStar);

    const loader = new THREE.TextureLoader();
    const mats = [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzC1ZsInagPYk4pJroCTazz7XXQB4f6kHVOA&usqp=CAU", //Mr Red"
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Cincinnati_Reds_Cap_Insignia.svg/838px-Cincinnati_Reds_Cap_Insignia.svg.png", //Reds logo
      "https://lp-cms-production.imgix.net/2021-09/Cincinnati%20bridge.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=75&dpr=1", //Cincy pic
      "https://www.gannett-cdn.com/presto/2019/08/18/PCIN/2b27a0c9-c99b-40d0-b303-e7ada6ee4097-cindc5bk-5ib657ydin81f5zg0d96_original_1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Cincinnati_Bengals_logo.svg/1280px-Cincinnati_Bengals_logo.svg.png", //Bengals logo
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/Great_American_Ball_Park_%2815561187833%29.jpg",
    ].map((pic) => {
      return new THREE.MeshLambertMaterial({
        map: loader.load(pic),
      });
    });

    const logosBox = new THREE.Mesh(new THREE.BoxBufferGeometry(3, 3, 3), mats);
    logosBox.position.x = 0.5;
    logosBox.position.y = -2;
    logosBox.position.z = -3;

    scene.add(logosBox);

    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;

      camera.position.z = t * -0.005;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0001;
    }

    document.body.onscroll = moveCamera;
    moveCamera();

    function animate() {
      requestAnimationFrame(animate);

      logosBox.rotation.x -= 0.005;
      logosBox.rotation.z += 0.003;
      logosBox.rotation.y += 0.003;

      renderer.render(scene, camera);
    }

    animate();
  },
  methods: {},
});
