import WriterCard from "@/components/cards/writer-card/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";

export default defineComponent({
  name: "home",
  components: {
    WriterCard,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      writerID: "",
      writer: {
        name: "",
        bio: "",
        image_path: "",
        socials: [],
      },
      name: "",
      bio: "",
      imagePath: "default.png",
      socials: [],
    };
  },
  async created() {
    this.writerID = String(this.$route.params.writerId);
    this.writer = await this.fetchUserById(this.writerID);
    this.name = this.writer.name != null ? this.writer.name : "No Name Found";
    this.bio = this.writer.bio != null ? this.writer.bio : "No Bio Found";
    this.imagePath =
      this.writer.image_path != null ? this.writer.image_path : "default.png";
    this.socials = this.writer.socials != null ? this.writer.socials : [];
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchUserById"]),
    redirect(link: string) {
      this.$router.push(link);
    },
    getLogoSrc(url: string) {
      if (url.includes("twitter")) {
        return LogoIcons.TWITTER;
      } else if (url.includes("facebook")) {
        return LogoIcons.FACEBOOK;
      } else if (url.includes("linkedin")) {
        return LogoIcons.LINKEDIN;
      }
      return LogoIcons.DEFAULT;
    },
  },
});
