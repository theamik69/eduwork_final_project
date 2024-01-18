import { createSlice } from "@reduxjs/toolkit";

const shippingSlice = createSlice({
    name: "shipping",
    initialState: {
        data: JSON.parse(localStorage.getItem("shipping")) || [],
    },
    reducers: {
        addToShipping: (state, action) => {
            state.data = [action.payload];
        },
        deleteShippingtItem: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addToShipping, deleteShippingtItem } = shippingSlice.actions;
export default shippingSlice.reducer;
