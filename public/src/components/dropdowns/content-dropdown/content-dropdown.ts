import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";

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
  methods: {
    closeIsOpen() {
      this.isOpen = false;
    },
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
    shadeColor(color: string, percent: number): string {
      let rgb = [];
      rgb.push(parseInt(color.substring(1, 3), 16));
      rgb.push(parseInt(color.substring(3, 5), 16));
      rgb.push(parseInt(color.substring(5, 7), 16));

      rgb = rgb.map((a) => {
        console.log(a);
        let val = Math.round(a * percent);
        val = val > 255 ? 255 : val;
        val = val < 0 ? 0 : val;
        console.log(val);
        return val;
      });

      const stringRGB = rgb.map((a) => {
        let stringVal = a.toString(16);
        if (stringVal.length == 1) stringVal = "0" + stringVal;
        return stringVal;
      });
      console.log(rgb);
      console.log(stringRGB);
      return "#" + stringRGB.join("");
    },
  },
  watch: {
    getPrimaryColor() {
      const darkerColor = this.shadeColor(this.getPrimaryColor, 0.8);
      const lighterColor = this.shadeColor(this.getPrimaryColor, 3);
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
});
