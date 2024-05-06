// store.js
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { asyncStorageMiddleware } from './middleware';
import reducer from './reducers'; // Assuming your reducer file is named reducers.js

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  fact: reducer, // Assuming your reducer is managing facts
  // Add more reducers if needed
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(asyncStorageMiddleware));

export default store;
