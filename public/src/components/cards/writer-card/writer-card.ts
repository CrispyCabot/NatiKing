import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import LogoIcons from "@/utils/socialIcons";

export default defineComponent({
  name: "writer-card",
  data() {
    return {
      authorName: "No Author Found",
      writer: {
        _id: "",
        image_path: "",
        name: "",
        bio: "",
        socials: [],
      },
      imagePath: "default.png",
      name: "",
      bio: "",
      socials: [],
    };
  },
  props: {
    writerID: { type: String, default: () => "" },
  },
  async created() {
    this.writer = await this.fetchUserById(this.writerID);
    // if (this.writer.image_path != null) {
    //   this.imagePath = this.writer.image_path;
    // }
    this.imagePath =
      this.writer.image_path != null ? this.writer.image_path : "default.png";
    this.name = this.writer.name != null ? this.writer.name : "No Name Found";
    this.bio = this.writer.bio != null ? this.writer.bio : "No bio found";
    this.socials = this.writer.socials != null ? this.writer.socials : [];
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo"]),
  },
  methods: {
    ...mapActions(["fetchUserById"]),
    getLogoSrc(url: string) {
      if (url.includes("twitter")) {
        return LogoIcons.TWITTER;
      } else if (url.includes("facebook")) {
        return LogoIcons.FACEBOOK;
      } else if (url.includes("linkedin")) {
        return LogoIcons.LINKEDIN;
      } else if (url.includes("instagram")) {
        return LogoIcons.INSTAGRAM;
      }
      return LogoIcons.DEFAULT;
    },
    redirectExternal(link: string) {
      if (!link.includes("https")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    },
    redirect(link: string) {
      this.$router.push(link);
    },
  },
});
