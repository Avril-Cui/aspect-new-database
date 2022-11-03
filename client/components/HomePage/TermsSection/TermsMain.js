import SectionsLayout from "./SectionsLayout";
import Button from "../../../components/UI/Button.js";
import styles from './TermsMain.module.css'
// import Arrow from "/Users/xiaokeai/Desktop/flp_development/Website/src/Components/UI/Arrow.js"

const TermsMains = () => {
    return(
        <div className={styles.main_container} style={{marginBottom:150}}>
            <div className={styles.text}>
                <p className={styles.slogan}>
                    Understand Financial Terms at Your Fingertips
                </p>
                <p className={styles.description}>
                    Learn commonly used jargons and concepts to get a clearer insight of the financial world.
                </p>
            </div>
            <div className={styles.terms}>
                <SectionsLayout />
            </div>
            <div className={styles.button}>
                <Button>
                    <p className={styles.button_text}>Browse All Terminologies</p>
                </Button>
            </div>
            {/* <Arrow/> */}
        </div>
    );
};

export default TermsMains;