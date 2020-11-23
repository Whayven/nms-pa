import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer
});



export default createStore(rootReducer, applyMiddleware(thunk));