// @ts-nocheck
import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "loading-bar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
  },
  mounted() {
    let i = 0;
    if (i == 0) {
      i = 1;
      const elem = document.getElementById("myBar");
      let width = 0;
      const id = setInterval(() => {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = `Loading ${width}%`;
        }
      }, 40);
    }
  },
});
