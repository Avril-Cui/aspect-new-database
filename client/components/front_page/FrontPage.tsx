import React from "react";
import styles from "../../styles/front.module.css";
import OverviewChart from "./overview_charts";
import News from "./news";
import Terms from "./terms";
import ScreenerTable from "../simulator/screener_table";
import LeaderBoard from "../simulator/LeaderBoard";
import dynamic from "next/dynamic";
import Link from "next/link";
import ExploreSection from "./ExploreSection";

const Tour = dynamic(() => import("reactour"), { ssr: false });

function FrontPage(props:any) {
  return (
    <div className={styles.container}>
      <Tour steps={props.steps} isOpen={props.enabled} onRequestClose={props.onExit} />
      {props.isEnd ? (
        <div style={{ marginBottom: "2em" }}>
          <p className={styles.header} style={{ marginBottom: "0.5em" }}>
            💡 Reminder From Game 💡
          </p>
          <p className={styles.end_season_note}>
            Season One had officially ended.
          </p>
          <p className={styles.end_season_note}>
            Seasonal recap and analysis on the market and companies released.
          </p>
          <p className={styles.end_season_note}>
            User and bot performances and statistics are provided.
          </p>
          <div className={styles.end_season_note}>
            <Link href="/season-review">
              <a>End Season Summary</a>
            </Link>{" "}
          </div>
        </div>
      ) : null}
      <div className={styles.layer_one}>
        <div className={styles.inline}>
          <p className={styles.header} id="index_graph">
            Market Overview
          </p>
          <button onClick={props.togglePopup} className={styles.tutorial}>
            Start Tutorial ⭐
          </button>
        </div>
        {props.isOpen && (
          <div className={styles.pop_up_container}>
            <div className={styles.box}>
              <p className={styles.game_intro}>
                Welcome to Aspect Market Game!
              </p>
              <p className={styles.game_intro_text}>
                Join game to learn trading and finance by experiencing various
                events in a virtual, dynamic stock market.
              </p>
              <div className={styles.inline}>
                <button className={styles.quit_intro} onClick={props.togglePopclose}>
                  Quit Intro
                </button>
                <button
                  className={styles.start_tutorial}
                  onClick={props.toggleStartTutorial}
                >
                  Start Tutorial
                </button>
              </div>
            </div>
          </div>
        )}
        <OverviewChart price_data={props.price_data} isPrice={props.isPrice} />
      </div>

      <div className={styles.layer_one} style={{ marginTop: "3em" }}>
        <div className={styles.inline}>
          <p className={styles.header} id="news">
            News - Market Information
          </p>
          <span onClick={props.togglePopup1} className={styles.question_mark}>
            ?
          </span>
        </div>
        {props.isOpen1 && (
          <div className={styles.pop_up_container}>
            <div className={styles.box1}>
              <div className={styles.inline}>
                <p className={styles.game_intro1}>News</p>
                <button
                  className={styles.close_candlestick}
                  onClick={props.togglePopclose1}
                >
                  X
                </button>
              </div>
              <p className={styles.game_intro_text1}>
                News in this section report and analysis companies and markets
                from various dimensions, including management, business,
                financials, economics, and products. Read the news and make
                investment decisions based on information provided by the news!
                These articles reveal essential information that is highly
                related to market prices.
              </p>
            </div>
          </div>
        )}
        <News index={props.index} />
      </div>

      <div className={styles.layer_one} style={{ marginTop: "3em" }}>
        <div className={styles.inline}>
          <p className={styles.header} id="terms">
            Terms of the Week
          </p>
          <span onClick={props.togglePopup2} className={styles.question_mark}>
            ?
          </span>
        </div>
        {props.isOpen2 && (
          <div className={styles.pop_up_container}>
            <div className={styles.box2}>
              <div className={styles.inline}>
                <p className={styles.game_intro1}>Terms</p>
                <button
                  className={styles.close_candlestick}
                  onClick={props.togglePopclose2}
                >
                  X
                </button>
              </div>
              <p className={styles.game_intro_text1}>
                Terms in this section provide explanations of important
                terminologies and concepts related to market prices. Learning
                these terms is essential to gain a high stock return rate in
                season 1 of Aspect market game.
              </p>
            </div>
          </div>
        )}
        <div className={styles.terms_section} style={{ marginTop: "1em" }}>
          <div className={styles.inline}>
            <div>
              <p className={styles.terms_theme}>New Month, New Market</p>
              <div className={styles.date_container}>
                <p>
                  {props.current_month}, {props.dd}
                </p>
              </div>
            </div>
            <p className={styles.terms_intro}>
              Welcome to Aspect market game season 1! You can experience a
              dynamic market with interesting companies and exciting stock
              market events here. This season has seven companies available for
              trade, each with unique characteristics. Start exploring these
              companies and build your investment based on them! The four
              financial terminologies below are key terms of the season.
              Remember to understand them before you start your investments —
              they will help!
            </p>
          </div>
          <div style={{ marginTop: "5em" }}>
            <Terms posts={props.posts} />
          </div>
        </div>
      </div>

      <div className={styles.layer_one} style={{ marginTop: "3em" }}>
        <div className={styles.inline} style={{ marginTop: "1em" }}>
          <div>
            <div className={styles.inline}>
              <p
                className={styles.header}
                style={{ marginBottom: "0.75em" }}
                id="screener"
              >
                Stock Screener
              </p>
              <span onClick={props.togglePopup3} className={styles.question_mark}>
                ?
              </span>
            </div>
            {props.isOpen3 && (
              <div className={styles.pop_up_container}>
                <div className={styles.box2}>
                  <div className={styles.inline}>
                    <p className={styles.game_intro1}>Screener</p>
                    <button
                      style={{ marginLeft: "18.5em" }}
                      className={styles.close_candlestick}
                      onClick={props.togglePopclose3}
                    >
                      X
                    </button>
                  </div>
                  <p className={styles.game_intro_text1}>
                    The stock screener reveals the real-time price updates of
                    all companies within the Aspect market game. It helps track
                    the company prices and find the best buy or sell
                    opportunity!
                  </p>
                </div>
              </div>
            )}

            <div className={styles.screener_table}>
              <ScreenerTable isPrice={props.isPrice} price_data={props.price_data} />
            </div>
          </div>
          <div>
            <div className={styles.inline}>
              <p
                className={styles.header}
                style={{ marginBottom: "0.75em", marginLeft: "3em " }}
                id="leaderboard"
              >
                Leaderboard
              </p>
              <span onClick={props.togglePopup4} className={styles.question_mark}>
                ?
              </span>
            </div>
            {props.isOpen4 && (
              <div className={styles.pop_up_container}>
                <div className={styles.box3}>
                  <div className={styles.inline}>
                    <p className={styles.game_intro1}>Ranking</p>
                    <button
                      style={{ marginLeft: "15.5em" }}
                      className={styles.close_candlestick}
                      onClick={props.togglePopclose4}
                    >
                      X
                    </button>
                  </div>
                  <p className={styles.game_intro_text1}>
                    Check out the real-time portfolio value (cash value) of the
                    highest-ranking users. Login to your dashboard to see your
                    and more users&apos; ranks in the game!
                  </p>
                </div>
              </div>
            )}

            <div
              style={{
                marginLeft: "4em ",
              }}
              className={styles.leader_container}
            >
              <LeaderBoard />
            </div>
          </div>
        </div>
      </div>
      <div id="companies">
        <ExploreSection
          companies={props.companies}
          isPrice={props.isPrice}
          price_data={props.price_data}
        />
      </div>
    </div>
  );
}

export default FrontPage;
