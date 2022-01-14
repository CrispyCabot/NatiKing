import GridTable from "@/components/tables/grid-table/index.vue";
import PostCard from "@/components/cards/post-card/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/navigation/breadcrumb/index.vue";
import ArticleComponent from "@/components/articles/articleComponent/index.vue";

export default defineComponent({
  name: "home",
  components: {
    PostCard,
    Breadcrumb,
    ArticleComponent,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      articleID: "",
    };
  },
  async created() {
    this.articleID = String(this.$route.params.articleId);
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    redirect(link: string) {
      this.$router.push(link);
    },
  },
});
