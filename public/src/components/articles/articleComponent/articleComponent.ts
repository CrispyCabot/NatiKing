import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "article-component",
  data() {
    return {
      postInfo: {
        owner_id: "",
        image_path: "",
      },
      authorName: "No Author Found",
      authorID: "",
      imagePath: "default.png",
    };
  },
  props: {
    postID: { type: String, default: () => "" },
  },
  async created() {
    this.postInfo = await this.fetchPostById(this.postID);
    const writer = await this.fetchUserById(this.postInfo.owner_id);
    this.authorName = writer.name;
    if (this.postInfo.image_path != null) {
      this.imagePath = this.postInfo.image_path;
    }
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchPostById", "fetchUserById"]),
    redirect(link: string) {
      this.$router.push(link);
    },
  },
});
