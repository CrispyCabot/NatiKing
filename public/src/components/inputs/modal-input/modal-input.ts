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
  methods: {
    emitClick() {
      this.$emit("clicked", this.inp);
    },
  },
});
