import api from "@/api/api";
import Navbar from "@/components/navigation/navbar/index.vue";
import CustomFooter from "@/components/navigation/custom-footer/index.vue";
import Toast from "@/components/popups/toast/index.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { defineComponent } from "@vue/runtime-core";
import { shadeColor } from "@/utils/globalFunctions";
import { useActiveMeta, useMeta } from "vue-meta";

export default defineComponent({
  name: "app",
  components: {
    Navbar,
    CustomFooter,
    Toast,
  },
  // setup() {
  //   const { meta } = useMeta({
  //     title: "Nati King | Home",
  //     nothing: "",
  //     htmlAttrs: {
  //       lang: "en",
  //       amp: true,
  //     },
  //     //this doesn't work but its supposed to I think idk just gonna leave it
  //     meta: [
  //       { name: "twitter:card", vmid: "twitter:card", content: "summary" },
  //       {
  //         name: "twitter:url",
  //         vmid: "twitter:url",
  //         content: "https://natiking.com",
  //       },
  //       {
  //         name: "twitter:title",
  //         vmid: "twitter:title",
  //         content: "Nati King | Home",
  //       },
  //       {
  //         name: "twitter:description",
  //         vmid: "twitter:description",
  //         content: "View the latest articles",
  //       },
  //       {
  //         name: "twitter:image",
  //         content: "https://natiking.com/img/default.9d5bda9c.png",
  //       },
  //     ],
  //   });

  //   const metadata = useActiveMeta();
  //   return { metadata };
  // },
  data() {
    return {
      isMobileView: true,
      isMaxViewportHeight: true,
      backgroundSvg: require("@/assets/photon.svg"),
      backgroundImg:
        "https://upload.wikimedia.org/wikipedia/en/c/c6/Super_Bowl_LVI_logo.png",
      isMounted: false,
    };
  },
  async created() {
    this.handleMeta();
    this.updateCSS();
    await this.retrieveRefreshToken()
      .then((res) => {
        if (res.ok) {
          this.updateIsLoggedIn(true);
          this.updateLoggedInUser(res.user);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.accessToken}`;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await this.fetchColors().then((colors: any) => {
      this.updatePrimaryColor(colors[0].primaryColor);
    });
  },
  mounted() {
    this.setIsMobileView();
    window.addEventListener("resize", this.setIsMobileView);
    this.setIsMaxViewportHeight();
    window.addEventListener("resize", this.setIsMaxViewportHeight);
  },
  updated() {
    this.setIsMobileView();
    this.setIsMaxViewportHeight();
  },
  computed: {
    ...mapGetters([
      "getGlobalToastMessage",
      "getGlobalToastType",
      "getGlobalToastIsShowing",
      "getGlobalToastDuration",
      "getGlobalToastIsShowingOverride",
      "getAccessToken",
      "getMockOverride",
      "getWebSocketConnection",
      "getPrimaryColor",
    ]),
  },
  methods: {
    ...mapActions([
      "retrieveRefreshToken",
      "closeWebSocketConnection",
      "fetchColors",
    ]),
    ...mapMutations([
      "updateIsLoggedIn",
      "updateLoggedInUser",
      "updateGlobalToast",
      "setIsUsingMockData",
      "updatePrimaryColor",
    ]),
    handleMeta() {
      console.log("HERE: " + this.$route.fullPath);
      if (this.$route.path == "/") this.isMounted = true;
    },
    closingGlobalToast() {
      if (this.getGlobalToastIsShowing) {
        this.updateGlobalToast({
          isShowing: false,
        });
      }
    },
    updateCSS() {
      const darkerColor = shadeColor(this.getPrimaryColor, 0.8);
      const css = `
      .btn {
        background-color: ${this.getPrimaryColor};
      }
      .btn::before {
        background-color: ${darkerColor}
      }
      .article-editor-link {
        color: ${this.getPrimaryColor};
      }
      .article-editor-link:hover {
            cursor: pointer;
            color: ${darkerColor};
        }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    setIsMobileView() {
      this.isMobileView = Boolean(window.outerWidth <= 576);
    },
    setIsMaxViewportHeight() {
      const routerView = this.$refs.router_view as any;
      const routerViewBounds = routerView.getBoundingClientRect();
      const footerSpan = this.$refs.footer_element as any;
      const footerBounds = footerSpan.children[0].getBoundingClientRect();
      this.isMaxViewportHeight = Boolean(
        routerViewBounds.height + footerBounds.height >= window.outerHeight
      );
      if (!this.isMaxViewportHeight) {
        routerView.style.paddingBottom = footerBounds.height + "px";
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.setIsMobileView);
    window.removeEventListener("resize", this.setIsMaxViewportHeight);
  },
  watch: {
    $route() {
      if (this.getAccessToken) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.getAccessToken}`;
      }
      if (window.location.href.includes("mock") || this.getMockOverride)
        this.setIsUsingMockData(true);
      else this.setIsUsingMockData(false);
    },
    getPrimaryColor() {
      this.updateCSS();
    },
    metadata(newValue) {
      console.log("META UPDATED", newValue);
    },
  },
});
