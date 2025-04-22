import { createSlice } from "@reduxjs/toolkit";

const getInitialOrder = () => {
  const storedOrder = localStorage.getItem("orderDetails");
  return storedOrder ? JSON.parse(storedOrder) : [];
};
const PaymentSlice = createSlice({
  name: "paymentProduct",
  initialState: {
    orderProducts: getInitialOrder(), // Stores all selected products
  },
  reducers: {
    setCartProducts(state, action) {
      state.orderProducts = [action.payload];
      localStorage.setItem("orderDetails", JSON.stringify(state.orderProducts));
    },
    removeOrderDetails(state, action) {
      localStorage.removeItem("orderDetails");
      // state.orderProducts = [];
    },
  },
});
export default PaymentSlice.reducer;
export let { setCartProducts, removeOrderDetails } = PaymentSlice.actions;
