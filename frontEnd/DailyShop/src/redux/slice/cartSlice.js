import { createSlice } from "@reduxjs/toolkit";
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: getInitialCart(),
  },
  reducers: {
    addItem(state, action) {
      state.cartItems.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeItem(state, action) {
      let itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartProduct) => cartProduct.id !== itemId
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});
export default cartSlice.reducer;
export let { addItem, removeItem } = cartSlice.actions;
