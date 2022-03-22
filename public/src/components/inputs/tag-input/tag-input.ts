import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";
import { shadeColor } from "@/utils/globalFunctions";
import { PropType } from "vue";

export default defineComponent({
  name: "tag-input",
  data() {
    return {
      tags: "",
      tagsArray: [] as string[],
    };
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser", "getPrimaryColor"]),
  },
  async created() {
    this.updateCSS();
    this.tagsArray = this.modelValue;
  },
  methods: {
    ...mapActions(["fetchUserById", "deleteSocial"]),
    formatTags() {
      if (
        (this.tags.includes(" ") || this.tags.includes(",")) &&
        this.tags.length > 1
      ) {
        let tag = this.tags.trim();
        tag = tag.toLowerCase();
        console.log(tag);
        this.tagsArray.push(tag);
        this.tags = "";
        this.$emit("update:modelValue", this.tagsArray);
      }
    },
    removeTag(tag: string) {
      this.tagsArray = this.tagsArray.filter((e) => e != tag);
      this.$emit("update:modelValue", this.tagsArray);
    },
    updateCSS() {
      const css = `
      .tag-input .tags .tag p {
        background-color: ${this.getPrimaryColor};
      }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
  props: {
    modelValue: { type: Array as PropType<string[]>, default: () => [] },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
