import { reactive } from "@vue/reactivity";
import { IToast } from "@/interfaces/IToast";

export default reactive({
  isLoggedIn: false,
  loggedInUser: {},
  accessToken: "",
  globalToast: {} as IToast,
  currentLeagueName: "",
  currentPlayerName: "",
  currentGameName: "",
  isUsingMockData: false,
  mockOverride: false,
  webSocketConnection: null as any,
  primaryColor: "#7e7e7e",
});
