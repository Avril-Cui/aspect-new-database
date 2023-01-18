import styles from "../overview_charts.module.css";
import Link from "next/link";

function HeaderTemplate(props: any) {
  const comp_name = props.comp_name.toLowerCase()
  let route = "/"
  if (comp_name != "apinx"){
    route = `/company/${comp_name}`
  }
  return (
    <Link href={route}>
        <button
          className={
            props.category == 1
              ? styles.comp_type_container_shadow
              : styles.comp_type_container
          }
          onClick={() => props.setCompGraph(1)}
        >
          <div className={styles.inline}>
            <div className={styles.comp_type_profile}>
              <p>{props.comp_name.charAt(0)}</p>
            </div>
            <p className={styles.comp_type_name}>{props.comp_name}</p>
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
      </Link>
  );
}

export default HeaderTemplate;
