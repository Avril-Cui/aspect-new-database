import IndexChart from "./index_chart";
import styles from "./index_display.module.css";


const IndexDisplay = () => {
    return (
        <div className={styles.frame}>
            <p className={styles.text}>Indices Growth Trend</p>
            <IndexChart className={styles.chart} />
        </div>
    );
};

export default IndexDisplay;