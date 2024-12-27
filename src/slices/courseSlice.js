import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step :1,
    course:null,
    editCourse:false,
    paymentLoading:false
}

const  courseSlice= createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
        setCourse(state,value){
              state.course = value.payload
        },
        setStep(state,value){
            state.step = value.payload
        },
        setEditCourse(state,value){
            state.editCourse = value.payload
        },
        setPaymentLoading (state,value){
            state.paymentLoading = value.payload
        },
        resetCourseState : (state)=>{
            state.course = null
            state.editCourse =false
            state.step=1
        }

    }
   
})

export const  {setCourse,setEditCourse,setPaymentLoading,setStep,resetCourseState} = courseSlice.actions
export default courseSlice.reducer;