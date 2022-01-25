import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "post-card",
  data() {
    return {
      authorName: "No Author Found",
    };
  },
  props: {
    title: { type: String, default: () => "No Title Found" },
    authorID: { type: String, default: () => "No Author Found" },
    commentAmt: { type: Number, default: () => 0 },
    likeAmt: { type: Number, default: () => 0 },
    tags: { type: Array, default: () => [] },
    imagePath: { type: String, default: () => "default.png" },
  },
  async created() {
    this.authorName = (await this.fetchUserById(this.authorID)).name;
    const css = `
    .post-card .rhs .tags p {
      background-color: ${this.getPrimaryColor};
    }
    .post-card::before {
      background-color: ${this.getPrimaryColor};
    }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(style);
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
  },
  methods: {
    ...mapActions(["fetchUserById"]),
    redirect(link: string) {
      this.$router.push(link);
    },
  },
});
