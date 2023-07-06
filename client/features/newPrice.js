import { setNewPrice } from "../features/priceSlice.js";
import axios from "axios";

export const requestPrice = () => {
    return (dispatch) => {
      axios({
        method: 'post',
        url: `${process.env.serverConnection}/current-all-prices`,
        headers: {}
      })
        .then((response) => {
          const price = response.data;
          dispatch(setNewPrice(price))
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };