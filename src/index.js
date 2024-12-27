import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"
import {Provider} from "react-redux"
import {Toaster} from "react-hot-toast";

const store = configureStore({
  reducer:rootReducer
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <Provider store={store} >
            <BrowserRouter>
                  <App />
                  <Toaster />
            </BrowserRouter>
    </Provider>

);

{/* -----------After removing the React.StrictMode the page will not render twice , otherwise , its render twice , taht cause some issue , but they have better advantage 
   
  ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <Provider store={store} >
            <BrowserRouter>
                  <App />
                  <Toaster />
            </BrowserRouter>
    </Provider>
  </React.StrictMode>

---------------------------------- Advantage of using React.StrictMode ------------------------------------------>
    1 : Promotes Early Error Detection.  --> By exposing potential issues in development, StrictMode ensures your code is robust in production. Without StrictMode, some bugs (e.g., uncleaned effects, unintended re-renders) might only appear in production or after your app grows more complex.
    2 : Ensures Proper Use of useEffect and Other Hooks --> React.StrictMode helps ensure the Hooks and useefect are used correctly.Common mistakes, like forgetting dependency arrays or mismanaging cleanup logic, become more apparent because the component's behavior is tested more rigorously.
    3 : Alerts About Deprecated Features -- >React.StrictMode warns about React features that are unsafe or being deprecated, so you can avoid them and future-proof your app.
    4 : Identifies Side Effects in React Components --> React.StrictMode helps you catch unintentional side effects in your components by mounting and unmounting them twice (only in development).This ensures that any logic with side effects, such as data fetching, subscriptions, or timers, is correctly handled and cleaned up.
); 
*/}