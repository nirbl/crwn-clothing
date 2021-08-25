import { createSelector } from 'reselect';
//import memoize from 'lodash.memoize';

// Note!! because we change without find()  => we don't need COLLECTION_ID_MAP" anymore

/* const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
}; */

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  //(collections) => Object.keys(collections).map((key) => collections[key])
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// Note !! We will modified our collections inside of our Reducer to now be an object,
// whereas our select collections & then the component using it in our collections overview still thinks that it's an array.
// What we can do about this? =>
// answer : =>
//  We can create a new selector that can convert our object into an array !
// => we do that -> by make a new selector called "selectCollectionsForPreview"
// - we will create the selector and we'll get our select collection (because we do want the object)
// and with the collection's object we're call a method called "Object.key"
// -> that gets us all of the keys of an object that we pass into it
//    and gives it to us in an array format

// wrap our "selectCollection" function with "memoize" like so:
/* export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
); */
// "Memoize" does the same idea of memoization as "reselect" does
// for our selectors, except this time we're memoizing the return
// of our function returns our selectors: (as above) =>
/* collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  ) */

export const selectCollection = (collectionUrlParam) =>
  // here we return "createSelector - which is called "curried function"
  //  which is just a function that returns another function =>
  //  the other function in this case being what creates selector returns
  //  which as we know is pretty much the shape of this function =>
  // it takes the state and then it does a transformation on it so that we
  // get back something else on that state object ...

  createSelector(
    [selectCollections],
    //(collections) =>
    // Note !! instead of doing a collection of "find()" -> we will do
    //        "collectionUrlParameter"

    /* (collections) => collections[collectionUrlParam] */
    (collections) => (collections ? collections[collectionUrlParam] : null)

    /* collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    ) */
  );

// Note !! This concept of storing lists of elements inside of an object instead of an array
//    => is called : "Data normalization"
// =--> we will convert "shop.data.js" from an array -> to an object

// Note 1 !!! below add rows for redux-thunk implementation
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

// Note 2 !!! below add rows for redux-thunk implementation
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
