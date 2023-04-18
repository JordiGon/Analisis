import { combineReducers } from "redux";
import user from "./LoginReducer";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
