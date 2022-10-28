import { combineReducers } from "redux";
import { blogsReducer, usersReducer } from "./reducer";

const rootReducer = combineReducers({
    blogs: blogsReducer,
    users: usersReducer,
});

export default rootReducer;
