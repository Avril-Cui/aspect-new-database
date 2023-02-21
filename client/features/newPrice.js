import { setNewPrice } from "../features/priceSlice.js";
import axios from "axios";

export const requestPrice = () => {
    return (dispatch) => {
      axios({
        method: 'post',
        url: 'https://aspect-server.herokuapp.com/current-all-prices',
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