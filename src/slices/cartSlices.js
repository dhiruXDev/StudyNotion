import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const initialState = {
       totalItem : localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")) : 0,
       total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
       cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
       //resetcart
       //addd to cart
       // removve from cart
}
const cartSlice = createSlice({
     name :"cart",
     initialState : initialState,
     reducers  : { 
     addToCart: (state,action)=>{
            const course = action.payload; 
            const index =  state.cart.findIndex((item)=>item._id === course._id);
           // console.log( "Cart index", index);   -> -1 ,when its not present in cart  
            if (index >= 0) {
               //If the course is already in the cart, do not modify the quantity
                toast.error("Course already in Cart")
                return
            } 
             //If the course is not in the cart, add it to the cart
             state.cart.push(course);
             //Update the total quantity and the price
             state.totalItem++; 
              
             state.total += course.price ;

             //Update the localstorage
             localStorage.setItem("cart", JSON.stringify(state.cart)); console.log( "5")
             localStorage.setItem("total",JSON.stringify(state.total));
             localStorage.setItem("totalItem",JSON.stringify(state.totalItem));console.log( "6")

             toast.success("Course added to Cart")
     },
     // remove from cart
      removeFromCart : (state,action)=>{
          const courseId = action.payload;
          const index=  state.cart.findIndex((item)=>item._id === courseId);
          if (index >= 0) {
                // Item is found in cart and , now remove it
                state.totalItem--;
                state.total -= state.cart[index].price;
                state.cart.splice(index,1);
                 //Update localstorage
                 localStorage.setItem("cart" ,JSON.stringify(state.cart));
                 localStorage.setItem("total",JSON.stringify(state.total));
                 localStorage.setItem("totalItem",JSON.stringify(state.totalItem));
                 toast.success("Course is removed from Cart");
          }
      },

     // reset cart
     resetCart : (state)=>{
          state.cart = [];
          state.total = 0;
          state.totalItem=0;

          localStorage.removeItem("cart");
          localStorage.removeItem("total");
          localStorage.removeItem("totalItem");
     }
}
})

export const {addToCart,resetCart,removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;