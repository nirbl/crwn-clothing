import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// ****    Note 2 - for Redux-Saga implementation - remove our old "thunk" middleware
/* import thunk from 'redux-thunk'; */
// ****    Note 1 - for Redux-Saga implementation
import createSagaMiddleware from 'redux-saga';

// ****    Note 5 - for Redux-Saga - afterward we remark it and write instead:
//import { fetchCollectionsStart } from './shop/shop.sagas';
import rootSaga from './root-saga';

import rootReducer from './root-reducer';

// Note !! if we want redux log only ib DEV mode - we will empty the array bracket like : "[]"
//  And - add the if condition as below
//const middlewares = [logger];

// Note !! Change the below line for - "redux-thunk"
//
//
// ****    Note 3 - for Redux-Saga - we'll make a new variable using "createSagaMiddleware()" function
const sagaMiddleware = createSagaMiddleware();

// ****    Note 1 - for Redux-Saga - !!change!! below row without ["thunk"] and replace with redux-saga to handle
//                  asynchronous actions inside redux - and pass "sagaMiddleware" into our middleware array
//const middlewares = [thunk];
const middlewares = [sagaMiddleware];
//
//
//const middlewares = [];
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

// ****    Note 4 - for Redux-Saga - afterwards we will remark the row below and changed it as follow:
//sagaMiddleware.run(fetchCollectionsStart);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

//export default store;
// ***Note *** - as for "Arnas" remark - we don't need to export below - this is not needed - here is the message below:
/*
Arnas Dičkus
Arnas
10 months ago

Hello, this is what works:

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
export {store, persistor};
Writing export default { store, persistor} doesn't work because there can only be one default export.  Stack overflow

So you can either add export to both of them

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
Or export it simply

export {store, persistor};


Import will be the same import { store, persistor} from "./redux/store";

Hope that helps.
*/
//export default { store, persistStore };
