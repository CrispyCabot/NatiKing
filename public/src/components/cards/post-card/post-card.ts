import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "post-card",
  data() {
    return {
      authorName: "No Author Found",
      themedStyle: { backgroundColor: "#00f" },
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
    this.themedStyle = { backgroundColor: this.getPrimaryColor };
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
