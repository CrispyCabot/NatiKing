import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "article-component",
  data() {
    return {
      postInfo: {
        owner_id: "",
      },
      authorName: "No Author Found",
      authorID: "",
    };
  },
  props: {
    postID: { type: String, default: () => "" },
  },
  async created() {
    this.postInfo = await this.fetchPostById(this.postID);
    this.authorName = (await this.fetchUserById(this.postInfo.owner_id)).name;
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchPostById", "fetchUserById"]),
  },
});
