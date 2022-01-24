import api from "@/api/api";
import { defineComponent } from "@vue/runtime-core";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { TOAST_TYPES } from "@/utils/toastTypes";

export default defineComponent({
  name: "signup",
  components: {},
  data() {
    return {
      fields: {
        email: {
          value: "",
          placeholder: "Email",
          name: "email",
          isRequired: true,
        },
        password: {
          value: "",
          placeholder: "Password",
          name: "password",
          isRequired: true,
        },
        confirm: {
          value: "",
          placeholder: "Confirm password",
          name: "confirm",
          isRequired: true,
        },
        name: {
          value: "",
          placeholder: "Name",
          name: "name",
          isRequired: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getLogo"]),
    enabledSignUpButton(): Boolean {
      return Boolean(
        this.fields.email.value &&
          this.validEmail &&
          this.fields.password.value &&
          this.fields.confirm.value &&
          this.confirmPassMatch &&
          this.validPassword &&
          this.fields.name.value
      );
    },
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
  methods: {
    ...mapActions(["createNewUser"]),
    ...mapMutations([
      "updateIsLoggedIn",
      "updateLoggedInPlayer",
      "updateGlobalToast",
    ]),
    async signUp() {
      const res = await this.createNewUser({
        email: this.fields.email.value,
        password: this.fields.password.value,
        name: this.fields.name.value,
      });

      if (res.status == 200) {
        this.updateIsLoggedIn(true);
        this.updateLoggedInPlayer(res.player);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.accessToken}`;
        this.$router.push("/");
      }

      this.updateGlobalToast({
        message: res.message,
        type: res.status == 400 ? TOAST_TYPES.Error : TOAST_TYPES.Success,
        duration: 5000,
        isShowing: true,
      });
    },
  },
});
