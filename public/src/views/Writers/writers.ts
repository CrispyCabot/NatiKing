import GridTable from "@/components/tables/grid-table/index.vue";
import WriterCard from "@/components/cards/writer-card/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "home",
  components: {
    WriterCard,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      writers: [],
    };
  },
  async created() {
    this.writers = await this.fetchWriters();
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchWriters"]),
    redirect(link: string) {
      this.$router.push(link);
    },
  },
  beforeUnmount() {
    console.log("in beforeUnmount");
  },
});
