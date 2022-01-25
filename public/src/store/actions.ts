import { UserActions } from "./modules/users";
import { AuthActions } from "./modules/auth";
import { PostActions } from "./modules/posts";
import { SettingsActions } from "./modules/settings";

export default {
  ...AuthActions,
  ...UserActions,
  ...PostActions,
  ...SettingsActions,
};
