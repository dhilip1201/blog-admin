import { combineReducers } from "redux";
import {authReducers} from './auth.reducers';
import { userReducers } from "./user.reducers";
import { blogReducers } from "./blog.reducers";

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    blog: blogReducers
})

export default rootReducer;