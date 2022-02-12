import { defineComponent } from "@vue/runtime-core";
import { mapGetters, mapMutations } from "vuex";
import { mapActions } from "vuex";
import { getLogoSrc, redirectExternal } from "@/utils/globalFunctions";
import { shadeColor } from "@/utils/globalFunctions";
import { TOAST_TYPES } from "@/utils/toastTypes";

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
        access_level: 1,
      },
      imagePath: "default.png",
      name: "",
      bio: "",
      socials: [{ url: "" }],
      socialsWithClass: [] as Object[],
      imageSrc: require(`@/uploads/default.png`),
      isAccessEditing: false,
      newAccessLevel: 1,
    };
  },
  props: {
    writerID: { type: String, default: () => "" },
  },
  async created() {
    this.updateCSS();
    this.writer = await this.fetchUserById(this.writerID);
    this.newAccessLevel = this.writer.access_level;
    if (this.writer.image_path != "default.png") {
      this.imageSrc = this.writer.image_path;
    }
    this.name = this.writer.name != null ? this.writer.name : "No Name Found";
    this.bio = this.writer.bio != null ? this.writer.bio : "No bio found";
    this.socials = this.writer.socials != null ? this.writer.socials : [];
    this.socials.map((social) => {
      const url = social.url;
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
    ...mapActions(["fetchUserById", "updateUserSettings"]),
    ...mapMutations(["updateGlobalToast"]),
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
        .writer-card-container .writer-card-admin .fab {
          color: ${this.getPrimaryColor};
        }
        .writer-card-container .writer-card-admin .fab:hover {
          color: ${darkerColor};
        }
        .writer-card-container .writer-card-admin .rhs h1:hover {
          color: ${this.getPrimaryColor};
        }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
    editAccess() {
      this.isAccessEditing = true;
    },
    async saveAccess() {
      const updates = {
        access_level: this.newAccessLevel,
      };
      const res = await this.updateUserSettings({
        userId: this.writer._id,
        updates: updates,
      });
      this.updateGlobalToast({
        message: res.message,
        type:
          res.status == 400
            ? TOAST_TYPES.Error
            : res.status == 403
            ? TOAST_TYPES.Warning
            : TOAST_TYPES.Success,
        duration: 5000,
        isShowing: true,
      });
      this.isAccessEditing = false;
    },
    async cancelAccess() {
      this.isAccessEditing = false;
    },
  },
  watch: {
    getPrimaryColor() {
      this.updateCSS();
    },
  },
});
