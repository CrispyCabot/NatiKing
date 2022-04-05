import PostCard from "@/components/cards/post-card/index.vue";
import LoadingIcon from "@/components/Icons/loading-icon/index.vue";
import LoadingBar from "@/components/Icons/loading-bar/index.vue";
import SkeletonCard from "@/components/cards/skeleton-card/index.vue";
import TagInput from "@/components/inputs/tag-input/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "home",
  components: {
    PostCard,
    LoadingIcon,
    SkeletonCard,
    LoadingBar,
    TagInput,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      users: [],
      posts: [],
      isLoading: true,
      splicedPosts: [],
      tagsArray: [],
    };
  },
  async created() {
    this.isLoading = true;
    this.posts = await this.fetchPosts([]);
    this.splicedPosts = this.posts.splice(0, 10);
    this.isLoading = false;
    window.addEventListener("scroll", this.updateInfScroll);
  },
  computed: {
    userRows(): Array<Object> {
      return this.users.map((user: any) => {
        return {
          name: { text: user.first_name, type: "string" },
          id: { text: user._id, type: "hidden" },
        };
      });
    },
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    redirect(link: string) {
      this.$router.push(link);
    },
    isInViewPort(element: any) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    updateInfScroll() {
      const lastCard = Array.from(
        document.querySelectorAll(".post-card")
      ).pop();
      if (this.isInViewPort(lastCard)) {
        this.posts.splice(0, 10).map((item) => {
          this.splicedPosts.push(item);
        });
      }
    },
    async tagSearch() {
      this.posts = await this.fetchPosts(this.tagsArray);
      this.splicedPosts = this.posts.splice(0, 10);
    },
    test() {
      console.log("test called");
    },
  },
  unmounted() {
    window.removeEventListener("scroll", this.updateInfScroll);
  },
  watch: {
    tagsArray() {
      this.tagSearch();
    },
  },
});
