import PostCard from "@/components/cards/post-card/index.vue";
import SkeletonCard from "@/components/cards/skeleton-card/index.vue";
import LoadingIcon from "@/components/Icons/loading-icon/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "home",
  components: {
    PostCard,
    SkeletonCard,
    LoadingIcon,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      users: [],
      posts: [],
      isLoading: true,
      splicedPosts: [],
    };
  },
  async created() {
    this.isLoading = true;
    this.posts = await this.fetchPosts();
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
    updateInfScroll() {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.posts.splice(0, 10).map((item) => {
          this.splicedPosts.push(item);
        });
      }
    },
  },
  unmounted() {
    window.removeEventListener("scroll", this.updateInfScroll);
  },
});
