import styles from "./stats.module.css";
import Balance from "./Pages/bs";
import Income from "./Pages/is";
import Dividend from "./Pages/dividend";
import CashFlow from "./Pages/cs";
import Valuation from "./Pages/valuation";
import { useState } from "react";

const MainPage = (props:any) => {
  const [chart, setChart] = useState("valuation");

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.graph_type}>
          <table className={styles.stats_info_table}>
            <tbody>
            <tr>
              <td className={styles.sections}>
                <button onClick={() => setChart("valuation")} className={styles.border}>Valuation</button>
              </td>
              <td className={styles.sections}>
                <button onClick={() => setChart("income")} className={styles.border}>Income</button>
              </td>
              <td className={styles.sections}>
                <button onClick={() => setChart("balance")} className={styles.border}>Balance Sheet</button>
              </td>
              <td className={styles.sections}>
                <button onClick={() => setChart("cashflow")} className={styles.border}>Cash Flow</button>
              </td>
              <td className={styles.sections}>
                <button onClick={() => setChart("dividend")} >Dividend</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      {chart === "valuation" && <div><Valuation company_name={props.company_name}/></div>}
      {chart === "income" && <div><Income company_name={props.company_name}/></div>}
      {chart === "balance" && <div><Balance company_name={props.company_name}/></div>}
      {chart === "cashflow" && <div><CashFlow company_name={props.company_name}/></div>}
      {chart === "dividend" && <div><Dividend company_name={props.company_name}/></div>}


    </div>
  );
};
export default MainPage;
