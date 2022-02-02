import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CommentCard from "@/components/cards/comment-card/index.vue";

export default defineComponent({
  name: "article-component",
  data() {
    return {
      postInfo: {
        owner_id: "",
        image_path: "",
        likes: [],
        tags: [],
        comments: [],
        date: Object(),
      },
      authorName: "No Author Found",
      authorID: "",
      imagePath: "default.png",
      numLikes: 0,
      isLiked: false,
    };
  },
  components: {
    CommentCard,
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
    if (this.postInfo.likes != null) {
      this.numLikes = this.postInfo.likes.length;
    }
    this.updateCSS();
    if (this.getLoggedInUser._id in this.postInfo.likes) {
      this.isLiked = true;
    }
  },
  computed: {
    ...mapGetters([
      "getIsLoggedIn",
      "getLogo",
      "getPrimaryColor",
      "getLoggedInUser",
    ]),
    date(): string {
      const date = new Date(this.postInfo.date);
      return (
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
    },
  },
  methods: {
    ...mapActions(["fetchPostById", "fetchUserById"]),
    redirect(link: string) {
      this.$router.push(link);
    },
    updateCSS() {
      const css = `
      .article-component .tags p {
        background-color: ${this.getPrimaryColor};
      }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    likePost() {
      this.isLiked = true;
    },
    unlikePost() {
      this.isLiked = false;
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
