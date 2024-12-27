import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData :[],
    couseEntireData : [],
    completedLecture : [],
    totalNoOfLecture : 0
}
const viewCourseSlice = createSlice({
    name :"viewCourse",
    initialState : initialState,
    reducers : {
        setCourseSectionData : (state,action)=>{
           state.courseSectionData = action.payload
        },
        setEntireCourseData : (state,action)=>{
            state.couseEntireData = action.payload
        },
        setCompletedLecture : (state,action)=>{
            state.completedLecture  = action.payload
        },
        setTotalNoOfLecture : (state,action)=>{
            state.totalNoOfLecture = action.payload
        },
        updateCompletedLecture: (state, action) => {
            state.completedLecture = [...new Set([...state.completedLecture, ...action.payload])]; // Ensure no duplicates
          },
    }
})

export const {setCompletedLecture,setCourseSectionData,setEntireCourseData,setTotalNoOfLecture,updateCompletedLecture} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;

// add  viewCourse : viewCourseReducer, this one in reducer ---> Reducer Not Added to the Redux Store then teh slice will not added as state
//When you will console     const state = useSelector((state)=>state);   console.log( "State" , state); ---> all the state will print menasn all slices will print
    