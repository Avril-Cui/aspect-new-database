import React from 'react'
import styles from "./LeaderBoard.module.css"

function LeaderBoard() {
    const price_change = 2
    const total_change = 0.50
  return (
    <div className={styles.container}>
        <p className={styles.header}>User Leaderboard</p>
        <table className={styles.user_table}>
        <tr>
          <th>Rank</th>
          <th>User Name</th>
          <th>Account Value</th>
          <th>Today's Change</th>
          <th>Total Change</th>
        </tr>
        <tr>
            <td className={styles.ranking}>1</td>
            <td className={styles.normal}>Avril_Cui777</td>
            <td className={styles.normal}>$100,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+50,000,000 (+2000%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>2</td>
            <td className={styles.normal}>KEYL</td>
            <td className={styles.normal}>$52,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+4,000,000 (+400%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>3</td>
            <td className={styles.normal}>CathieWoods</td>
            <td className={styles.normal}>$32,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+1,000,000 (+200%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>4</td>
            <td className={styles.normal}>Elon_Musk</td>
            <td className={styles.normal}>$22,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+900,000 (+190%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>5</td>
            <td className={styles.normal}>FriFrrrr</td>
            <td className={styles.normal}>$19,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+840,000 (+160%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>6</td>
            <td className={styles.normal}>GordonGakko</td>
            <td className={styles.normal}>$12,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+800,000 (+140%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>7</td>
            <td className={styles.normal}>GameMaster</td>
            <td className={styles.normal}>$10,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+770,000 (+120%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>8</td>
            <td className={styles.normal}>Krayon_?</td>
            <td className={styles.normal}>$8,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+740,000 (+100%)</td>
        </tr>
        <tr>
            <td className={styles.ranking}>9</td>
            <td className={styles.normal}>Friday_Cute</td>
            <td className={styles.normal}>$6,000,000</td>
            <td className={styles.normal}style={(price_change < 0) ? {color: "#FD6565"} : {color: "#C9FFD1"}}>+10,000 (+0.10%)</td>
            <td className={styles.normal}style={(total_change > 0) ? {color: "#C9FFD1"} : {color: "#FD6565"}}>+700,000 (+90%)</td>
        </tr>
      </table>
    </div>
  )
}

export default LeaderBoard