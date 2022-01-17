import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default defineComponent({
  name: "comment-card",
  data() {
    return {
      authorName: "No Author Found",
      writer: {
        _id: "",
        image_path: "",
        name: "",
      },
      imagePath: "default.png",
    };
  },
  props: {
    uid: { type: String, default: () => "No Title Found" },
    comment: { type: String, default: () => "default.png" },
  },
  async created() {
    console.log(this.uid);
    this.writer = await this.fetchUserById(this.uid);
    this.authorName = this.writer.name;
    if (this.writer.image_path != null) {
      this.imagePath = this.writer.image_path;
    }
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchUserById"]),
    redirect(link: string) {
      this.$router.push(link);
    },
  },
});
