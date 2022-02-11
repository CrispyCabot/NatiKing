import { defineComponent } from "@vue/runtime-core";
import { mapGetters, mapMutations } from "vuex";
import { mapActions } from "vuex";
import CommentCard from "@/components/cards/comment-card/index.vue";
import TextEditor from "@/components/editors/text-editor/index.vue";
import ArticleEditor from "@/components/editors/article-editor/index.vue";
import TagInput from "@/components/inputs/tag-input/index.vue";
import { TOAST_TYPES } from "@/utils/toastTypes";

export default defineComponent({
  name: "article-component",
  data() {
    return {
      postInfo: {
        _id: "",
        owner_id: "",
        image_path: "",
        likes: [] as string[],
        tags: [],
        title: "",
        comments: [] as object[],
        date: Object(),
        description: "",
      },
      authorName: "No Author Found",
      authorID: "",
      imagePath: "default.png",
      numLikes: 0,
      commentContent: "",
      isLiked: false,
      isEditing: false,
      newArticleContent: "",
      titleInput: "",
      tagsInput: [],
      tagsArray: [] as string[],
    };
  },
  components: {
    CommentCard,
    TextEditor,
    ArticleEditor,
    TagInput,
  },
  props: {
    postID: { type: String, default: () => "" },
  },
  async created() {
    this.postInfo = await this.fetchPostById(this.postID);
    this.setupFieldValues();
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
    // <meta name="twitter:card" content="summary" />
    // <meta name="twitter:url" content="https://natiking.com" />
    // <meta name="twitter:title" content="Nati King | Home" />
    // <meta name="twitter:description" content="View the latest posts" />
    // <meta name="twitter:image" content="https://natiking.com/img/default.9d5bda9c.png" />
    document
      .querySelector("meta[twitter:title]")
      ?.setAttribute("content", this.postInfo.title);
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
    ...mapActions([
      "fetchPostById",
      "fetchUserById",
      "updatePost",
      "deletePost",
    ]),
    ...mapMutations(["updateGlobalToast"]),
    redirect(link: string) {
      this.$router.push(link);
    },
    setupFieldValues() {
      this.newArticleContent = this.postInfo.description;
      this.titleInput = this.postInfo.title;
      this.tagsArray = JSON.parse(JSON.stringify(this.postInfo.tags));
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
      if (this.getIsLoggedIn) {
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
      } else {
        window.alert("You need to create an account to like posts!");
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
    deleteArticlePrompt() {
      if (confirm("Are you sure you want to delete this article?")) {
        this.deleteArticle();
      }
    },
    async deleteArticle() {
      const res = await this.deletePost(this.postID);
      if (res.status == 200) {
        this.$router.push("/");
        this.updateGlobalToast({
          message: "Article Successfully Deleted",
          type: TOAST_TYPES.Success,
          duration: 3000,
          isShowing: true,
        });
      } else {
        this.updateGlobalToast({
          message: "Something went wrong, couldn't delete Article",
          type: TOAST_TYPES.Error,
          duration: 3000,
          isShowing: true,
        });
      }
    },
    editArticle() {
      this.isEditing = true;
    },
    async saveArticle() {
      this.postInfo.description = this.newArticleContent;
      const res = await this.updatePost({
        postId: this.postID,
        updates: {
          description: this.postInfo.description,
          title: this.titleInput,
          tags: this.tagsArray,
        },
      });
      if (res.status == 200) {
        this.postInfo = await this.fetchPostById(this.postID);
        this.isEditing = false;
      } else {
        this.updateGlobalToast({
          message: "Something went wrong, couldn't save changes",
          type: TOAST_TYPES.Error,
          duration: 3000,
          isShowing: true,
        });
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.newArticleContent = this.postInfo.description;
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
