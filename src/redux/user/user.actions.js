//  **** Note 1 - implement for Redux Saga - change row below as by "export default"
//import { UserActionTypes } from './user.types';
import UserActionTypes from './user.types';

// Note 3-2 - add for implement Redux-Saga - we don't need our "setCurrentUser" anymore because
//        we're not using that action anymore
/* export const setCurrentUser = (user) => ({
  // type: 'SET_CURRENT_USER',
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
}); */

// Note 2 - add for implement Redux-Saga
// Note 3-1 - add for implement Redux-Saga - we modify our actions - so that instead we don't need keep
//          googleSignInStart / Email..
//          we don't need this googleSignInSuccess/ googleSignInFailure:
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

//export const googleSignInSuccess = (user) => ({
// Note 3-3 - add for implement Redux-Saga - we modify our actions
export const signInSuccess = (user) => ({
  //type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

// Note 3-4 - add for implement Redux-Saga - we modify our actions
//export const GoogleSignInFailure = (error) => ({
export const signInFailure = (error) => ({
  // Note 3-4 - add for implement Redux-Saga - we modify our actions
  //type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

// Note 3-2 - add for implement Redux-Saga - (as continue) Nor we don't need the email sign &
//             success /or/ email  sign of failure - because they are actually the exact same thing except just
//            with different action types.

/* export const emailSignInSuccess = (user) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user,
});

export const emailSignInFailure = (error) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
  payload: error,
}); */

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
