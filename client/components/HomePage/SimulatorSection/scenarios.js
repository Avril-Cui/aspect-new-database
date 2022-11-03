import styles from "./scenarios.module.css";
const Senarios = () => {
  return (
    <div className={styles.frame}>
      <p className={styles.text}>Explore Interesting Scenarios</p>
      <div style={{ marginLeft: 10 }} >
          <div className={styles.scenarios} style={{ width: 130, marginLeft: 30}}>Bankrupcy</div>
          <div className={styles.scenarios} style={{ width: 130, marginTop: -40, marginLeft: 290}}>Acquisition</div>
          <div className={styles.scenarios} style={{ width: 60, marginTop: 15, marginLeft: 120}}>IPO</div>
          <div className={styles.scenarios} style={{ width: 110, marginTop: -40, marginLeft: 240}}>Pandemic</div>
          <div className={styles.scenarios} style={{ width: 150, marginTop: 15, marginLeft: 40}}>New Product</div>
          <div className={styles.scenarios} style={{ width: 60, marginTop: -40, marginLeft: 270}}>ESG</div>
          <div className={styles.scenarios} style={{ width: 160, marginTop: 15, marginLeft: 0}}>Supply Chain</div>
          <div className={styles.scenarios} style={{ width: 200, marginTop: -40, marginLeft: 250}}>Management Team</div>
      </div>
    </div>
  );
};

export default Senarios;
