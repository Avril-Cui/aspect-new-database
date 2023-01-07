import { createSlice } from "@reduxjs/toolkit";

export const priceSlice = createSlice({
  name: "price",
  initialState: {
    value: {
      "ast": {
          "change": null,
          "pct_change": null,
          "price": null
      },
      "dsc": {
          "change": null,
          "pct_change": null,
          "price": null
      },
      "fsin": {
          "change": null,
          "pct_change": null,
          "price": null
      },
      "hhw": {
          "change": null,
          "pct_change": null,
          "price": null
      },
      "index": {
          "change": null,
          "pct_change": null,
          "price": null
      },
      "jky": {
          "change": null,
          "pct_change": null,
          "price": null
      },
      "sgo": {
          "change": null,
          "pct_change": null,
          "price": null
      },
      "wrkn": {
          "change": null,
          "pct_change": null,
          "price": null
      }
  },
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
