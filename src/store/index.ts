/*
1. Import reducers and sagas
2. Use createSagaMiddleware() function to create a saga middleware.
3. Connect it to our store by passing it as an argument to the applymiddleware funtion 
   insdie create Store which we use to create our store.
4. We will also pass gameReducer to this funciton so that a reducer mapped to our store.
5. Finally we run our sagaMiddleware using a command - sagaMiddleware.run(watcherSagas);
*/

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import gameReducer from "./reducers";
// import watcherSagas from "./sagas";
// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(gameReducer, applyMiddleware(sagaMiddleware));
const store = createStore(gameReducer);

// statement to run saga middleware
// sagaMiddleware.run(watcherSagas);

export default store;