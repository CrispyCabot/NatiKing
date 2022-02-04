import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";
import { shadeColor } from "@/utils/globalFunctions";

export default defineComponent({
  name: "social-input",
  data() {
    return {
      iconClass: "fab fa-twitter-square fa-4x",
    };
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser", "getPrimaryColor"]),
  },
  async created() {
    //Update icon class
    this.updateLogoClass();
    this.updateCSS();
  },
  methods: {
    ...mapActions(["fetchUserById", "deleteSocial"]),
    updateLogoClass() {
      if (this.url.includes("twitter")) {
        this.iconClass = "fab fa-twitter-square fa-4x";
      } else if (this.url.includes("facebook")) {
        this.iconClass = "fab fa-facebook-square fa-4x";
      } else if (this.url.includes("linkedin")) {
        this.iconClass = "fab fa-linkedin fa-4x";
      } else if (this.url.includes("instagram")) {
        this.iconClass = "fab fa-instagram-square fa-4x";
      }
      return "fas fa-ban";
    },
    redirectExternal(link: string) {
      if (!link.includes("https")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    },
    async removeSocial(url: string) {
      const res = await this.deleteSocial({
        userId: this.getLoggedInUser._id,
        socialURL: url,
      });
    },
    updateCSS() {
      const darkerColor = shadeColor(this.getPrimaryColor, 0.8);
      const css = `
        .fab {
          color: ${this.getPrimaryColor};
        }
        .fab:hover {
          color: ${darkerColor};
        }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
  props: {
    url: { type: String, default: () => "" },
    isEditing: { type: Boolean, default: () => false },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
