import { defineComponent } from "@vue/runtime-core";
import { mapGetters, mapMutations } from "vuex";
import { mapActions } from "vuex";
import CommentCard from "@/components/cards/comment-card/index.vue";
import TextEditor from "@/components/text-editor/index.vue";
import { TOAST_TYPES } from "@/utils/toastTypes";

export default defineComponent({
  name: "article-component",
  data() {
    return {
      postInfo: {
        owner_id: "",
        image_path: "",
        likes: [] as string[],
        tags: [],
        comments: [] as object[],
        date: Object(),
      },
      authorName: "No Author Found",
      authorID: "",
      imagePath: "default.png",
      numLikes: 0,
      commentContent: "",
      isLiked: false,
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
    this.isLiked = this.postInfo.likes.includes(this.getLoggedInUser._id);
    this.updateCSS();
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
    ...mapMutations(["updateGlobalToast"]),
    redirect(link: string) {
      this.$router.push(link);
    },
    updateCSS() {
      const css = `
      .article-component .tags p {
        background-color: ${this.getPrimaryColor};
      }
      .liked {
        color: ${this.getPrimaryColor} !important;
      }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    async likePost() {
      this.postInfo.likes.push(this.getLoggedInUser._id);
      const newLikes: string[] = this.postInfo.likes;
      const res = await this.updatePost({
        postId: this.postID,
        updates: { likes: newLikes },
      });
      if (res.status == 200) {
        this.isLiked = true;
        this.numLikes += 1;
        this.postInfo = await this.fetchPostById(this.postID);
      } else {
        this.updateGlobalToast({
          message: "Couldn't like post",
          type: TOAST_TYPES.Error,
          duration: 3000,
          isShowing: true,
        });
      }
    },
    async unlikePost() {
      const newLikes = this.postInfo.likes.filter(
        (id: string) => id !== this.getLoggedInUser._id
      );

      const res = await this.updatePost({
        postId: this.postID,
        updates: { likes: newLikes },
      });
      if (res.status == 200) {
        this.isLiked = false;
        this.numLikes -= 1;
        this.postInfo = await this.fetchPostById(this.postID);
      } else {
        this.updateGlobalToast({
          message: "Couldn't unlike post",
          type: TOAST_TYPES.Error,
          duration: 3000,
          isShowing: true,
        });
      }
    },
    generateKey(id: string, comment: string): string {
      return id + comment;
    },
    async postComment() {
      this.postInfo.comments.push({
        user_id: this.getLoggedInUser._id,
        comment: this.commentContent,
      });
      const newComments: object[] = this.postInfo.comments;
      const res = await this.updatePost({
        postId: this.postID,
        updates: { comments: newComments },
      });
      if (res.status == 200) {
        this.postInfo = await this.fetchPostById(this.postID);
        this.commentContent = "";
      } else {
        this.updateGlobalToast({
          message: "Something went wrong, couldn't comment",
          type: TOAST_TYPES.Error,
          duration: 3000,
          isShowing: true,
        });
      }
    },
    async deleteComment(commentId: string) {
      const newComments = this.postInfo.comments.filter(
        (comment: any) => comment._id != commentId
      );

      const res = await this.updatePost({
        postId: this.postID,
        updates: { comments: newComments },
      });
      if (res.status == 200) {
        this.postInfo = await this.fetchPostById(this.postID);
      } else {
        this.updateGlobalToast({
          message: "Couldn't delete comment",
          type: TOAST_TYPES.Error,
          duration: 3000,
          isShowing: true,
        });
      }
    },
    async updateComment(commentId: string, newContent: any) {
      this.postInfo.comments.map((comment: any) => {
        if (comment._id == commentId) {
          comment.comment = newContent;
        }
      });

      const res = await this.updatePost({
        postId: this.postID,
        updates: { comments: this.postInfo.comments },
      });
      if (res.status == 200) {
        this.postInfo = await this.fetchPostById(this.postID);
        this.commentContent = "";
      } else {
        this.updateGlobalToast({
          message: "Something went wrong, couldn't edit comment",
          type: TOAST_TYPES.Error,
          duration: 3000,
          isShowing: true,
        });
      }
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
