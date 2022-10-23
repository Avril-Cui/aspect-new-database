import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/priceSlice.js";
import { requestPrice } from "../features/newPrice.js";

function Test() {
  const dispatch = useDispatch();
  const WAIT_TIME = 3000;

  let price = useSelector((state: any) => state.price.value);
  useEffect(() => {
    const data = setInterval(() => {
      dispatch(requestPrice())
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, []);
  console.log(price.wrkn)

  return (
    <div style={{ marginTop: "10em" }}>
      <div>
        <span>{JSON.stringify(price)}</span>
      </div>
    </div>
  );
}

export default Test;
