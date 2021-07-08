import { Action } from '@ngrx/store';
import { USER_RESPONSE } from '../interface';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_FAILURE = '[Auth] Signup Failure',
    LOGOUT = '[Auth] Logout',
  }
  
  export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) {}
  }
  
  export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: USER_RESPONSE) {}
  }
  
  export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public err: any) {}
  }
  
  export class SignUp implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: any) {}
  }
  
  export class SignUpSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload: USER_RESPONSE) {}
  }
  
  export class SignUpFailure implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILURE;
    constructor(public err: any) {}
  }
  
  export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
  }
  
  export type All =
    | LogIn
    | LogInSuccess
    | LogInFailure
    | SignUp
    | SignUpSuccess
    | SignUpFailure
    | LogOut;