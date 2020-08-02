import { combineReducers } from "redux";
import { allTasks } from "./allTasks";
import { routerReducer } from "react-router-redux";
import { filters } from "./filters";

export default combineReducers({
  allTasks,
  filters,
  routing: routerReducer,
});
