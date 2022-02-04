import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";

export default defineComponent({
  name: "modal-input",
  data() {
    return {
      inp: "",
    };
  },
  props: {
    showModal: { type: Boolean, default: () => false },
    title: { type: String, default: () => "" },
    prompt: { type: String, default: () => "" },
    placeholder: { type: String, default: () => "" },
    name: { type: String, default: () => "" },
    type: { type: String, default: () => "" },
  },
  async created() {
    this.updateCSS();
  },
  computed: {
    ...mapGetters(["getPrimaryColor"]),
  },
  methods: {
    emitClick() {
      this.$emit("clicked", this.inp);
      this.inp = "";
    },
    cancel() {
      this.$emit("clicked", "cancel");
      this.inp = "";
    },
    updateCSS() {
      const css = `
      .modal-input {
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
