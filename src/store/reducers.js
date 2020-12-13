import { combineReducers } from "redux";
import { reducer as todoReducer } from "../containers/TodoList/todoStore";

// 汇总所有的reduce
const reducers = combineReducers({
  todo: todoReducer,
});

export default reducers;
