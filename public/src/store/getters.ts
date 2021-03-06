import state from "./state";
const Logo = require("@/assets/nklogo.png");
const InvertedLogo = require("@/assets/nklogo-inverted.png");

export default {
  getIsLoggedIn(): Boolean {
    return state.isLoggedIn;
  },
  getLoggedInUser(): any {
    return state.loggedInUser;
  },
  getAccessToken(): String {
    return state.accessToken;
  },
  getGlobalToastMessage(): String {
    return state.globalToast.message;
  },
  getGlobalToastType(): String {
    return state.globalToast.type;
  },
  getGlobalToastDuration(): Number {
    return state.globalToast.duration;
  },
  getGlobalToastIsShowing(): Boolean {
    return state.globalToast.isShowing;
  },
  getGlobalToastIsShowingOverride(): Number {
    return state.globalToast.isShowingOverride;
  },
  getCurrentLeagueName(): String {
    return state.currentLeagueName;
  },
  getCurrentPlayerName(): String {
    return state.currentPlayerName;
  },
  getCurrentGameName(): String {
    return state.currentGameName;
  },
  getLogo(): any {
    return Logo;
  },
  getInvertedLogo(): any {
    return InvertedLogo;
  },
  getIsUsingMockData(): Boolean {
    return state.isUsingMockData;
  },
  getMockOverride(): Boolean {
    return state.mockOverride;
  },
  getWebSocketConnection(): any {
    return state.webSocketConnection;
  },
  getPrimaryColor(): String {
    return state.primaryColor;
  },
};
