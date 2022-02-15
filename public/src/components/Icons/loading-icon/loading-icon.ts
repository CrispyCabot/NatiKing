import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "loading-icon",
  data() {
    return {
      request: "" as any,
      canvas: "" as any,
      imgSrc: require("@/assets/nk-tiny.png"),
      img: "" as any,
      velX: 10,
      velY: 0,
      currX: 0,
      currY: 0,
      width: 10,
    };
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
  },
  created() {
    window.addEventListener("keydown", this.checkKey);
  },
  mounted() {
    const canvas: any = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    this.canvas = ctx;
    this.img = new Image();
    this.img.src = this.imgSrc;
    this.animate();
  },
  methods: {
    animate() {
      this.request = setTimeout(() => {
        requestAnimationFrame(this.animate);
      }, 50);
      if (
        this.currX + this.width * 2 > this.canvas.canvas.width ||
        this.currX < 0
      ) {
        console.log(this.currX);
        this.velX = -this.velX;
      }

      if (
        this.currY + this.width * 2 > this.canvas.canvas.height ||
        this.currY < 0
      ) {
        this.velY = -this.velY;
      }

      this.currX += this.velX;
      this.currY += this.velY;
      this.draw();
    },
    draw() {
      this.canvas.clearRect(
        0,
        0,
        this.canvas.canvas.width,
        this.canvas.canvas.height
      );
      this.canvas.drawImage(this.img, this.currX, this.currY, 20, 20);
    },
    checkKey(e: any) {
      e = e || window.event;
      const element: any = document.getElementById("img");
      if (e.keyCode == "38") {
        this.velY = -10;
        this.velX = 0;
        e.preventDefault();
      } else if (e.keyCode == "40") {
        this.velY = 10;
        this.velX = 0;
        e.preventDefault();
      } else if (e.keyCode == "37") {
        this.velY = 0;
        this.velX = -10;
        e.preventDefault();
      } else if (e.keyCode == "39") {
        this.velY = 0;
        this.velX = 10;
        e.preventDefault();
      }
    },
  },
  unmounted() {
    window.removeEventListener("keydown", this.checkKey);
  },
});
