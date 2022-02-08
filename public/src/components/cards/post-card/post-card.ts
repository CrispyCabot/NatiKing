import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "post-card",
  data() {
    return {
      authorName: "No Author Found",
      imageSrc: require(`@/uploads/${this.imagePath}`),
    };
  },
  props: {
    title: { type: String, default: () => "No Title Found" },
    authorID: { type: String, default: () => "No Author Found" },
    commentAmt: { type: Number, default: () => 0 },
    likeAmt: { type: Number, default: () => 0 },
    tags: { type: Array, default: () => [] },
    imagePath: { type: String, default: () => "default.png" },
    description: { type: String, default: () => "" },
  },
  async created() {
    this.authorName = (await this.fetchUserById(this.authorID)).name;
    this.updateCSS();
    console.log(this.description);
    const imgSrcIndex = this.description.indexOf('src="');
    console.log(imgSrcIndex);
    if (imgSrcIndex != -1) {
      let imgUrl = this.description.substring(imgSrcIndex + 5);
      imgUrl = imgUrl.substring(0, imgUrl.indexOf('"'));
      this.imageSrc = imgUrl;
    }
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
  },
  methods: {
    ...mapActions(["fetchUserById"]),
    redirect(link: string) {
      this.$router.push(link);
    },
    updateCSS() {
      const css = `
      .post-card .inner-post-card .rhs .tags p {
        background-color: ${this.getPrimaryColor};
      }
      .post-card .inner-post-card::before {
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
