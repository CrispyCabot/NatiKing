import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "row-card",
  data() {
    return {
      authorName: "No Author Found",
    };
  },
  props: {
    title: { type: String, default: () => "No Title Found" },
    authorID: { type: String, default: () => "No Author Found" },
  },
  async created() {
    this.authorName = (await this.fetchUserById(this.authorID)).name;
    console.log(this.authorName);
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchUserById"]),
  },
});
