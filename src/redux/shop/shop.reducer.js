// Note !! After we have our Reducer listening for the Backend update to store the actual
// collection's value -> we don't need this "INITIAL_STATE" & the "SHOP_DATA"
// that we have in our FrontEnd anymore

/* import SHOP_DATA from './shop.data'; */

import ShopActionTypes from './shop.types';

// we saying that "collections" points to the imported array of "SHOP_DATA"

// Note 2 !! After we have our Reducer listening for the Backend update to store the actual
// collection's value -> we don't need this "INITIAL_STATE"
/* const INITIAL_STATE = {
  collections: SHOP_DATA,
}; */

const INITIAL_STATE = {
  collections: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
