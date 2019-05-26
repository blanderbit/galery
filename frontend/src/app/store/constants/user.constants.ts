export enum UserActionTypes {
  GetUser = '[Auth] Get User',
  Authenticated = '[Auth] Authenticated',
  LoadUserData = '[Auth] Load User Data',
  NotAuthenticated = '[Auth] Not Authenticated',
  Logout = '[Auth] Logout',
  AuthError = '[Auth] Error',
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserFailure = '[User] Load User Failure',
  UpdateUserData = '[User] Update User Data'
}
