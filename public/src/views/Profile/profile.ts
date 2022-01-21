import { defineComponent } from "@vue/runtime-core";
import GridTable from "@/components/tables/grid-table/index.vue";
import ContentDropdown from "@/components/dropdowns/content-dropdown/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import RadioSlider from "@/components/inputs/radio-slider/index.vue";
import RadioButtonGroup from "@/components/inputs/radio-button-group/index.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TOAST_TYPES } from "@/utils/toastTypes";
import RowCard from "@/components/cards/row-card/index.vue";

export default defineComponent({
  name: "profile",
  components: {
    GridTable,
    ContentDropdown,
    RadioSlider,
    RadioButtonGroup,
    RowCard,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      isMobileView: true,
      isSettingsEditing: false,
      userID: "",
      user: Object(),
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
    };
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser"]),
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
  methods: {
    ...mapActions(["fetchUserById"]),
    ...mapMutations(["updateGlobalToast"]),
    editSettings() {
      this.isSettingsEditing = true;
    },
    cancelSettings() {
      this.isSettingsEditing = false;
      this.setupFieldsValues();
    },
    async saveSettings() {
      // const res = await this.updateUserSettings({
      //   playerId: this.getLoggedInPlayer._id,
      //   updates: {
      //     phone_number: Number(this.fields.phone.value.split('-').join('')),
      //     email: this.fields.email.value,
      //     firstname: this.fields.fname.value,
      //     lastname: this.fields.lname.value,
      //     nickname: this.fields.nname.value,
      //     password: this.fields.password.value,
      //     confirm_password: this.fields.confirm.value,
      //     show_information: Boolean(this.fields.contactInfo.value),
      //     gender: this.fields.gender.value
      //   }
      // })
      // this.updateGlobalToast({
      //   message: res.message,
      //   type: res.status == 400 ? TOAST_TYPES.Error : res.status == 403 ? TOAST_TYPES.Warning : TOAST_TYPES.Success,
      //   duration: 5000,
      //   isShowing: true
      // })
    },
    setupFieldsValues() {
      if (this.getLoggedInUser) {
        this.fields.name.value = this.getLoggedInUser.name;
        // this.fields.phone.value = this.getLoggedInPlayer.phone_number
        // this.formatPhone(null, true)
        // this.fields.email.value = this.getLoggedInPlayer.email
        // this.fields.fname.value = this.getLoggedInPlayer.firstname
        // this.fields.lname.value = this.getLoggedInPlayer.lastname
        // this.fields.nname.value = this.getLoggedInPlayer.nickname
        // this.fields.contactInfo.value = this.getLoggedInPlayer.show_information
        // this.fields.gender.value = this.getLoggedInPlayer.gender
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
    playerClick(row: any) {
      this.$router.push(`/player/${row.id.text}`);
    },
  },
  watch: {
    getLoggedInPlayer() {
      if (this.fields) {
        this.setupFieldsValues();
      }
    },
  },
  unmounted() {
    window.removeEventListener("resize", this.setIsMobileView);
  },
});
