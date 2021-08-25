import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

// Note 1 - we will create a new action called "clearCart"
//          -> now we need to make sure that we "dispatch" CLEAR fro our Saga right when we hear
//            that user action "sign in success"
export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});
