import styles from "./screener_table.module.css";
import Link from "next/link";
import companyProfiles from "../../companyProfile";

const ScreenerTable = (props) => {
  const change = 1;
  const loadingPrice = "N/A";
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
                <td className={styles.comp_link}><a>{company.name}</a></td>
              </Link>
              <td>
                {props.isPrice
                  ? props.price_data[company.id]["price"]
                  : loadingPrice}
              </td>

              <td
                style={
                  props.isPrice
                    ? props.price_data[company.id]["change"] > 0
                      ? { color: "#C9FFD1" }
                      : { color: "#FD6565" }
                    : change > 0
                    ? { color: "#C9FFD1" }
                    : { color: "#FD6565" }
                }
              >
                {props.isPrice
                  ? formatter.format(props.price_data[company.id]["pct_change"])
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
