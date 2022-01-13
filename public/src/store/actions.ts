import { UserActions } from './modules/users'
import { AuthActions } from './modules/auth'

export default {
  ...AuthActions,
  ...UserActions
}