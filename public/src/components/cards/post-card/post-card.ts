import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "row-card",
  props: {
    title: { type: String, default: () => "Title here" },
    author: { type: String, default: () => "Joe McJoeFace" },
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
});
