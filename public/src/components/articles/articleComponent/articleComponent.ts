import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CommentCard from "@/components/cards/comment-card/index.vue";
import TextEditor from "@/components/text-editor/index.vue";

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
      commentContent: "",
    };
  },
  components: {
    CommentCard,
    TextEditor,
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
    ...mapActions(["fetchPostById", "fetchUserById", "updatePost"]),
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
    generateKey(id: string, comment: string): string {
      return id + comment;
    },
    async postComment() {
      Promise.resolve(this.postInfo.comments).then((newComments: any) => {
        console.log(newComments);
        newComments.push({
          user_id: this.getLoggedInUser._id,
          comment: this.commentContent,
        });
        const res = this.updatePost({
          postId: this.postID,
          updates: { comments: newComments },
        });
      });
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
