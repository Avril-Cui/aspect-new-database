import SectionsLayout from "./SectionsLayout";
import Button from "../../../components/UI/Button";
import styles from "./TheoryMain.module.css"

const TheoryMain = () => {
    return(
        <div style={{marginBottom:100}}>
            <p className={styles.slogan}>
                Apply Financial Concepts Through Advanced Models
            </p>
            <div className={styles.button}>
                <Button>
                    <p className={styles.button_text}>Learn Modeling Methods</p>
                </Button>
            </div>
            <div className={styles.sections}>
                <SectionsLayout />
            </div>
        </div>
    );
};

export default TheoryMain;