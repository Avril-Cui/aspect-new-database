import styles from "../overview_charts.module.css";

function Wrkn(props: any) {
  return (
    <div>
      <button
        className={
          props.category == 2
            ? styles.comp_type_container_shadow
            : styles.comp_type_container
        }
        onClick={() => props.setCategory(2)}
      >
        <div className={styles.inline}>
          <div className={styles.comp_type_profile}>
            <p>W</p>
          </div>
          <p className={styles.comp_type_name}>Wakron, INC</p>
        </div>
        <div className={styles.comp_type_prices}>
          <div className={styles.inline}>
            <p className={styles.comp_type_price}>
              131.09 <span>ASD</span>
            </p>
            <p className={styles.comp_type_pct_change}>+0.28%</p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default Wrkn;
