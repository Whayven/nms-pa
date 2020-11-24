import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import starReducer from "./starReducer";

const rootReducer = combineReducers({
  user: userReducer,
  star: starReducer
});



export default createStore(rootReducer, applyMiddleware(thunk));