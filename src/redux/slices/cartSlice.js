import { createSlice } from "@reduxjs/toolkit";

const CART_LOCAL_STORAGE_KEY = "cart";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) || [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.data.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                itemInCart.qty++;
            } else {
                state.data.push(action.payload);
            }
        },
        deleteCartItem: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.data = [];
            localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
        },
    },
});

export const { addToCart, deleteCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;