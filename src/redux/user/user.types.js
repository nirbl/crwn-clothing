// Note 2 - for implement Redux-Saga-  change to "export default...
const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  // Note 1 - for implement Redux-Saga-  add the following rows
  // Note 1-2 - for implement Redux-Saga- instead of having separate success and failure calls,
  //          they have the same success add failure
  //  => so here - we'll just do a sign and success and failure, which will represent both
  //      our email success and our Google success and the respective as well
  GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
  /* GOOGLE_SIGN_IN_SUCCESS: 'GOOGLE_SIGN_IN_SUCCESS',
  GOOGLE_SIGN_IN_FAILURE: 'GOOGLE_SIGN_IN_FAILURE', */
  EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
  //  and below respectively will change the rows:
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',

  // Note 3 - we're going to need a new user action called "checkUserSession"
  CHECK_USER_SESSION: 'CHECK_USER_SESSION',
  SIGN_OUT_START: 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
  // Note 4 - for Redux-Saga - add for change implementing the "sign-up":
  SIGN_UP_START: 'SIGN_UP_START',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
};

export default UserActionTypes;
