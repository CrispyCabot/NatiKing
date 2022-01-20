// import GridTable from "@/components/tables/grid-table/index.vue";
import PostCard from "@/components/cards/post-card/index.vue";
// import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "home",
  components: {
    PostCard,
  },
  // mixins: [PaginationMixin],
  data() {
    return {
      users: [],
      posts: [],
      tableLoading: false,
      splicedPosts: [],
    };
  },
  async created() {
    this.tableLoading = true;
    this.posts = await this.fetchPosts();
    this.splicedPosts = this.posts.splice(0, 10);
    this.tableLoading = false;
    window.addEventListener("scroll", () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.posts.splice(0, 10).map((item) => {
          this.splicedPosts.push(item);
        });
      }
    });
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
  },
  beforeUnmount() {
    console.log("in beforeUnmount");
  },
});
