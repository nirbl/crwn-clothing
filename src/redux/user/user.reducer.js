//  **** Note 1 - implement for Redux Saga - change row below as by "export default"
//import { UserActionTypes } from './user.types';
import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  // Note 3 - implement Redux-Saga - add "error":
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //case 'SET_CURRENT_USER':
    // Note 1 - implement Redux-Saga - change the below row && add new row:
    //case UserActionTypes.SET_CURRENT_USER:
    /* case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS: */
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        // Note 3 - implement Redux-Saga - add new row:
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    // Note 2 - implement Redux-Saga - add new row:
    //case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    //case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
