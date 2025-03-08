import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "../slice/cartSlice";
import authSliceReducer from "../slice/Auth";
import paymentSliceReducer from "../slice/paymentSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer,
    paymentProduct : paymentSliceReducer,
  },
});
