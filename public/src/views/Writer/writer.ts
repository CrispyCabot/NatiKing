import WriterCard from "@/components/cards/writer-card/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { defineComponent } from "@vue/runtime-core";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import LogoIcons from "@/utils/socialIcons";
import { shadeColor } from "@/utils/globalFunctions";

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
      imageSrc: require(`@/uploads/default.png`),
      socials: [{ url: "" }],
      socialsWithClass: [] as Object[],
    };
  },
  async created() {
    this.updateCSS();
    this.writerID = String(this.$route.params.writerId);
    this.writer = await this.fetchUserById(this.writerID);
    this.name = this.writer.name != null ? this.writer.name : "No Name Found";
    this.bio = this.writer.bio != null ? this.writer.bio : "No Bio Found";
    this.imageSrc =
      this.writer.image_path == "default.png"
        ? this.imageSrc
        : this.writer.image_path;
    this.socials = this.writer.socials != null ? this.writer.socials : [];
    this.socials.map((social) => {
      const url = social.url;
      console.log(url);
      const newSocial = { url: url, class: "fas fa-ban" };
      if (url.includes("twitter")) {
        newSocial.class = "fab fa-twitter-square fa-3x";
      } else if (url.includes("facebook")) {
        newSocial.class = "fab fa-facebook-square fa-3x";
      } else if (url.includes("linkedin")) {
        newSocial.class = "fab fa-linkedin fa-3x";
      } else if (url.includes("instagram")) {
        newSocial.class = "fab fa-instagram-square fa-3x";
      }
      this.socialsWithClass.push(newSocial);
    });
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLogo", "getPrimaryColor"]),
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
      } else if (url.includes("instagram")) {
        return LogoIcons.INSTAGRAM;
      }
      return LogoIcons.DEFAULT;
    },
    updateCSS() {
      const darkerColor = shadeColor(this.getPrimaryColor, 0.8);
      const css = `
        .fab {
          color: ${this.getPrimaryColor};
        }
        .fab:hover {
          color: ${darkerColor};
        }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    redirectExternal(link: string) {
      if (!link.includes("https")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
