import ShopActionTypes from './shop.types';

// we will import all the dependencies that we have
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

//export const updateCollections = (collectionsMap) => ({
export const fetchCollectionsStart = () => ({
  //type: ShopActionTypes.UPDATE_COLLECTIONS,
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
  //payload: collectionsMap,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    // Note !! here below -> paste the code from "shop.component -> componentDidMount()"
    //        except the remarked row below
    const collectionRef = firestore.collection('collections');
    // Note !! we add the dispatch(fetch) row - we dispatch our "fetchCollectionsStart" call
    //        == we're dispatching the moment this function first "fetchCollectionsStartAsync" gets called
    dispatch(fetchCollectionsStart());
    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //updateCollections(collectionsMap);
        // *** add also this below row:
        dispatch(fetchCollectionsSuccess(collectionsMap));
        // ** remarked row below - we don't need for the Redux-Thank:
        //this.setState({ loading: false });
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
