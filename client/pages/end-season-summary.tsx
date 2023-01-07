import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/EndSeason/EndSeason.module.css";
import rocket from "../image/logo/rocket.png";
import message from "../image/logo/message.png";
import Image from "next/image";

const EndSeasonSummary = () => {
  const [isEnd, setIsEnd] = useState(false);
  const [event, setEvent] = useState("");
  const [eventInfo, setEventInfo] = useState({
    event_name: "",
    highlight: ["", "", "", "", "", "", "", "", ""],
  });

  useEffect(() => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "post",
      url: "http://127.0.0.1:5000/is-end-game",
      headers: {},
      data: data,
    };
    axios(config)
      .then(function (response: { data: any }) {
        if (JSON.stringify(response.data) == "0") {
          setIsEnd(true);
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/get-end-season-info",
      headers: {},
      data: "",
    })
      .then(function (response: { data: any }) {
        setEventInfo(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });

    // if (isEnd == true) {
    //   axios({
    //     method: "post",
    //     url: "http://127.0.0.1:5000/get-end-season-info",
    //     headers: {},
    //     data: "",
    //   })
    //     .then(function (response: { data: any }) {
    // setEventInfo(response.data)
    //     })
    //     .catch(function (error: any) {
    //       console.log(error);
    //     });
    // }
  }, [isEnd]);

  return (
    <div className={styles.container}>
      <p className={styles.recap_header}>S1 RECAP: {eventInfo.event_name}</p>
      <div className={styles.header_news_container}>
        <div className={styles.inline}>
          <p className={styles.market_summary}>Market Summary</p>
          <div className={styles.highlight_container}>
            <p className={styles.highlight}>Highlights</p>
          </div>
        </div>
      </div>
      <div className={styles.inline}>
        <div className={styles.companies}>
          <p className={styles.company_highlight}>Company Highlights</p>
          <div className={styles.company_container}>
            <div className={styles.inline}>
              <div className={styles.profile_pic}>
                <p className={styles.profile_logo}>W</p>
              </div>
              <div>
                <p className={styles.comp_name}>Wakron, INC.</p>
                <div className={styles.inline}>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "0.75em" }}
                  >
                    WRKN
                  </p>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "1.25em" }}
                  >
                    ASPDX
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "4.25em" }}>
              <p className={styles.pct_change}>+36.99%</p>
              <p className={styles.money_change}>
                +20.99 <span>ASD</span>
              </p>
            </div>
            <div>
              <div className={styles.keyword_container}>
                <p className={styles.keyword}>Keywords</p>
              </div>
              <ul className={styles.list}>
                <li>
                  <span>IPO</span>
                </li>
                <li>
                  <span>New CEO</span>
                </li>
                <li>
                  <span>Public</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.company_container}>
            <div className={styles.inline}>
              <div className={styles.profile_pic}>
                <p className={styles.profile_logo}>W</p>
              </div>
              <div>
                <p className={styles.comp_name}>Wakron, INC.</p>
                <div className={styles.inline}>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "0.75em" }}
                  >
                    WRKN
                  </p>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "1.25em" }}
                  >
                    ASPDX
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "4.25em" }}>
              <p className={styles.pct_change}>+36.99%</p>
              <p className={styles.money_change}>
                +20.99 <span>ASD</span>
              </p>
            </div>
            <div>
              <div className={styles.keyword_container}>
                <p className={styles.keyword}>Keywords</p>
              </div>
              <ul className={styles.list}>
                <li>
                  <span>IPO</span>
                </li>
                <li>
                  <span>New CEO</span>
                </li>
                <li>
                  <span>Public</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.company_container}>
            <div className={styles.inline}>
              <div className={styles.profile_pic}>
                <p className={styles.profile_logo}>W</p>
              </div>
              <div>
                <p className={styles.comp_name}>Wakron, INC.</p>
                <div className={styles.inline}>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "0.75em" }}
                  >
                    WRKN
                  </p>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "1.25em" }}
                  >
                    ASPDX
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "4.25em" }}>
              <p className={styles.pct_change}>+36.99%</p>
              <p className={styles.money_change}>
                +20.99 <span>ASD</span>
              </p>
            </div>
            <div>
              <div className={styles.keyword_container}>
                <p className={styles.keyword}>Keywords</p>
              </div>
              <ul className={styles.list}>
                <li>
                  <span>IPO</span>
                </li>
                <li>
                  <span>New CEO</span>
                </li>
                <li>
                  <span>Public</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.company_container}>
            <div className={styles.inline}>
              <div className={styles.profile_pic}>
                <p className={styles.profile_logo}>W</p>
              </div>
              <div>
                <p className={styles.comp_name}>Wakron, INC.</p>
                <div className={styles.inline}>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "0.75em" }}
                  >
                    WRKN
                  </p>
                  <p
                    className={styles.comp_ticker}
                    style={{ marginLeft: "1.25em" }}
                  >
                    ASPDX
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "4.25em" }}>
              <p className={styles.pct_change}>+36.99%</p>
              <p className={styles.money_change}>
                +20.99 <span>ASD</span>
              </p>
            </div>
            <div>
              <div className={styles.keyword_container}>
                <p className={styles.keyword}>Keywords</p>
              </div>
              <ul className={styles.list}>
                <li>
                  <span>IPO</span>
                </li>
                <li>
                  <span>New CEO</span>
                </li>
                <li>
                  <span>Public</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.leaderboard}>
            <p className={styles.company_highlight}>
              User Leaderboard -- Top 15
            </p>
            <div className={styles.leader_container}>
              <table className={styles.rank_table}>
                <tbody className={styles.table_color}>
                  <tr>
                    <th>Rank</th>
                    <th>User Name</th>
                    <th>Worth</th>
                    <th>Change</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Avril Cui</td>
                    <td>
                      <span>$100,000,000</span>
                    </td>
                    <td>
                      <span>+100.00%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Avril Cui</td>
                    <td>
                      <span>$100,000,000</span>
                    </td>
                    <td>
                      <span>+100.00%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.comment}>
            <p className={styles.company_highlight}>Comments and Feedback</p>
            <div className={styles.comment_container}>
              <div className={styles.user_comment}>
                <div className={styles.inline}>
                  <div className={styles.comment_profile_pic}>A</div>
                  <p className={styles.user_name}>Avril Cui</p>
                  <div className={styles.season_tag}>BIG SHORT</div>
                  <p className={styles.date}>Dec 23</p>
                </div>
                <div className={styles.comment_text_section}>
                  <p className={styles.comment_text}>
                    I genuinely enjoyed this season and I think this is a very
                    meaningful story that taught me a lot about IPO, M&A, and
                    simple finance analysis. It helps me to be more prepared as
                    an investor in the real world! Look forward to next season!
                  </p>
                </div>
                <div className={styles.inline}>
                  <button
                    className={styles.like_button}
                    style={{ paddingTop: "0.25em" }}
                  >
                    <div className={styles.inline}>
                      <Image src={rocket} width="22px" height="22px" alt=""/>
                      <p className={styles.like_num}>10</p>
                    </div>
                  </button>
                  <button
                    className={styles.message_button}
                    style={{ paddingTop: "0.25em" }}
                  >
                    <div className={styles.inline}>
                      <Image src={message} width="22px" height="22px" alt=""/>
                      <p className={styles.like_num}>10</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className={styles.user_comment}>
                <div className={styles.inline}>
                  <div className={styles.comment_profile_pic}>A</div>
                  <p className={styles.user_name}>Avril Cui</p>
                  <div className={styles.season_tag}>BIG SHORT</div>
                  <p className={styles.date}>Dec 23</p>
                </div>
                <div className={styles.comment_text_section}>
                  <p className={styles.comment_text}>
                    I genuinely enjoyed this season and I think this is a very
                    meaningful story that taught me a lot about IPO, M&A, and
                    simple finance analysis. It helps me to be more prepared as
                    an investor in the real world! Look forward to next season!
                  </p>
                </div>
                <div className={styles.inline}>
                  <button
                    className={styles.like_button}
                    style={{ paddingTop: "0.25em" }}
                  >
                    <div className={styles.inline}>
                      <Image src={rocket} width="22px" height="22px" alt=""/>
                      <p className={styles.like_num}>10</p>
                    </div>
                  </button>
                  <button
                    className={styles.message_button}
                    style={{ paddingTop: "0.25em" }}
                  >
                    <div className={styles.inline}>
                      <Image src={message} width="22px" height="22px" alt=""/>
                      <p className={styles.like_num}>10</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className={styles.user_comment}>
                <div className={styles.inline}>
                  <div className={styles.comment_profile_pic}>A</div>
                  <p className={styles.user_name}>Avril Cui</p>
                  <div className={styles.season_tag}>BIG SHORT</div>
                  <p className={styles.date}>Dec 23</p>
                </div>
                <div className={styles.comment_text_section}>
                  <p className={styles.comment_text}>
                    I genuinely enjoyed this season and I think this is a very
                    meaningful story that taught me a lot about IPO, M&A, and
                    simple finance analysis. It helps me to be more prepared as
                    an investor in the real world! Look forward to next season!
                  </p>
                </div>
                <div className={styles.inline}>
                  <button
                    className={styles.like_button}
                    style={{ paddingTop: "0.25em" }}
                  >
                    <div className={styles.inline}>
                      <Image src={rocket} width="22px" height="22px" alt=""/>
                      <p className={styles.like_num}>10</p>
                    </div>
                  </button>
                  <button
                    className={styles.message_button}
                    style={{ paddingTop: "0.25em" }}
                  >
                    <div className={styles.inline}>
                      <Image src={message} width="22px" height="22px" alt=""/>
                      <p className={styles.like_num}>10</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className={styles.show_more}>
                <p>Show More Comments</p>
              </div>
              <div className={styles.center}>
              <textarea
                className={styles.leave_comment}
                placeholder="Leave your comment and share your opinions about S1."
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndSeasonSummary;
