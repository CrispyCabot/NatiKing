import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import TextEditor from "@/components/editors/text-editor/index.vue";

export default defineComponent({
  name: "comment-card",
  components: {
    TextEditor,
  },
  data() {
    return {
      authorName: "No Author Found",
      writer: {
        _id: "",
        image_path: "",
        name: "",
      },
      imagePath: "default.png",
      isEditing: false,
      commentContent: "",
      imageSrc: require(`@/uploads/default.png`),
    };
  },
  props: {
    uid: { type: String, default: () => "No Title Found" },
    comment: { type: String, default: () => "default.png" },
  },
  async created() {
    this.writer = await this.fetchUserById(this.uid);
    this.authorName = this.writer.name;
    if (this.writer.image_path != "default.png") {
      this.imageSrc = this.writer.image_path;
    }
    this.commentContent = this.comment;
    this.updateCSS();
  },
  computed: {
    ...mapGetters([
      "getIsLoggedIn",
      "getLogo",
      "getLoggedInUser",
      "getPrimaryColor",
    ]),
  },
  methods: {
    ...mapActions(["fetchUserById", "updatePost"]),
    redirect(link: string) {
      this.$router.push(link);
    },
    deleteComment() {
      this.$emit("deleted");
    },
    saveComment() {
      this.$emit("edit", this.commentContent);
      this.isEditing = false;
    },
    editComment() {
      this.isEditing = true;
    },
    updateCSS() {
      const css = `
        .comment-card .rhs h5:hover {
          color: ${this.getPrimaryColor};
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
