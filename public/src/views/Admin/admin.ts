import { defineComponent } from "@vue/runtime-core";
import ContentDropdown from "@/components/dropdowns/content-dropdown/index.vue";
import PaginationMixin from "@/mixins/pagination-mixin";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TOAST_TYPES } from "@/utils/toastTypes";

export default defineComponent({
  name: "profile",
  components: {
    ContentDropdown,
  },
  mixins: [PaginationMixin],
  data() {
    return {
      isEditing: false,
      fields: {
        primaryColor: {
          value: "",
          placeholder: "Primary Color",
          name: "primaryColor",
          isRequired: true,
          type: "input",
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getIsLoggedIn", "getLoggedInUser", "getPrimaryColor"]),
  },
  async created() {},
  mounted() {
    if (this.getLoggedInUser.access_level < 20) {
      //If no access, redirect to 404 page
      this.redirect("alksjdf");
    }
    this.setupFieldValues();
  },
  methods: {
    ...mapActions(["updateColors"]),
    ...mapMutations(["updateGlobalToast"]),
    redirect(link: string) {
      if (link == "top") {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      } else {
        this.$router.push(link);
      }
    },
    setupFieldValues() {
      this.fields.primaryColor.value = this.getPrimaryColor;
    },
    editSettings() {
      this.isEditing = true;
    },
    async saveSettings() {
      //TODO: Verify color is hexcode
      const colors = {
        primaryColor: this.fields.primaryColor.value,
      };
      const res = await this.updateColors({
        newColors: colors,
      });
      this.setupFieldValues();
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
      this.isEditing = false;
    },
    cancelSettings() {
      this.isEditing = false;
    },
  },
  watch: {
    getPrimaryColor() {
      this.setupFieldValues();
    },
  },
});
