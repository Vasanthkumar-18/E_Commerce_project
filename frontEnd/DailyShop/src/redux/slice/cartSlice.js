import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem(state, action) {
      
      state.push(action.payload)
    },
    removeItem(state, action) { 
      let itemId = action.payload
      let newProduct = state.filter( cartProduct => cartProduct.id !== itemId)

      return newProduct
    },
  },
});
export default cartSlice.reducer;
export let { addItem, removeItem } = cartSlice.actions;
