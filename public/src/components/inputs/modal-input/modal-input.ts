import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";

export default defineComponent({
  name: "modal-input",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser"]),
  },
  methods: {
    ...mapActions(["fetchUserById", "deleteSocial"]),
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
    async removeSocial(url: string) {
      const res = await this.deleteSocial({
        userId: this.getLoggedInUser._id,
        socialURL: url,
      });
    },
  },
  props: {
    url: { type: String, default: () => "" },
    isEditing: { type: Boolean, default: () => false },
  },
});
