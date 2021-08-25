// "takeEvery" => is listens for every action of specific type that we pass to it && afterwards add effect called :"call"
//              && "put" => is the Saga effect for creating action (instead of dispatch) do the fact we need to "yield" the action
//import { takeEvery, call, put } from 'redux-saga/effects';
import { takeLatest, call, put, all } from 'redux-saga/effects';

// Note 3 - we need to import the functionalities to do this logic
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

// Note 3 - we also need our actionCreatures:
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  //yield console.log('I am fired');

  // **** Note 1 - add this code block from "shop.sagas.js"  ++ we add try{...}catch(error){...} block !!
  try {
    const collectionRef = firestore.collection('collections');
    // *** Note 2 - we no longer need this dispatch (row below) anymore - because we're not dispatching it from our Saga
    //            -> we just need the base start to happen and then we listen for it.
    //dispatch(fetchCollectionsStart());
    //
    // **** Note 3 - add the rows below:
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  /* collectionRef
    .get()
    .then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //updateCollections(collectionsMap);
      // *** add also this below row:
      dispatch(fetchCollectionsSuccess(collectionsMap));
      // ** remarked row below - we don't need for the Redux-Thank:
      //this.setState({ loading: false });
    })
    .catch((error) => dispatch(fetchCollectionsFailure(error.message))); */
}

export function* fetchCollectionsStart() {
  //
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
