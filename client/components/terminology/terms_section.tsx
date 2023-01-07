import styles from "./terms_section.module.css";
import Button from "../UI/Button";
import Link from "next/link";

const TermsSection = (props: any) => {
  return (
    <div className={styles.terms_section}>
      <p className={styles.section_num}>{props.section_num}</p>
      <div className={styles.inline}>
        <div className={styles.name_container}>
          <p className={styles.section_name}>&#8220;{props.section_name}&#8221;</p>
        </div>

        <div className={styles.intro_text}>
          {props.intro_text}
          <div className={styles.button_container}>
            <Button>
              <Link href={props.start_link}>
                <a className={styles.button_txt}>Start Learning</a>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsSection;
