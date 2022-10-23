import { useState, useEffect } from "react";
import TradeInput from "../components/dashboard/TradeInput";
import ShowPortfolio from "../components/dashboard/ShowPortfolio";
import dynamic from "next/dynamic";
import ShowCompValue from "../components/dashboard/ShowCompValue";
import styles from "../styles/portfolio.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";
const PortfolioChart = dynamic(
  () => import("../components/dashboard/PortfolioChart"),
  {
    ssr: false,
  }
);

const Home = (props: any) => {
  const router = useRouter();
  const cookies = new Cookies();
  const userData = cookies.get("userData");

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const WAIT_TIME = 20000;
  const [rank, setRank] = useState(0);

  useEffect(() => {
    console.log(userData);

    var data = JSON.stringify(userData.user_name);
    console.log(data);
    console.log(userData.user_name);

    var config = {
      method: "post",
      url: "http://127.0.0.1:5000/show-ranking",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setRank(response.data);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => clearInterval(data);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.center_container}>
          <div className={styles.inline}>
            <div>
              <p className={styles.header}>PORTFOLIO OVERVIEW</p>
              <div
                className={styles.value_container}
                style={{ marginBottom: "1.25em" }}
              >
                <ShowPortfolio />
              </div>
              <div>
                <p className={styles.header}>GAME STATUS</p>
                <div
                  className={styles.value_container}
                  style={{
                    paddingLeft: "1em",
                    paddingTop: "0.5em",
                    paddingBottom: "0.75em",
                  }}
                >
                  <p className={styles.title}>CURRENT RANK</p>
                  <p className={styles.account_value}>{rank}</p>
                  <button className={styles.trade_btn} onClick={togglePopup}>
                    <p>Trade Stocks</p>
                  </button>
                  {isOpen && (
                    <TradeInput
                      toggleClose={togglePopup}
                      user_data={userData}
                    />
                  )}
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "1em" }}>
              <p className={styles.header}>HOLDING DETAIL</p>
              <div className={styles.holdings_container}>
                <ShowCompValue user_data={userData} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div
            className={styles.inline}
            style={{ marginTop: "1.5em", marginBottom: "7em" }}
          >
            <div>
              <p className={styles.header}>PORTFOLIO PERFORMANCE CHART</p>
              <div className={styles.chart_container}>
                <div className={styles.chart}>
                  <PortfolioChart />
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "1em" }}>
              <p className={styles.header}>GAME RANKING</p>
              <div className={styles.ranking_container}>
                <table className={styles.user_table}>
                  <tbody>
                    <tr>
                      <th>Rank</th>
                      <th>User Name</th>
                      <th>Net Worth</th>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>1</td>
                      <td className={styles.normal}>Avril_Cui777</td>
                      <td className={styles.normal}>$100,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>2</td>
                      <td className={styles.normal}>KEYL</td>
                      <td className={styles.normal}>$52,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>3</td>
                      <td className={styles.normal}>CathieWoods</td>
                      <td className={styles.normal}>$32,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>4</td>
                      <td className={styles.normal}>Elon_Musk</td>
                      <td className={styles.normal}>$22,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>5</td>
                      <td className={styles.normal}>FriFrrrr</td>
                      <td className={styles.normal}>$19,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>6</td>
                      <td className={styles.normal}>GordonGakko</td>
                      <td className={styles.normal}>$12,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>7</td>
                      <td className={styles.normal}>GameMaster</td>
                      <td className={styles.normal}>$10,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>8</td>
                      <td className={styles.normal}>Krayon_?</td>
                      <td className={styles.normal}>$8,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>9</td>
                      <td className={styles.normal}>Friday_Cute</td>
                      <td className={styles.normal}>$6,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>10</td>
                      <td className={styles.normal}>Kelly777</td>
                      <td className={styles.normal}>$5,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>11</td>
                      <td className={styles.normal}>IceBreaker</td>
                      <td className={styles.normal}>$4,000,000</td>
                    </tr>
                    <tr>
                      <td className={styles.ranking}>12</td>
                      <td className={styles.normal}>Dimond?</td>
                      <td className={styles.normal}>$3,000,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
