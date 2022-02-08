import { defineComponent } from "@vue/runtime-core";
import ContentDropdown from "@/components/dropdowns/content-dropdown/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import SocialInput from "@/components/inputs/social-input/index.vue";
import ModalInput from "@/components/inputs/modal-input/index.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TOAST_TYPES } from "@/utils/toastTypes";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { shadeColor } from "@/utils/globalFunctions";
import LogoIcons from "@/utils/socialIcons";

export default defineComponent({
  name: "profile",
  components: {
    ContentDropdown,
    SocialInput,
    ModalInput,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      isMobileView: true,
      isSettingsEditing: false,
      isShowingModal: false,
      userID: "",
      name: "",
      bio: "",
      VALID_SOCIALS: ["facebook", "twitter", "linkedin", "instagram"],
      fields: {
        name: {
          value: "",
          placeholder: "Name",
          name: "name",
          isRequired: true,
          type: "input",
        },
        email: {
          value: "",
          placeholder: "Email",
          name: "email",
          isRequired: true,
          type: "input",
        },
        bio: {
          value: "",
          placeholder: "Bio",
          name: "bio",
          isRequired: false,
          type: "input",
        },
        profilePicURL: {
          value: "",
          placeholder: "Profile picture image url...",
          name: "profilePicURL",
          isRequired: false,
          type: "input",
        },
        password: {
          value: "",
          placeholder: "New password",
          name: "password",
          isRequired: false,
          type: "input",
        },
        confirm: {
          value: "",
          placeholder: "Confirm password",
          name: "confirm",
          isRequired: false,
          type: "input",
        },
      },
      imageSrc: require(`@/uploads/default.png`),
    };
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser", "getPrimaryColor"]),
    confirmPassMatch(): Boolean {
      return Boolean(this.fields.password.value == this.fields.confirm.value);
    },
    validEmail(): Boolean {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (
        re.test(String(this.fields.email.value).toLowerCase()) ||
        this.fields.email.value == ""
      );
    },
    validPassword(): Boolean {
      return (
        this.fields.password.value.length >= 6 ||
        this.fields.password.value == ""
      );
    },
  },
  async created() {
    this.setIsMobileView();
    this.userID = this.getLoggedInUser._id;
    this.setupFieldsValues();
  },
  mounted() {
    this.setupFieldsValues();
  },
  methods: {
    ...mapActions(["fetchUserById", "updateUserSettings", "addSocial"]),
    ...mapMutations(["updateGlobalToast"]),
    editSettings() {
      requestAnimationFrame(() => {
        this.isSettingsEditing = true;
      });
    },
    cancelSettings() {
      this.isSettingsEditing = false;
      this.isShowingModal = false;
      this.setupFieldsValues();
    },
    async saveSettings() {
      const updates = {
        name: this.fields.name.value,
        email: this.fields.email.value,
        bio: this.fields.bio.value,
        password: this.fields.password.value,
        confirm_password: this.fields.confirm.value,
        image_path: "default.png",
      };
      if (this.fields.profilePicURL.value != "") {
        updates.image_path = this.fields.profilePicURL.value;
      }
      const res = await this.updateUserSettings({
        userId: this.getLoggedInUser._id,
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
      this.isSettingsEditing = false;
      this.isShowingModal = false;
    },
    openSocialPopup() {
      this.isShowingModal = true;
    },
    async setupFieldsValues() {
      if (this.getLoggedInUser) {
        requestAnimationFrame(() => {
          this.name = this.getLoggedInUser.name;
          this.bio = this.getLoggedInUser.bio;
          this.fields.name.value = this.getLoggedInUser.name;
          this.fields.email.value = this.getLoggedInUser.email;
          this.fields.bio.value = this.getLoggedInUser.bio;
          const val = this.getLoggedInUser.image_path;
          this.fields.profilePicURL.value = val == "default.png" ? "" : val;
        });
      }
    },
    redirect(link: string) {
      if (link == "top") {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      } else {
        this.$router.push(link);
      }
    },
    setIsMobileView() {
      this.isMobileView = Boolean(window.outerWidth <= 576);
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
    redirectExternal(link: string) {
      if (!link.includes("https")) {
        link = "https://" + link;
      }
      window.open(link, "_blank");
    },
    isValidSocial(url: string): boolean {
      const a = this.VALID_SOCIALS.some((s) => {
        return url.toLowerCase().includes(s);
      });
      return a;
    },
    async addNewSocial(social: any) {
      if (social == "cancel") {
        this.isShowingModal = false;
        return;
      }
      if (!this.isValidSocial(social)) {
        this.updateGlobalToast({
          message:
            "Invalid social link. Currently, only Facebook, Twitter, and LinkedIn are supported",
          type: TOAST_TYPES.Error,
          duration: 5000,
          isShowing: true,
        });
      } else {
        const res = await this.addSocial({
          userId: this.getLoggedInUser._id,
          socialURL: social,
        });
        this.updateGlobalToast({
          message: res.message,
          type:
            res.status == 400
              ? TOAST_TYPES.Error
              : res.status == 403
              ? TOAST_TYPES.Warning
              : TOAST_TYPES.Success,
          duration: 3000,
          isShowing: true,
        });
        this.isShowingModal = false;
      }
    },
  },
  watch: {
    getLoggedInUser() {
      if (this.fields) {
        this.setupFieldsValues();
      }
      if (this.getLoggedInUser.image_path != "default.png") {
        this.imageSrc = this.getLoggedInUser.image_path;
      }
    },
  },
  unmounted() {
    window.removeEventListener("resize", this.setIsMobileView);
  },
});
