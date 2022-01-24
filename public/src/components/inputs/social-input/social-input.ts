import { defineComponent } from "@vue/runtime-core";
import LogoIcons from "@/utils/socialIcons";

export default defineComponent({
  name: "social-input",
  data() {
    return {};
  },
  methods: {
    getLogoSrc(url: string) {
      if (url.includes("twitter")) {
        return LogoIcons.TWITTER;
      } else if (url.includes("facebook")) {
        return LogoIcons.FACEBOOK;
      } else if (url.includes("linkedin")) {
        return LogoIcons.LINKEDIN;
      }
      return LogoIcons.DEFAULT;
    },
    redirectExternal(link: string) {
      if (!link.includes("https")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    },
  },
  props: {
    url: { type: String, default: () => "" },
    isEditing: { type: Boolean, default: () => false },
  },
});
