import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { shadeColor } from "@/utils/globalFunctions";
import { redirectExternal } from "@/utils/globalFunctions";

export default defineComponent({
  name: "share-socials",
  data() {
    return {
      twitterTweetUrl: "https://twitter.com/intent/tweet?text=",
      linkedInURL: "https://www.linkedin.com/sharing/share-offsite/?url=",
    };
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
  },
  created() {
    this.updateCSS();
  },
  props: {
    message: { type: String, default: () => "" },
  },
  methods: {
    updateCSS() {
      const darkerColor = shadeColor(this.getPrimaryColor, 0.8);
      const css = `
        .share-socials_icon {
          color: ${this.getPrimaryColor};
        }
        .share-socials_icon:hover {
          color: ${darkerColor};
        }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    shareTwitter() {
      const message =
        this.message + " https://natiking.com" + this.$route.fullPath;
      redirectExternal(this.twitterTweetUrl + encodeURIComponent(message));
    },
    shareLinkedin() {
      const message = "https://natiking.com" + this.$route.fullPath;
      redirectExternal(this.linkedInURL + encodeURIComponent(message));
    },
    shareLink() {
      const message = "https://natiking.com" + this.$route.fullPath;
      window.prompt("Copy to Clipboard: Ctrl + C, Enter", message);
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
