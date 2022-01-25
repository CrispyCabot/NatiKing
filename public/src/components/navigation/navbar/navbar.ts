import { defineComponent } from "@vue/runtime-core";
import Links from "@/utils/links";
import Hamburger from "@/components/navigation/hamburger/index.vue";
import UserPopup from "@/components/popups/user-popup/index.vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "navbar",
  components: {
    Hamburger,
    UserPopup,
  },
  data() {
    return {
      links: Links,
      isUserPopupOpen: false,
      isMobileView: true,
    };
  },
  created() {
    this.setIsMobileView();
    window.addEventListener("resize", this.setIsMobileView);
  },
  updated() {
    this.setIsMobileView();

    if (this.notificationCount > 0) {
      const elm: any = this.$refs.notification_count;
      const elmBounds: any = elm.getBoundingClientRect();
      if (elmBounds.width > elmBounds.height)
        elm.style.height = elmBounds.width + "px";
      else elm.style.width = elmBounds.height + "px";
    }
  },
  computed: {
    ...mapGetters([
      "getIsLoggedIn",
      "getLoggedInUser",
      "getLogo",
      "getPrimaryColor",
    ]),
    notificationCount(): Number {
      let count = 0;
      if (this.getLoggedInUser && this.getLoggedInUser.notifications) {
        Object.keys(this.getLoggedInUser.notifications).map((key: any) => {
          count += this.getLoggedInUser.notifications[key].notifications.length;
        });
      }
      return count;
    },
  },
  methods: {
    ...mapActions(["fetchPlayerById"]),
    closeUserPopup() {
      this.isUserPopupOpen = false;
    },
    toggleUserPopup() {
      this.isUserPopupOpen = !this.isUserPopupOpen;
    },
    setIsMobileView() {
      this.isMobileView = Boolean(window.outerWidth <= 576);
    },
    redirect(link: any) {
      this.$router.push(link.redirect);
    },
  },
  unmounted() {
    window.removeEventListener("resize", this.setIsMobileView);
  },
  watch: {
    getPrimaryColor() {
      const css = `
    .navbar-container_desktop p {
      color: ${this.getPrimaryColor};
    }
    .navbar-container_desktop p:hover {
      color: #fff;
    }`;
      const style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
});
