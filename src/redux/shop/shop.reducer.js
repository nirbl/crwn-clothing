import SHOP_DATA from './shop.data';

// we saying that "collections" points to the imported array of "SHOP_DATA"
const INITIAL_STATE = {
  collections: SHOP_DATA,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shopReducer;
