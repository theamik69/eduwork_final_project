import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import shippingReducer from "./slices/shippingSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    shipping: shippingReducer, 
  },
});

console.log("oncreate store : ", store.getState());
store.subscribe(() => {
  console.log("STORE CHANGE : ", store.getState());
});

export default store;
