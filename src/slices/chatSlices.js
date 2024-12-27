// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     // store in sessionStorage 
//     chatMessageData : JSON.parse(sessionStorage.getItem("chatMessageData")) || [] ,
// }
// const chatSlice = createSlice({
//         name :"chat",
//         initialState  : initialState ,
//         reducers : {
//             setChatData(state ,value){
//                   state.chatMessageData = [...state.chatMessageData , value.payload];
                 
//                   // Save the updated chatMessageData to sessionStorage
//                   sessionStorage.setItem("chatMessageData" , JSON.stringify(state.chatMessageData))
//             }
//         }
// });

// export const {setChatData} = chatSlice.actions;
// export default chatSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     // Store chat messages in sessionStorage to persist across reloads
//     chatMessageData: JSON.parse(sessionStorage.getItem("chatMessageData")) || [],
// };

// const chatSlice = createSlice({
//     name: "chat",
//     initialState: initialState,
//     reducers: {
//         setChatData(state, action) {
//             // Add new message to the chatMessageData array
//             state.chatMessageData = [
//                 ...state.chatMessageData,
//                 {
//                     type: action.payload.type, // "user" or "bot"
//                     content: action.payload.content, // The message text
//                 },
//             ];

//             // Save updated chatMessageData to sessionStorage
//             sessionStorage.setItem("chatMessageData", JSON.stringify(state.chatMessageData));
//         },
//     },
// });

// export const { setChatData } = chatSlice.actions;
// export default chatSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     chatMessageData: JSON.parse(sessionStorage.getItem("chatMessageData")) || [],
// };

// const chatSlice = createSlice({
//     name: "chat",
//     initialState: initialState,
//     reducers: {
//         setChatData(state, action) {
//             state.chatMessageData = [...state.chatMessageData, ...action.payload];
//             sessionStorage.setItem("chatMessageData", JSON.stringify(state.chatMessageData));
//         },
//     },
// });

// export const { setChatData } = chatSlice.actions;
// export default chatSlice.reducer;
   

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatMessageData: JSON.parse(sessionStorage.getItem("chatMessageData")) || [],
    chatNotification : true ,
};

const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        setChatData(state, action) {
            state.chatMessageData = action.payload.length == 0 ? [] : [...state.chatMessageData, { ...action.payload }] ;
            // Save the updated chatMessageData to sessionStorage
            sessionStorage.setItem("chatMessageData", JSON.stringify(state.chatMessageData));
        },
        setChatNotification(state,action){
              state.chatNotification = action.payload
        }
    },
});

export const { setChatData ,setChatNotification } = chatSlice.actions;
export default chatSlice.reducer;
