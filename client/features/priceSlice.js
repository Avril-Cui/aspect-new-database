import { createSlice } from "@reduxjs/toolkit";

export const priceSlice = createSlice({
  name: "price",
  initialState: {
    value: { loading: 100 },
    price_change: "N/A" ,
  },
  reducers: {
    setNewPrice(state, action) {
      const price = action.payload;
      const previous_price = state.value
      state.price_change = previous_price
      state.value = price
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewPrice, increment, decrement, incrementByAmount } =
priceSlice.actions;

export default priceSlice.reducer;
