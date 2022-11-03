import styles from "./macro_calendar.module.css";

const MacroCalendar = () => {
    return(
        <div className={styles.frame}>
            <p className={styles.text}>Macro Calendar</p>
            <ul className={styles.macro_events}>
                <li><div className={styles.events_container}>❗ New Tech</div></li>
                <li><div className={styles.events_container}>❗ Big Invention</div></li>
                <li><div className={styles.events_container}>👾 Stock Crash</div></li>
                <li><div className={styles.events_container}>👾 High Mortage</div></li>
            </ul>
        </div>
    );
};

export default MacroCalendar;