import { defineComponent } from "@vue/runtime-core";
import PaginationMixin from "@/mixins/pagination-mixin";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TOAST_TYPES } from "@/utils/toastTypes";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { shadeColor } from "@/utils/globalFunctions";
import LogoIcons from "@/utils/socialIcons";
import ArticleEditor from "@/components/editors/article-editor/index.vue";
import TagInput from "@/components/inputs/tag-input/index.vue";

export default defineComponent({
  name: "create-post",
  components: {
    ArticleEditor,
    TagInput,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      content: "Enter some text here...",
      tagsArray: [] as string[],
      title: "",
      visible: "yes",
    };
  },
  async created() {},
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
        console.log(this.visible === "yes");
        const res = await this.createNewPost({
          ownerID: this.getLoggedInUser._id,
          title: this.title,
          description: this.content,
          tags: this.tagsArray,
          visible: this.visible === "yes",
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
});
