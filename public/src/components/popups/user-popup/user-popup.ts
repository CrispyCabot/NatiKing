import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  name: "user-popup",
  props: {
    alignment: { type: String, default: "right" },
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInPlayer"]),
  },
  methods: {
    ...mapActions(["logUserOut"]),
    ...mapMutations(["updateIsLoggedIn", "updateLoggedInPlayer"]),
    async redirectLink(link: string) {
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
