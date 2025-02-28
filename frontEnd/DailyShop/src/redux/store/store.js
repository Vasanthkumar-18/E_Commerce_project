import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../slice/cartSlice";
import authSliceReducer from "../slice/Auth";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
});
