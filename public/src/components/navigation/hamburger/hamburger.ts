import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "hamburger",
  props: {
    links: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isLinksOpen: false,
    };
  },
  methods: {
    closeLinks() {
      this.isLinksOpen = false;
    },
    toggleLinks() {
      this.isLinksOpen = !this.isLinksOpen;
    },
    redirectLink(link: any) {
      this.$router.push(link.redirect);
      this.closeLinks();
    },
    updateCSS() {
      const css = `
      .hamburger-container_links {
        background-color: ${this.getPrimaryColor};
      }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
  async created() {
    this.updateCSS();
  },
  computed: {
    ...mapGetters(["getPrimaryColor"]),
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
