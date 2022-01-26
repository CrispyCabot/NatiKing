import { defineComponent } from "@vue/runtime-core";
import PaginationMixin from "@/mixins/pagination-mixin";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TOAST_TYPES } from "@/utils/toastTypes";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { shadeColor } from "@/utils/globalFunctions";
import LogoIcons from "@/utils/socialIcons";
import TextEditor from "@/components/text-editor/index.vue";

export default defineComponent({
  name: "create-post",
  components: {
    TextEditor,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      content: "Enter some text here...",
      tags: "",
      tagsArray: [] as string[],
      title: "",
    };
  },
  async created() {
    this.updateCSS();
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser", "getPrimaryColor"]),
  },
  methods: {
    ...mapActions([
      "fetchUserById",
      "updateUserSettings",
      "addSocial",
      "createNewPost",
    ]),
    ...mapMutations(["updateGlobalToast"]),
    formatTags() {
      if (
        (this.tags.includes(" ") || this.tags.includes(",")) &&
        this.tags.length > 1
      ) {
        this.tagsArray.push(this.tags.trim());
        this.tags = "";
      }
    },
    removeTag(tag: string) {
      this.tagsArray = this.tagsArray.filter((e) => e != tag);
    },
    updateCSS() {
      const css = `
      .create-post .tags .tag p {
        background-color: ${this.getPrimaryColor};
      }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    redirect(link: string) {
      if (link == "top") {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      } else {
        this.$router.push(link);
      }
    },
    async createPost() {
      if (this.title == "" || this.content == "") {
        this.updateGlobalToast({
          message: "Please include a title and description",
          type: TOAST_TYPES.Error,
          duration: 5000,
          isShowing: true,
        });
      } else {
        const res = await this.createNewPost({
          ownerID: this.getLoggedInUser._id,
          title: this.title,
          description: this.content,
          tags: this.tagsArray,
        });

        if (res.status == 200) {
          this.$router.push("/articles/" + res.post._id);
        }

        this.updateGlobalToast({
          message: res.message,
          type: res.status == 400 ? TOAST_TYPES.Error : TOAST_TYPES.Success,
          duration: 5000,
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
