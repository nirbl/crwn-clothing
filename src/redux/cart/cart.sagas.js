// Note - as we remember, because we're making a new Saga file,
//        we're going to have to bring this into our "root Saga", as well creating a base Saga's - so we import:
//        ==> because we know we need all of these "effects"
import { all, call, takeLatest, put } from 'redux-saga/effects';
// we also need our "UserActionTypes" because this will be what we are listening for:
import UserActionTypes from '../user/user.types';
// we also need our "clearCart" action - because this what we're going to fire out of our Saga
import { clearCart } from './cart.actions';

// here we create this following method (by put)
export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  // we're going to "yield"  - 'takeLatest' where we're listening for that 'user action' 'signOutSuccess'
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

// first we will create our cart Sagas = "root Saga"
export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
