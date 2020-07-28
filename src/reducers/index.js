import { combineReducers } from "redux";
import { addTask } from "./addTask";
import { filters } from './filters'

export default combineReducers({
    addTask, filters
});