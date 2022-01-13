import GridTable from "@/components/tables/grid-table/index.vue";
import PostCard from "@/components/cards/post-card/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "home",
  components: {
    PostCard,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      leagues: [],
      columns: [],
      users: [],
      tableLoading: false,
    };
  },
  async created() {
    this.tableLoading = true;
    this.users = await this.fetchUsers();
    this.tableLoading = false;
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
    ...mapActions(["fetchUsers"]),
    redirect(link: string) {
      this.$router.push(link);
    },
  },
});
