import { combineReducers } from "@reduxjs/toolkit";
import  authReducer  from "../slices/authSlices"
import profileReducer from "../slices/profileSlices";
import cartReducer from "../slices/cartSlices";
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
import chatReducer from "../slices/chatSlices"
const rootReducer = combineReducers ({
    auth :authReducer,
    profile : profileReducer,
    cart : cartReducer,
    course : courseReducer,
    viewCourse : viewCourseReducer,
    chat :  chatReducer,
})
export default rootReducer;