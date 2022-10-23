import { configureStore } from "@reduxjs/toolkit";
import priceReducer from "../features/priceSlice.js";

export default configureStore({
  reducer: {
    price: priceReducer,
  },
});
