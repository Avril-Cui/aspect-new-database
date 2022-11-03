import Button from "../../../components/UI/Button.js"
import styles from "./Sections.module.css"
import Image from "next/image";

const Sections = (props) => {
    return (
        <div className={styles.frame}>
            <Image className={styles.image_style} src={props.img_source} alt="" width={376} height={120} />
            <p className={styles.section_name}>{props.section_name}</p>
            <p className={styles.section_description}>{props.section_description}</p>
            <p className={styles.section_difficulty}>{props.section_difficulty}</p>
            <div className={styles.button}>
                <Button>
                    <p className={styles.button_text}>View More</p>
                </Button>
            </div>
        </div>
    );
};

export default Sections;