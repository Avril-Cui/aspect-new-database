import IndexDisplay from "./index_display";
import MacroCalendar from "./macro_calendar";
import Senarios from "./scenarios";
import styles from "./SimulatorMain.module.css";
import Button from "../../../components/UI/Button.js";
// import Arrow from "../../UI/Arrow";

const SimulatorMain = () => {
  return (
    <div className={styles.main_container} style={{marginBottom:100}}>
      <IndexDisplay />
      <Senarios />
      <MacroCalendar />
      <div className={styles.text_container}>
      <div className={styles.quote}>
        <p className={styles.quote_left}>“</p>
        <p className={styles.slogan}>You Will Be The Next Wolf of Wall Street</p>
        <p className={styles.quote_right}>”</p>
      </div>
      <p className={styles.description}>
        The stock simulator game builds a fun virtual environment for players to
        compete with each other, enjoy fun trading process, and learn finance
        skills. The game provides realistic trading experiences meanwhile
        offering tips and tutorials on how to make appropriate investment
        decisions. Hope everyone enjoys the dynamic scenarios!
      </p>
      <div className={styles.button}>
        <Button><p className={styles.button_text}>Join the Game</p></Button>
      </div>
      </div>
      {/* <Arrow /> */}
    </div>
  );
};

export default SimulatorMain;
