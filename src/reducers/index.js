import { combineReducers } from "redux";
import { allTasks } from "./allTasks";
import { filters } from "./filters";

export default combineReducers({
  allTasks,
  filters
});
