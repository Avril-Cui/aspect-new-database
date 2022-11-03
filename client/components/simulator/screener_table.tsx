import { useState, useEffect } from "react";
import styles from "./screener_table.module.css";
import Link from "next/link";
import companyProfiles from "../../companyProfile";

const ScreenerTable = () => {
  const [stockPrice, setStockPrice] = useState([
    ["wrkn", 100.98],
    ["hhw", 0],
    ["sgo", 0],
    ["fsin", 0],
    ["jky", 0],
    ["ast", 0],
    ["dsc", 0],
  ]);
  const [stockChange, setStockChange] = useState([
    ["wrkn", 10.25],
    ["hhw", 0],
    ["sgo", 0],
    ["fsin", 0],
    ["jky", 0],
    ["ast", 0],
    ["dsc", 0],
  ]);
  const [stockPctChange, setStockPctChange] = useState([
    ["wrkn", 1.28],
    ["hhw", 0],
    ["sgo", 0],
    ["fsin", 0],
    ["jky", 0],
    ["ast", 0],
    ["dsc", 0],
  ]);

  const WAIT_TIME = 1000 * 1;

  // useEffect(() => {
  //   const data = setInterval(() => {
  //     fetch("/api/updatePrice")
  //       .then((res) => res.json())
  //       .then((result_value) => {
  //         setStockPrice(result_value);
  //       });
  //     fetch("/api/updateChange")
  //       .then((res) => res.json())
  //       .then((result_value) => {
  //         setStockChange(result_value);
  //       });
  //     fetch("/api/updatePctChange")
  //       .then((res) => res.json())
  //       .then((result_value) => {
  //         setStockPctChange(result_value);
  //       });
  //   }, WAIT_TIME);
  //   return () => clearInterval(data);
  // }, [stockPrice]);

  // console.log(stockPrice[1][1]);

  return (
    <div>
      <table className={styles.screener_table}>
        <tr>
          <th>Company</th>
          <th>Price</th>
          <th>Change</th>
          <th>Percentage</th>
        </tr>
        {companyProfiles.map((company: any) => (
          <tr key={company.id}>
            <Link key={company.id} href={`/company/${company.id}`}>
              <td className={styles.comp_link}>{company.name}</td>
            </Link>
            <td>{stockPrice[company.index][1]}</td>
            <td
              style={
                stockChange[company.index][1] > 0
                  ? { color: "#C9FFD1" }
                  : { color: "#FD6565" }
              }
            >
              {stockChange[company.index][1]}
            </td>
            <td
              style={
                stockPctChange[company.index][1] > 0
                  ? { color: "#C9FFD1" }
                  : { color: "#FD6565" }
              }
            >
              {stockPctChange[company.index][1]}%
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ScreenerTable;
