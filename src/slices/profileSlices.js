import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // user :null     ---> due to this line , Login and signUp button was not showing , because the user that loggedIn that was have Token
   //                      jisse ki user !==null means daskBoard was showing , Browser ko sclose krne ke bad bhi , bq the token was 
   //                      was stored in Localstorage . 
   user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null , // Ab nhi hoga problem , means Button ab dikhega
   loading:false
}

// const getUserFromLocalStorage = () => {
//     try {
//         const userData = localStorage.getItem("user");
//         if (userData === "undefined" || userData === null) {
//             return null;
//         }
//         return JSON.parse(userData);
//     } catch (error) {
//         console.error("Error parsing user data from localStorage:", error);
//         return null;
//     }
// };


// const initialState = {
//     user: getUserFromLocalStorage(),
//     loading: false
// }

const profileSlice= createSlice({
    name :"profile",
    initialState : initialState,
    reducers: {
        setUser(state ,value){
            state.user = value.payload
        },
        setLoading(state,value){   // ye profile vala loading hai , and auth ka loading authnticate vaa hai , it will show when data of profile is taking from server and authn vala loading will show when authentication is happening
            state.loading = value.payload
        }
    }
})
export const {setUser,setLoading} = profileSlice.actions;
export default profileSlice.reducer;