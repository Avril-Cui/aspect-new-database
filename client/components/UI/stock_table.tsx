import styles from "./stock_table.module.css"

const StockTable = (props: any) => {
    return(
        <div className={styles.text}>
            <p className={styles.comp_name}>{props.comp_name}</p>
            <p>{props.price}</p>
            <p>{props.price_change}</p>
            <p>{props.percentage}</p>
        </div>
    );
};

export default StockTable;