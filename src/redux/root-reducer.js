import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// below line - to get the actual local storage object on our window browser
//   -> telling the redux persist => I want to use "local storage" as my default storage
import storage from 'redux-persist/lib/storage';
// alternatively
//import sessionStorage from 'redux-persist/es/storage/session';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

/* export default combineReducers({
  user: userReducer,
  cart: cartReducer,
}); */

export default persistReducer(persistConfig, rootReducer);
