import { createSlice } from "@reduxjs/toolkit";

const PaymentSlice = createSlice({
  name: "paymentProduct",
  initialState: {
    products: [], // Stores all selected products
  },
  reducers: {
    setCartProducts(state, action) {
      state.products = action.payload; // Replace state with the new order details
    },
  },
});
export default PaymentSlice.reducer;
export let {setCartProducts} = PaymentSlice.actions;
