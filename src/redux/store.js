import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// Note !! if we want redux log only ib DEV mode - we will empty the array bracket like : "[]"
//  And - add the if condition as below
//const middlewares = [logger];
const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
//const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Note !! here we change it for the "persistStore" :
//        we exporting the "store" out  & also exporting out the thing called "persistent"
//         by calling "persistStore()" in our store
//     -> we're creating this new persisted version of our store, using this "persistor" object
// Note 2!! - we technically don't need export here those two lines below
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

//export default store;
export default { store, persistor };
