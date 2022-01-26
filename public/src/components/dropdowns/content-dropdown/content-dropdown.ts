import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import { shadeColor } from "@/utils/globalFunctions";

export default defineComponent({
  name: "content-dropdown",
  props: {
    label: { type: String, default: "" },
    iconClass: { type: String, default: "" },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["getPrimaryColor"]),
  },
  created() {
    this.updateCSS();
  },
  methods: {
    closeIsOpen() {
      this.isOpen = false;
    },
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
    updateCSS() {
      const darkerColor = shadeColor(this.getPrimaryColor, 0.8);
      const lighterColor = shadeColor(this.getPrimaryColor, 3);
      const css = `
    .content-dropdown_label {
      background-color: ${this.getPrimaryColor};
      border-bottom: 0.2rem solid ${lighterColor};
    }
    .content-dropdown_content {
      border: 0.2rem solid ${lighterColor};
    }
    .content-dropdown_label:hover {
      background-color: ${darkerColor};
      border-color: ${darkerColor};
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
