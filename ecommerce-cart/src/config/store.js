import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import reducer from "../container/Home/reducer"
import literals from "../constants/stringLiterals"

const middleware = [thunk];

var combinedReducers = combineReducers({
    reducer: reducer,
    ...{stringLiterals: handleActions({},literals)}
  });
  const initialState = {};
  const store = createStore(
    combinedReducers,
    initialState,
    compose(applyMiddleware(...middleware))
  );
  export default store;
  