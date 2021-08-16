import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

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
