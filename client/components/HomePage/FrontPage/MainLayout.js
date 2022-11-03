import SearchBar from "./SearchBar";
import picture from "../../../image/news.png"
import model from "../../../image/model.png"
import simulator from "../../../image/simulator.png"
import styles from "./MainLayout.module.css";
import Link from "next/link";
import Image from "next/image";
import Letter_Logo from "../../../image/logo.png"


const MainLayout = () => {

  return (
    <div className={styles.container}>
      <div className={styles.colored_container}>
        <div className={styles.persuade_text}>
          <h1 className={styles.slogan}>
            <span className={styles.aspect}>
              ASPECT,
            </span>{" "}
            an interactive website to learn financial knowledge.
          </h1>
          <h2 className={styles.explaination}>
            Learn financial terms, explore latest news, gain trading experiences.
          </h2>
        </div>
        <div className={styles.logo_image}>
            <Image
              src={Letter_Logo}
              width={250}
              height={250}
            />
        </div>  
      </div>

      <SearchBar className={styles.search_bar} />

      <div className={styles.section_container}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 ">
        <div style={{marginBottom:20}}>
        <Link href="/news">
            <div className={styles.img_border}>
              <Image src={picture} alt="" />
              <div className={styles.text_cont}>
                  <p className={styles.section_text}>Learn trending <span>NEWS</span> on the current financial markets.</p>
              </div>
            </div>
        </Link>
        </div>

        <div style={{marginBottom:20}}>
        <Link href="/model">
          <div className={styles.img_border}>
            <Image src={model} alt="" />
            <div className={styles.text_cont}>
                <p className={styles.section_text}>Commonly used <span>MODELS</span> for asset valuations and analyses.</p>
            </div>
          </div>
        </Link>
        </div>

        <div style={{marginBottom:20}}>
        <Link href="/simulator">
          <div className={styles.img_border}>
            <Image src={simulator} alt="" />
            <div className={styles.text_cont}>
                <p className={styles.section_text}>Interactive <span>STOCK SIMULATOR</span> for learning and entertainment.</p>
            </div>
          </div>
        </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MainLayout;
