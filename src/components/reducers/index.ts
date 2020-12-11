import { combineReducers } from "redux";
import loggedReducer from "./LoggedReducer";
import updateReducer from "./UpdateReducer";


const allReducers = combineReducers({
    logged: loggedReducer,
    update: updateReducer
});

export default allReducers;
