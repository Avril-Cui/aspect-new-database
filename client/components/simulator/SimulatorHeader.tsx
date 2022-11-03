import React from "react";
import Image from "next/image";
import styles from "../../styles/simulator/simulator.module.css";
import virus1 from "../../image/virus1.png";

function SimulatorHeader() {
  return (
    <div className={styles.slogan_container}>
      <div style={{ marginTop: 125 }}>
        {/* <div className={styles.virus1}>
          <Image src={virus1} width={150} height={140} />
        </div> */}
        <div className={styles.no_img_slogan}>
          <p className={styles.title}>Aspect Trading Game</p>
          <div className={styles.intro_center}>
            <p className={styles.intro}>
              Novel Finance game to explore interesting companies and exciting
              trading environments!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulatorHeader;
