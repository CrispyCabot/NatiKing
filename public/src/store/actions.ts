import { UserActions } from "./modules/users";
import { AuthActions } from "./modules/auth";
import { PostActions } from "./modules/posts";

export default {
  ...AuthActions,
  ...UserActions,
  ...PostActions,
};
