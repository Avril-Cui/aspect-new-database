import React from "react";
import styles from "./LeaderBoard.module.css";

function LeaderBoard() {
  const price_change = 2;
  const total_change = 0.5;
  return (
    <table className={styles.user_table}>
      <tbody>
        <tr>
          <th>Rank</th>
          <th>User Name</th>
          <th>Account Value</th>
          <th>Today&#8216;s Change</th>
          <th>Total Change</th>
        </tr>
        <tr>
          <td className={styles.ranking}>1</td>
          <td className={styles.normal}>Avril_Cui777</td>
          <td className={styles.normal}>$500,000</td>
          <td
            className={styles.normal}
            style={
              price_change < 0 ? { color: "#FD6565" } : { color: "#C9FFD1" }
            }
          >
            +12,000
          </td>
          <td
            className={styles.normal}
            style={
              total_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
            }
          >
            +500%
          </td>
        </tr>
        <tr>
          <td className={styles.ranking}>2</td>
          <td className={styles.normal}>KEYL</td>
          <td className={styles.normal}>$400,000</td>
          <td
            className={styles.normal}
            style={
              price_change < 0 ? { color: "#FD6565" } : { color: "#C9FFD1" }
            }
          >
            +10,000
          </td>
          <td
            className={styles.normal}
            style={
              total_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
            }
          >
            +400%
          </td>
        </tr>
        <tr>
          <td className={styles.ranking}>3</td>
          <td className={styles.normal}>CathieWoods</td>
          <td className={styles.normal}>$300,000</td>
          <td
            className={styles.normal}
            style={
              price_change < 0 ? { color: "#FD6565" } : { color: "#C9FFD1" }
            }
          >
            +9,000
          </td>
          <td
            className={styles.normal}
            style={
              total_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
            }
          >
            +300%
          </td>
        </tr>
        <tr>
          <td className={styles.ranking}>4</td>
          <td className={styles.normal}>Elon_Musk</td>
          <td className={styles.normal}>$200,000</td>
          <td
            className={styles.normal}
            style={
              price_change < 0 ? { color: "#FD6565" } : { color: "#C9FFD1" }
            }
          >
            +5000
          </td>
          <td
            className={styles.normal}
            style={
              total_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
            }
          >
            +100%
          </td>
        </tr>
        <tr>
          <td className={styles.ranking}>5</td>
          <td className={styles.normal}>FriFrrrr</td>
          <td className={styles.normal}>$150,000</td>
          <td
            className={styles.normal}
            style={
              price_change < 0 ? { color: "#FD6565" } : { color: "#C9FFD1" }
            }
          >
            +3000
          </td>
          <td
            className={styles.normal}
            style={
              total_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
            }
          >
            +50%
          </td>
        </tr>
        <tr>
          <td className={styles.ranking}>6</td>
          <td className={styles.normal}>GordonGakko</td>
          <td className={styles.normal}>$120,000</td>
          <td
            className={styles.normal}
            style={
              price_change < 0 ? { color: "#FD6565" } : { color: "#C9FFD1" }
            }
          >
            +1000
          </td>
          <td
            className={styles.normal}
            style={
              total_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
            }
          >
            +20%
          </td>
        </tr>
        <tr>
          <td className={styles.ranking}>7</td>
          <td className={styles.normal}>GameMaster</td>
          <td className={styles.normal}>$110,000</td>
          <td
            className={styles.normal}
            style={
              price_change < 0 ? { color: "#FD6565" } : { color: "#C9FFD1" }
            }
          >
            +3250
          </td>
          <td
            className={styles.normal}
            style={
              total_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
            }
          >
            +10%
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default LeaderBoard;
