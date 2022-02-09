import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";

export default defineComponent({
  name: "custom-footer",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getIsLoggedIn",
      "getLogo",
      "getPrimaryColor",
      "getInvertedLogo",
    ]),
  },
  created() {
    this.updateCSS();
  },
  methods: {
    redirect(link: string) {
      if (link == "top") {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      } else {
        this.$router.push(link);
      }
    },
    getLogoSrc(url: string) {
      if (url.includes("twitter")) {
        return LogoIcons.TWITTER;
      } else if (url.includes("facebook")) {
        return LogoIcons.FACEBOOK;
      } else if (url.includes("linkedin")) {
        return LogoIcons.LINKEDIN;
      } else if (url.includes("instagram")) {
        return LogoIcons.INSTAGRAM;
      }
      return LogoIcons.DEFAULT;
    },
    redirectExternal(link: string) {
      if (!link.includes("https")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    },
    updateCSS() {
      const css = `
      .footer-container .flex-container {
      background-color: ${this.getPrimaryColor};
    }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
