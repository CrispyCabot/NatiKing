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
  props: {
    visibleArticles: { type: Boolean, default: () => true },
  },
  async created() {
    this.isLoading = true;
    this.posts = await this.fetchPosts({
      tags: [],
      visible: this.visibleArticles,
    });
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
    ...mapGetters(["getIsLoggedIn", "getLogo", "getLoggedInUser"]),
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
      this.posts = await this.fetchPosts({
        tags: this.tagsArray,
        visible: this.visibleArticles,
      });
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
    //Bad fix but idk weird stuff is happening this just reloads the whole page
    //So that switching between /invisibles and /home actually changes the content
    visibleArticles() {
      this.$router.go(0);
    },
  },
});
