import {configureStore} from "@reduxjs/toolkit";
import cartSliceReducer from "../slice/cartSlice"
import querySliceReducer from "../slice/searchQuerySlice"

 export const store = configureStore({
    reducer : {
        cart : cartSliceReducer,
        searchQuery : querySliceReducer,
    }
});

    // <div className="cartContainer">


    //     <div className="cartItems">
    //         <img
    //         alt=""
    //         />
    //         <p className="cartTitle">
    //         productImage Security Camera, IP67 Waterproof Microwave Induction
    //         Night Vision Camera, 1080P HD for Breeding Farm Home Yard Door Fish
    //         Pond(4G-APN Version)
    //         </p>
    //         <div className="cartCount">
    //         <button>-</button>
    //         <p>0</p>
    //         <button style={{backgroundColor:"green"}}>+</button>
    //         <p>Total : 400 </p>
    //         </div>

    //         <button className="cartPayment">Payment</button>
    //     </div> 
    // </div>