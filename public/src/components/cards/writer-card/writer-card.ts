import { defineComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { getLogoSrc, redirectExternal } from "@/utils/globalFunctions";
import { shadeColor } from "@/utils/globalFunctions";

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
      socials: [{ url: "" }],
      socialsWithClass: [] as Object[],
      imageSrc: require(`@/uploads/default.png`),
    };
  },
  props: {
    writerID: { type: String, default: () => "" },
  },
  async created() {
    this.updateCSS();
    this.writer = await this.fetchUserById(this.writerID);
    if (this.writer.image_path != "default.png") {
      this.imageSrc = this.writer.image_path;
    }
    this.name = this.writer.name != null ? this.writer.name : "No Name Found";
    this.bio = this.writer.bio != null ? this.writer.bio : "No bio found";
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
    getLogoSrc(url: string) {
      return getLogoSrc(url);
    },
    redirectExternal(link: string) {
      redirectExternal(link);
    },
    redirect(link: string) {
      this.$router.push(link);
    },
    updateCSS() {
      const darkerColor = shadeColor(this.getPrimaryColor, 0.8);
      const css = `
        .writer-card .fab {
          color: ${this.getPrimaryColor};
        }
        .writer-card .fab:hover {
          color: ${darkerColor};
        }
        .writer-card .rhs h1:hover {
          color: ${this.getPrimaryColor};
        }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
