import { useState, useEffect } from "react";
import styles from "./screener_table.module.css";
import Link from "next/link";
import companyProfiles from "../../companyProfile";
import { useSelector, useDispatch } from "react-redux";
import { requestPrice } from "../../features/newPrice.js";

const ScreenerTable = () => {
  const change = 1;
  const dispatch = useDispatch();
  const WAIT_TIME = 3000;

  let price_data = useSelector((state) => state.price.value);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [isPrice, setIsPrice] = useState(false);
  const loadingPrice = "N/A";
  useEffect(() => {
    const data = setInterval(() => {
      dispatch(requestPrice());
      setIsPrice(true);
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [isPrice, dispatch]);

  return (
    <div>
      <table className={styles.screener_table}>
        <tbody>
          <tr>
            <th>Company</th>
            <th>Price</th>
            <th>Percentage</th>
          </tr>
          {companyProfiles.map((company) => (
            <tr key={company.id}>
              <Link key={company.id} href={`/company/${company.id}`}>
                <td className={styles.comp_link}>{company.name}</td>
              </Link>
              <td>
                {isPrice ? price_data[company.id]["price"] : loadingPrice}
              </td>

              <td
                style={
                  isPrice
                    ? price_data[company.id]["change"] > 0
                      ? { color: "#C9FFD1" }
                      : { color: "#FD6565" }
                    : change > 0
                    ? { color: "#C9FFD1" }
                    : { color: "#FD6565" }
                }
              >
                {isPrice
                  ? formatter.format(
                      price_data[company.id]["pct_change"]
                    )
                  : "N/A"}{" "}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScreenerTable;
