import profile from "../../public/profile.jpg";
import styles from "../../styles/product/product.module.css";
import Head from "next/head";
import Image from "next/image";
import company from "../../image/logo/company.png";
import terms from "../../image/logo/terms.png";
import model from "../../image/logo/model.png";
import main from "../../image/screenshot/main.png";
import Link from "next/link";
import ReactPlayer from "react-player";
import twi from "../../public/twitter.png";
import ins from "../../public/instagram.png";
import git from "../../public/git.png";
import trade_info from "../../public/trade.png";
import Timeline from "./timeline";

const Product = () => {
  return (
    <div className={styles.container}>

      <div className={styles.bg1}>
        <div className={styles.layer_one}>
          <h1 className={styles.header}>Dynamic market trading game</h1>
          <p className={styles.intro}>
            Join Aspect to learn trading and finance by experiencing a virtual,
            dynamic stock market with various interesting events.
          </p>
          <div className={styles.btns}>
            <Link href="/auth/signup">
              <a>
                <button className={styles.join_btn}>
                  Join game <span>&gt;</span>
                </button>{" "}
              </a>
            </Link>

            <Link href="https://drive.google.com/file/d/1ewv4b0DfugUCzB8tz5Wtf9PU4weWu647/view?usp=sharing">
              <a>
                <button className={styles.view_btn}>View whitepaper</button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.layer_two}>
          <div className={styles.inline} style={{ marginLeft: "2em" }}>
            <div className={styles.inline_cell}>
              <div className={styles.logo}>
                <Image src={company} width="50px" height="50px" />
              </div>
              <p className={styles.inline_header}>Explore Companies</p>
              <p className={styles.inline_text}>
                Analysis interesting companies with unique traits.
              </p>
            </div>

            <div className={styles.inline_cell}>
              <div className={styles.logo}>
                <Image src={terms} width="50px" height="50px" />
              </div>
              <p className={styles.inline_header}>Learn Terminologies</p>
              <p className={styles.inline_text}>
                Understand important financial terms and useful models.
              </p>
            </div>

            <div className={styles.inline_cell}>
              <div className={styles.logo}>
                <Image src={model} width="50px" height="50px" />
              </div>
              <p className={styles.inline_header}>Implement Models</p>
              <p className={styles.inline_text}>
                Guides to implement models to assist investment decisions.
              </p>
            </div>

            <div className={styles.inline_cell}>
              <div className={styles.logo}>
                <Image src={company} width="50px" height="50px" />
              </div>
              <p className={styles.inline_header}>Compete With Friends</p>
              <p className={styles.inline_text}>
                Join game and compete & discuss with other users.
              </p>
            </div>
          </div>
          <div className={styles.display_game}>
            <Image src={main} width="1280" height="630px" />
          </div>
        </div>
      </div>

      <div className={styles.bg2}>
        <div className={styles.layer_one}>
          <div className={styles.inline}>
            <div className={styles.video}>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=vsqmaqe-xBU&ab_channel=AspectGameMaster"
                height="489px"
                width="870px"
              />
            </div>
            <div>
              <p className={styles.slogan}>
                "While playing, observe a clearer insight of the financial
                world. "
              </p>
              <div className={styles.social_media}>
                <p className={styles.info_header}>
                  Find information and updates on Aspect
                </p>
                <div className={styles.center}>
                  <div className={styles.icons}>
                    <div style={{ marginLeft: "-1em" }}>
                      <Image src={twi} width={50} height={50} />
                    </div>
                    <div style={{ marginLeft: "2em" }}>
                      <Image src={ins} width={50} height={50} />
                    </div>
                    <div style={{ marginLeft: "2em" }}>
                      <Image src={git} width={50} height={50} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bg3}>
        <p className={styles.header1}>Learn with gaming, game to learn</p>
        <div className={styles.center}>
          <p className={styles.intro1}>
            Aspect aims to create a virtual stock market with intense and
            interesting companies and market events parallel to the real world.
            By doing so, we hope to simulate trading under exceptional market
            events, preparing users for trading individually in the stock
            market.
          </p>
        </div>
        <div className={styles.display_game1}>
          <Image src={trade_info} width="1280" height="490" />
        </div>
        <div>
          <div className={styles.vl}></div>
          <Timeline />
        </div>
      </div>

      <div className={styles.vl1} style={{ marginLeft: "26em" }} />
      <div
        className={styles.vl2}
        style={{ marginLeft: "45.95em", height: "10em" }}
      />
      <div className={styles.icon_box} />
      <div
        className={styles.vl2}
        style={{ marginLeft: "45.95em", height: "5em" }}
      />

      <div className={styles.comment_from_developer}>
        <div className={styles.layer_one}>
          <h2 className={styles.letter_header}>Notes From Developer</h2>
          <div className={styles.inline}>
            <div className={styles.logo_img}>
              <Image src={profile} width="300px" height="277px" />
            </div>
            <div className={styles.contact_info}>
              <p className={styles.name}>Avril Cui</p>
              <p className={styles.contact}>Founder</p>
              <p className={styles.contact1}>AvrilCui17@gmail.com</p>
            </div>
            <div style={{ marginTop: "5em" }}>
              <p className={styles.description}>
                This website is created by <b>Avril Cui</b>. I am currently a
                17-year-old high school senior.
              </p>
              <p className={styles.description} style={{ marginTop: "1em" }}>
                Learning finance is always a challenging task. Complicated
                terminologies, intense market fluctuations, various models. But
                gaming is always a fun thing to do. I love video games. So one
                day I wondered: Can I combine learning finance and gaming?
              </p>
              <p className={styles.description} style={{ marginTop: "1em" }}>
                I hope Aspect can help simplify the learning process through
                gaming. The game will have the best effect when playing on a
                computer. In the future season, more features will be constantly
                updated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
