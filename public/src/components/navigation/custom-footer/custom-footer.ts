import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "custom-footer",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
  },
  methods: {
    redirect(link: string) {
      if (link == "top") {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      } else {
        this.$router.push(link);
      }
    },
  },
  watch: {
    getPrimaryColor() {
      const css = `
      .footer-container .flex-container {
      background-color: ${this.getPrimaryColor};
    }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
});
