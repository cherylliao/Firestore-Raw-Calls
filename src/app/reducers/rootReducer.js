import { combineReducers } from "redux";
import {reducer as FormReducer} from 'redux-form'
import testReducer from "../../features/testarea/testReducer";
import eventReducer from "../../features/event/eventReducer";
import modalReducer from "../../features/modals/modalReducer"
import authReducer from "../../features/auth/user.reducer";
import asyncReducer from "../../features/async/asyncReducer";
import {reducer as ToastrReducer} from 'react-redux-toastr'
import userReducer from "../../features/auth/user.reducer";


const rootReducer = combineReducers({
    user:userReducer,
    form:FormReducer,
    test:testReducer,
    events:eventReducer,
    modals:modalReducer,
    auth: authReducer,
    async: asyncReducer,
    toastr:ToastrReducer
})

export default rootReducer;