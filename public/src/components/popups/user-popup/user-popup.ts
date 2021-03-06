import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  name: "user-popup",
  props: {
    alignment: { type: String, default: "right" },
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser", "getPrimaryColor"]),
  },
  methods: {
    ...mapActions(["logUserOut"]),
    ...mapMutations(["updateIsLoggedIn", "updateLoggedInUser"]),
    async redirectLink(link: string, refresh = false) {
      this.$emit("link-click");

      if (link == "/logout") {
        await this.logUserOut();
      } else if (link == "/login") {
        this.$router.push(
          `${link}?redirect=${encodeURIComponent(this.$route.path)}`
        );
      } else {
        this.$router.push(link);
      }
    },
  },
});
