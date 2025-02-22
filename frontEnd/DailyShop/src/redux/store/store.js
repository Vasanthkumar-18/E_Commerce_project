import {configureStore} from "@reduxjs/toolkit";
import cartSliceReducer from "../slice/cartSlice"

 export const store = configureStore({
    reducer : {
        cart : cartSliceReducer,
    }
});

 