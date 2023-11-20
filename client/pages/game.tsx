import profile from "../public/profile.jpg";
import styles from "../styles/product/product.module.css";
import Head from "next/head";
import Image from "next/image";
import company from "../image/logo/company.png";
import ranking from "../public/ranking.jpg";
import bots_chart from "../public/bots_chart.png";
import company1 from "../image/logo/company1.png";
import terms from "../image/logo/terms.png";
import terms1 from "../image/logo/terms1.png";
import model from "../image/logo/model.png";
import model1 from "../image/logo/model1.png";
import game from "../image/logo/game.png";
import game1 from "../image/logo/game1.png";
import main from "../public/company_profile.jpg";
import Link from "next/link";
import ReactPlayer from "react-player";
import terms_diagram from "../public/terms_diagram.png";
// import twi from "../public/twitter.png";
// import ins from "../public/instagram.png";
// import git from "../public/git.png";
import trade_info from "../public/trade.png";
import Timeline from "../components/Product/timeline";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Product = () => {
  const { loginWithRedirect } = useAuth0();
  const [mainPic, setMainPic] = useState(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Introduction</title>
      </Head>
      <div className={styles.bg1}>
        <div className={styles.layer_one}>
          <h1 className={styles.header}>Dynamic market trading game</h1>
          <p className={styles.intro}>
            Join Aspect to learn trading and finance by experiencing a virtual,
            dynamic stock market with various interesting events.
          </p>
          <div className={styles.btns}>
            <a onClick={() => loginWithRedirect()}>
              <button className={styles.join_btn}>
                Join game <span>&gt;</span>
              </button>{" "}
            </a>

            <Link href="https://drive.google.com/file/d/10qpmMTmv66Zzql-NglYSEgiS28SiUihz/view?usp=sharing">
              <a>
                <button className={styles.view_btn}>View whitepaper</button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.layer_two}>
          <div className={styles.inline} style={{ marginLeft: "2em" }}>
            {mainPic == 0 ? (
              <div className={styles.inline_cell1}>
                <div className={styles.logo}>
                  <Image src={company1} width="42px" height="42px" />
                </div>
                <p className={styles.inline_header1}>Explore Companies</p>
                <p className={styles.inline_text1}>
                  Analysis interesting companies with unique traits.
                </p>
              </div>
            ) : (
              <div className={styles.inline_cell} onClick={() => setMainPic(0)}>
                <div className={styles.logo}>
                  <Image src={company} width="42px" height="42px" />
                </div>
                <p className={styles.inline_header}>Explore Companies</p>
                <p className={styles.inline_text}>
                  Analysis interesting companies with unique traits.
                </p>
              </div>
            )}

            {mainPic == 1 ? (
              <div className={styles.inline_cell1}>
                <div className={styles.logo}>
                  <Image src={terms1} width="50px" height="50px" />
                </div>
                <p className={styles.inline_header1}>Learn Terminologies</p>
                <p className={styles.inline_text1}>
                  Understand important financial terms and useful models.
                </p>
              </div>
            ) : (
              <div className={styles.inline_cell} onClick={() => setMainPic(1)}>
                <div className={styles.logo}>
                  <Image src={terms} width="50px" height="50px" />
                </div>
                <p className={styles.inline_header}>Learn Terminologies</p>
                <p className={styles.inline_text}>
                  Understand important financial terms and useful models.
                </p>
              </div>
            )}

            {mainPic == 2 ? (
              <div className={styles.inline_cell1}>
                <div className={styles.logo}>
                  <Image src={game1} width="50px" height="50px" />
                </div>
                <p className={styles.inline_header1}>Compete with Friends</p>
                <p className={styles.inline_text1}>
                  Compete for highest ranks in leaderboard and win prizes.
                </p>
              </div>
            ) : (
              <div className={styles.inline_cell} onClick={() => setMainPic(2)}>
                <div className={styles.logo}>
                  <Image src={game} width="50px" height="50px" />
                </div>
                <p className={styles.inline_header}>Compete with Friends</p>
                <p className={styles.inline_text}>
                  Compete for highest ranks in leaderboard and win prizes.
                </p>
              </div>
            )}

            {mainPic == 3 ? (
              <div className={styles.inline_cell1}>
                <div className={styles.logo}>
                  <Image src={model1} width="50px" height="50px" />
                </div>
                <p className={styles.inline_header1}>Interact with Bots</p>
                <p className={styles.inline_text1}>
                  Ask and bid stocks with various intelligent bots.
                </p>
              </div>
            ) : (
              <div className={styles.inline_cell} onClick={() => setMainPic(3)}>
                <div className={styles.logo}>
                  <Image src={model} width="50px" height="50px" />
                </div>
                <p className={styles.inline_header}>Interact with Bot</p>
                <p className={styles.inline_text}>
                  Ask and bid stocks with various intelligent bots.
                </p>
              </div>
            )}
          </div>
          <div className={styles.display_game}>
            {mainPic == 0 ? (
              <div
                style={{
                  marginLeft: "1em",
                  marginTop: "1em",
                  marginBottom: "1em",
                }}
              >
                <Image src={main} width="1180px" height="570px" />
              </div>
            ) : mainPic == 1 ? (
              <div className={styles.terms_overall_container}>
                <div>
                  <div
                    className={styles.terms_container}
                    style={{ marginBottom: "2em" }}
                  >
                    <p className={styles.terms_container_h}>Complex Concepts</p>
                    <p className={styles.terms_container_p}>
                      Tutorial on fundamental & technical models, risk
                      management, trading strategies, etc. Preparing for future
                      investments in the real-world market.
                    </p>
                  </div>
                  <div
                    className={styles.terms_container}
                    style={{ marginBottom: "2em" }}
                  >
                    <p className={styles.terms_container_h}>
                      Simple Explanation
                    </p>
                    <p className={styles.terms_container_p}>
                      Aspect aims to simplify the learning process of finance
                      through more logical materials with abundant examples,
                      graphics, and visualizations.
                    </p>
                  </div>
                  <div className={styles.terms_container}>
                    <p className={styles.terms_container_h}>
                      Convenient Learning
                    </p>
                    <p className={styles.terms_container_p}>
                      Use the search feature to look for specific terms. Under
                      all terms, share opinions and discuss with each other in
                      the comment section.
                    </p>
                  </div>
                </div>
                <div style={{ marginLeft: "2em", marginTop: "1.25em" }}>
                  {" "}
                  <Image src={terms_diagram} width="570px" height="460px" />
                </div>
              </div>
            ) : mainPic == 2 ? (
              <div
                style={{
                  marginLeft: "1em",
                  marginTop: "1em",
                  marginBottom: "1em",
                }}
              >
                <Image src={ranking} width="1180px" height="540px" />
              </div>
            ) : mainPic == 3 ? (
              <div className={styles.terms_overall_container}>
                <div>
                  <p className={styles.ai_header}>AI Bots for High</p>
                  <p className={styles.ai_header1}>Playability & Interaction</p>
                  <p className={styles.ai_description}>
                    The bots serve to increase diversity and ensure fairness in
                    the game. By processing market information, including
                    historical prices, current prices, stock volumes, news, and
                    financial statistics, the bots evaluate the situation based
                    on their individual strategies and decide whether an order
                    should be placed or accepted.
                  </p>
                </div>
                <div style={{ marginLeft: "7em", marginTop: "1.25em" }}>
                  <Image src={bots_chart} width="500px" height="400px" />
                </div>
              </div>
            ) : null}
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
                &quot;While playing, observe a clearer insight of the financial
                world. &quot;
              </p>
              <div className={styles.github}>Get Started on GitHub</div>
              {/* <div className={styles.social_media}>
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
              </div> */}
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
