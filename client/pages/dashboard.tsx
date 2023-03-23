import { useState, useEffect } from "react";
import ShowPortfolio from "../components/dashboard/ShowPortfolio";
import Head from "next/head";
import ShowCompValue from "../components/dashboard/ShowCompValue";
import styles from "../styles/portfolio.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../components/Header/Header";
import LeaderBoard3 from "../components/simulator/LeaderBoard3";
import dynamic from "next/dynamic";
import ExploreSection from "../components/front_page/ExploreSection";
const Tour = dynamic(() => import("reactour"), { ssr: false });
import { useSelector, useDispatch } from "react-redux";
import { requestPrice } from "../features/newPrice.js";
import Trade from "../components/dashboard/Trade";
import AskBidTable from "../components/dashboard/AskBidTable";
import CompanyChart from "../components/dashboard/company_chart";
import PendingOrders from "../components/dashboard/PendingOrders";

export default function Home() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let current_month = month[today.getMonth()];

  const companies: any = {
    ast: {
      index: 0,
      id: "ast",
      short_name: "A",
      name: "Astral Company Limited",
      name2: "Astral",
      overview:
        "Astral Company Limited (AST) is a car manufacturer that focuses on three mainstream: automotive, electric vehicle, and batteries. Starting in 2010, the company continues to invest in its electric vehicle and batteries business segments, aiming to establish its leading position in the two areas.",
      news_type: "31e2f577-9583-4864-b22d-21869fa422a8",
      industry: "IT",
      p_e: 48.14,
      p_b: 3.88,
      p_s: 1.29,
      ev: "68.13B",
      overview2:
        "AST is a car manufacturer that develops vehicles with new technologies. Astral's business operation focuses on three mainstream: automotive, electric vehicle, and batteries. Earlier, its main products focused on traditional automotive, including ASTL 001 and ASTL 777, which gained substantial popularity and customer base. Starting in 7010, the company continues investing in electric vehicles and batteries. Electric vehicles Stellar 100 and Stellar 101 both achieved successful sales. The company is also continuously researching and developing lithium-, nickel batteries, and Superchargers for electric cars.",
    },
    dsc: {
      index: 1,
      id: "dsc",
      short_name: "D",
      name: "Doshacom Group",
      name2: "Doshacom",
      overview:
        "Doshacom is a leading provider of telecommunications, media, and technology services . The company offers wireless, wireline, satellite, and strategic data services, including Virtual Private Networks (VPN), Ethernet and broadband services. It is one of the biggest wireline and wireless providers in the US.",
      news_type: "534aaba1-a048-4c59-af4f-26ad5a951f9a",
      industry: "Communications",
      p_e: 34.98,
      p_b: 1.97,
      p_s: 2.36,
      overview2:
        "Doshacom is a leading provider of telecommunications, media, and technology services globally. The company offers wireless, wireline, satellite, and strategic data services, including Virtual Private Networks (VPN), Ethernet and broadband services. It is one of the biggest wireline and wireless providers in the US. While having the US supply the majority of the company's revenue, Doshapone also reaches the Middle East and Asia through subsidiaries and joint ventures.",
    },
    fsin: {
      index: 2,
      id: "fsin",
      short_name: "F",
      name: "FlashIn, Inc.",
      name2: "FlashIn",
      overview:
        "FlashIn, Inc. (FSIN) is a fashion company based in France that designs and produces clothes, accessories, and sneakers. By 2072, FlashIn had started more than 1,000 retail stores worldwide. The company focuses on athletic apparel and streetwear, building a solid customer base among younger generations.",
      news_type: "6d3c59be-ec9e-442b-81c9-e4498ee670d2",
      industry: "Cons. Disc.",
      p_e: 35.74,
      p_b: 11.28,
      p_s: 3.33,
      overview2:
        "FlashIn, Inc. (FSIN) is a fashion company based in France that designs and produces clothing, accessories, and sneakers across the world. Till 2072, FlashIn had started more than 1,000 retail stores worldwide. The company mainly focuses on athletic apparel and streetwear, building a solid customer base among younger generations. Its production series Flash, Inside, Light became widely popular and soon became the symbol of pop culture.",
    },
    hhw: {
      index: 3,
      id: "hhw",
      short_name: "W",
      name: "Hahawa & Co.",
      name2: "Hahawa",
      overview:
        "Hahawa & Co. (HHW) is an American chain of department stores founded in 1858 by Chinese immigrant Qing Hou. As of 2021, Hahawa was the largest U.S. department store company by retail sales with 608 physical department stores, including ten flagship stores, 178 magnet, 250 core, and 117 neighborhood stores.",
      news_type: "d7e6b3bd-d8a9-46ac-94f6-bb0f7ef94eee",
      industry: "Retail",
      p_e: 40.19,
      p_b: 3.82,
      p_s: 0.69,
      overview2:
        "Hahawa & Co. (HHW) is an American chain of department stores founded in 1858 by Chinese immigrant Qing Hou. It became a division of the Philadelphia-based Federated Department Stores in 1995. As of 2021, Hahawa was the largest U.S. department store company by retail sales, with 608 physical department stores, including 10 flagship stores, 178 magnet stores, 250 core stores, 117 neighborhood stores, and 53 other stores. The company had 125,000 employees and earned annual revenue of $23.3 billion as of Dec. 2021.",
    },
    jky: {
      index: 4,
      id: "jky",
      short_name: "J",
      name: "Jileky Investment, Inc.",
      name2: "Jileky",
      overview:
        "Jilepy Investment, Inc.(JKY) offers financial services among three major businesses: Corporate & Investment Bank, Commercial Banking, and Asset & Wealth Management. The company provides services to fulfill various client needs, including investment and lending products, deposit, cash management,…",
      news_type: "973458a0-eb3a-4e85-bd2a-f7513bf73bab",
      industry: "Financials",
      p_e: 8.14,
      p_b: 1.02,
      p_s: 2.38,
      overview2:
        "Jilepy Investment, Inc. provides financial services for clients across the world. It offers three major businesses: Corporate & Investment Bank (CIB), Commercial Banking (CB), and Asset & Wealth Management (AWM). The company provides services to fulfill various client needs, including investment and lending products, deposit, cash management, risk management solutions, mortgages, retirement products, etc.",
    },

    sgo: {
      index: 5,
      id: "sgo",
      short_name: "S",
      name: "Surgo Corporation",
      name2: "Surgo",
      overview:
        "Surgo (SGO) is a biomedical company that focuses on three segments: Medical devices, pharmaceuticals, and Consumer Health. It has established popularity through products in body lotion and facial cleansers. Recently, Surgo successfully invented AlphaTech, BetaTech, and other advanced surgical techs.",
      news_type: "5da3cc57-215d-413e-bae4-92d6b5d05e74",
      industry: "Healthcare",
      p_e: 26.63,
      p_b: 6.19,
      p_s: 4.23,
      overview2:
        "Surgo (SGO) is a US-based biomedical company focusing on three segments: Medical devices, pharmaceuticals, and Consumer Health. It is known for its leading technique in traditional and novel medical areas. Surgo is leading in the Consumer Health industry through its well-known products in body lotion and facial cleansers. In recent years, Surgo invested much of its R&D in the Medical Device and Pharmaceutical industry. Surgo successfully invented AlphaTech, BetaTech, GammaTech, and other advanced surgical technologies within five years. It is currently enlarging its biology lab to process its GeneNext project in the Pharmaceutical industry.",
    },
    wrkn: {
      index: 5,
      id: "wrkn",
      short_name: "W",
      name: "Wakron, Inc.",
      name2: "Wakron",
      overview:
        "Wakron, Inc. (WRKN) is a technology company headquartered in California, United States. The company develops products for people to connect and socialize with friends, families, and partners. Wakron’s main product WaKO, a decentralized platform for users to chat in text, video calls, and groups.",
      news_type: "d8488564-bc41-4874-a820-9ac245c07af1",
      industry: "I.T.",
      p_e: 51.29,
      p_b: 2.92,
      p_s: 4.01,
      overview2:
        "Wakron, Inc. (WRKN) is a technology company headquartered in California. The company develops products to connect and socialize with friends, families, and partners. Wakron’s main product WaKO, a decentralized platform to chat in text, video calls, and groups, gained over 80 million monthly active users in 2070. Other products under Wakron include KonNect, project and business management software, and Wakron Pay, a digital payment application. Starting in 2069, Wakron began expanding its business toward the gaming industry. Until 2072, it promoted over ten hype-game, gaining popularity among the players.",
    },
  };
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const togglePopup1 = () => {
    setIsOpen1(true);
  };

  const togglePopclose1 = () => {
    setIsOpen1(false);
  };

  const [rank, setRank] = useState(0);

  const dispatch = useDispatch();
  const WAIT_TIME = 3000;
  let price_data = useSelector((state: any) => state.price.value);

  const [isPrice, setIsPrice] = useState(false);
  useEffect(() => {
    const data = setInterval(() => {
      dispatch(requestPrice() as any);
      setIsPrice(true);
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [isPrice, dispatch]);

  useEffect(() => {
    var data = JSON.stringify(user_uid);
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
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => clearInterval(data);
  }, [user_uid]);
  const [enabled, setEnabled] = useState(false);

  const toggleStartTutorial = () => {
    setEnabled(true);
    setIsOpen1(false);
  };
  const onExit = () => {
    setEnabled(false);
  };
  const steps = [
    {
      selector: "#portfolio",
      content:
        "See account value, holding value (value of stocks held), and cash value under your portfolio.",
    },
    {
      selector: "#rank",
      content: "See your current ranking within the game.",
    },
    {
      selector: "#holding",
      content:
        "Track the stocks you currently hold (if it is empty, then you don't have any stocks yet), make a trade!",
    },
    {
      selector: "#companies",
      content: "Explore companies with various characteristics and businesses.",
    },
    {
      selector: "#leaderboard",
      content: "See all users' rankings in the game.",
    },
  ];

  const [compName, setCompName] = useState("ast");
  const handleTickerChange = (event: any) => {
    setCompName(event.target.value.toLowerCase());
  };
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <Tour steps={steps} isOpen={enabled} onRequestClose={onExit} />
      <div className={styles.container}>
        <div className={styles.center_container}>
          <div className={styles.tutorial} onClick={togglePopup1}>
            <button>Start Tutorial ⭐</button>
          </div>
          <div className={styles.inline}>
            <div style={{ marginRight: "2.75em" }}>
              <p className={styles.header}>PORTFOLIO OVERVIEW</p>
              {isOpen1 && (
                <div className={styles.pop_up_container1}>
                  <div className={styles.box1}>
                    <p className={styles.game_intro}>
                      Guide on your portfolio page
                    </p>
                    <p className={styles.game_intro_text}>
                      View the stocks you are holding, the cash value of your
                      portfolio, the real-time account value, and your ranking
                      within the game. Explore companies and trade stocks!
                    </p>
                    <div className={styles.inline}>
                      <button
                        className={styles.quit_intro}
                        onClick={togglePopclose1}
                      >
                        Quit Intro
                      </button>
                      <button
                        className={styles.start_tutorial}
                        onClick={toggleStartTutorial}
                      >
                        Start Tutorial
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={styles.value_container}
                style={{ marginBottom: "1.25em" }}
                id="portfolio"
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
                    paddingBottom: "1.9em",
                  }}
                  id="rank"
                >
                  <p className={styles.title}>CURRENT RANK</p>
                  <p className={styles.account_value}>{rank}</p>
                </div>
              </div>
              <div style={{ marginTop: "1em" }}>
                <p className={styles.header}>DATE</p>
                <div
                  className={styles.value_container}
                  style={{
                    paddingLeft: "1em",
                    paddingTop: "2em",
                    paddingBottom: "2em",
                  }}
                >
                  <p className={styles.date}>
                    {current_month}, {dd}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "1em" }}>
              <div>
                <p className={styles.header}>HOLDING DETAIL</p>
                <div className={styles.holdings_container} id="holding">
                  <ShowCompValue />
                </div>
              </div>

              <div style={{ marginTop: "0.5em" }}>
                <p className={styles.header}>PENDING ORDERS</p>
                <div className={styles.holdings_container} id="holding">
                  <PendingOrders />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "8.5em" }}>
          <div style={{ marginTop: "1.5em", marginBottom: "0em" }}>
            <div>
              <p className={styles.header1}>Trade</p>
              <div className={styles.inline}>
                <Trade
                  handleTickerChange={handleTickerChange}
                  ticker={compName}
                  setTicker={setCompName}
                />
                <AskBidTable comp_name={compName} />
                <CompanyChart comp_name={compName} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "-7.5em" }}>
          <div className={styles.center_container}>
            <div id="companies" className={styles.explore_section}>
              <ExploreSection
                companies={companies}
                isPrice={isPrice}
                price_data={price_data}
              />
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div style={{ marginTop: "1.5em", marginBottom: "7em" }}>
            <div style={{ marginLeft: "1em" }}>
              <p className={styles.header1}>GAME RANKING</p>
              <div className={styles.leaderboard} id="leaderboard">
                <LeaderBoard3 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
