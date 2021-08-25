import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  // Note 2 - the below block - we're update our code to leverage the correct actions as well other files:
  //googleSignInSuccess,
  signInSuccess,
  //googleSignInFailure,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  // emailSignInSuccess,
  // emailSignInFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';

//import SignUp from '../../components/sign-up/sign-up.component';

// **** Note 5 - we will create new generator function - instead of passing "user" - we wil pass "userAuth"
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  // Note - here we will copy the below tr/catch block:
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );

    const userSnapShot = yield userRef.get();

    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  // Note 1 !!
  // We wil wrap our attempt at our API call in a try block.
  // ==> As we remember - any code that we write with an API -> has a chance to fail
  //      -- so we need to be sure that we can catch the 'error'.
  try {
    // Note 2 - We've got to make sure to pull off the 'user' object from our 'user' - instead of "const userRef"
    //          -> so we can destructor like this
    //const userRef = yield auth.signInWithPopup(googleProvider);

    const { user } = yield auth.signInWithPopup(googleProvider);
    // *** Note 5-2 - instead the below bock we call above declare function:
    yield getSnapshotFromUserAuth(user);
    // *** Note 5-1 - we created new generator function instead the following remarked !! inner !! try/catch we moved it:
    // Note 3 - So now we can make sure to set a "const userRef" that will never get back when we call as we are using our call method "createUserProfileDocument"
    //const userRef = yield call(createUserProfileDocument, user);
    //console.log(userRef);
    // const userSnapShot = yield userRef.get();
    // **** Note 3 -  we're update our code to leverage the correct actions as well other files:
    //yield put(
    //googleSignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
    //signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
    // );
  } catch (error) {
    // **** Note 4 -  we're update our code to leverage the correct actions as well other files:
    // yield put(googleSignInFailure(error));
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    // *** Note 5-3 - instead the below bock we call above declare function:
    /*  const userRef = yield call(createUserProfileDocument, user);
    const userSnapShot = yield userRef.get();
    yield put(
      // **** Note 5 -  we're update our code to leverage the correct actions as well other files:
      //emailSignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
      signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
    ); */
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    // **** Note 6 -  we're update our code to leverage the correct actions as well other files:
    //yield put(emailSignInFailure(error));
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// we'll make sure to destructor off the payload and then we'll need is the email, password and the display name
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    // **** Note !! instead of "await" -> we've got a "yield"  ****
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
