import dynamic from "next/dynamic";
import styles from "../../styles/simulator/company.module.css";
import ast_valuation from "../../image/snowflask_chart/ast_chart.png";
import Image from "next/image";
import AskBidTable from "../../components/company/charts/AskBidTable.js";
import WrknDayChart from "../../components/company/charts/TimelineChart";
import CompHeader from "../../components/company/charts/comp_header";
import Link from "next/link";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import Button from "../../components/UI/Button";
import MultiChart from "../../components/company/charts/multi_chart";
const Chat = dynamic(() => import("../../components/company/chat/Chat"), {
  ssr: false,
});
import MainPage from "../../components/company/stats/MainPage";
import CompanyInfo from "../../companies";
import TradeInput from "../../components/company/TradeInput";
import Head from "next/head";
const Tour = dynamic(() => import("reactour"), { ssr: false });
import { useState } from "react";

interface Props {
  individual: any;
  posts: [Post];
  company_name: any;
}

export default function Wakron({ individual, posts, company_name }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(true);
  };

  const togglePopclose = () => {
    setIsOpen(false);
  };

  const [enabled, setEnabled] = useState(false);

  const toggleStartTutorial = () => {
    setEnabled(true);
    setIsOpen(false);
  };

  const onExit = () => {
    setEnabled(false);
  };
  const steps = [
    {
      selector: "#header",
      content:
        "Learn the real-time price of company. If price is N/A, then the market is closed.",
    },
    {
      selector: "#graphs",
      content:
        "Read and analyze the graphs from 3 min (updates once every 3 minutes), hour (updates once every hour), and day (updates once every day).",
    },
    {
      selector: "#ask_bid",
      content:
        "Learn and analysis the market supply and demand through the statistics provided by the ordered books. The feature will be added during Season 2!",
    },
    {
      selector: "#trade",
      content:
        "Enter your desired price and trade stock! In the current version of the game, trade will become successful if current-price is clicked.",
    },
    {
      selector: "#snowflask",
      content:
        "Learn the strength and weakness of the company and its business through the snowflask analysis.",
    },
    {
      selector: "#timeline",
      content:
        "See the timeline of the events of the stock. This graph will also be enabled during Season 2. Currently, this graph only shows the tick-dimension stock price.",
    },
    {
      selector: "#chat",
      content:
        "Chat with other users in the game and share your opinions or investment decisions on the company or on the overall market! Chat feature is still in testing stage and will open during next season!",
    },
    {
      selector: "#stats",
      content:
        "Learn and analysis the companies financial statistics from various dimensions to help forming investment decisions!",
    },
    {
      selector: "#news",
      content:
        "Read and analyze news to make investment decisions. News are critical to making high return rates in the game!",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>{company_name.toUpperCase()} Profile</title>
      </Head>
      <Tour steps={steps} isOpen={enabled} onRequestClose={onExit} />
      <div key={individual.id}>
        <div className={styles.center} id="header">
          <CompHeader
            CompanyName={individual.id}
            CompanyShortName={individual.short_name}
            CompanyFullName={individual.name}
            togglePopup={togglePopup}
          />
          {isOpen && (
            <div className={styles.pop_up_container}>
              <div className={styles.box}>
                <p className={styles.game_intro}>
                  Guide on the company profile page
                </p>
                <p className={styles.game_intro_text}>
                  Learn and analysis information related to individual companies
                  to assist making investment decisions.
                </p>
                <div className={styles.inline}>
                  <button
                    className={styles.quit_intro}
                    onClick={togglePopclose}
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
        </div>
        <div className={styles.center_container}>
          <div className={styles.first_layer}>
            <div className={styles.price_chart} id="graphs">
              <div className={styles.price_chart_content}>
                <MultiChart id={individual.id} CompanyName={individual.id} />
              </div>
            </div>

            <div className={styles.table} id="ask_bid">
              <p className={styles.title_text}>Ask and Bid Price: Order Book</p>
              <AskBidTable comp_name={individual.id}/>
              <div>
                <button className={styles.learn_more_btn}>
                  <Link href="/post/ask-bid-order-book">
                    <a>Learn More On This</a>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div className={styles.second_layer}>
            <div id="trade">
              {" "}
              <TradeInput comp_name={company_name} />
            </div>

            <div className={styles.comp_overview} id="snowflask">
              <div className={styles.dimension_container}>
                <img
                  src={`/snowflask_chart/${individual.id}_chart.png`}
                  alt=""
                  width="270px"
                  height="250px"
                />
                <div style={{ marginLeft: "0.5em", marginBottom: "1em" }}>
                  <p className={styles.multi_dimension}>
                    Multi-Dimension Check
                  </p>
                  <p className={styles.multi_dimension_description}>
                    Analyzing stocks from multiple aspects to get a well-rounded
                    snapshot.
                  </p>
                </div>
              </div>
              <div className={styles.overview_content}>
                <p className={styles.title_text}>
                  {individual.id.toUpperCase()} Stock Overview
                </p>
                <p className={styles.comp_description}>{individual.overview}</p>
                <Link href="/company_profile">
                  <p className={styles.company_profile_link}>
                    About this company
                  </p>
                </Link>
                <div style={{ marginTop: "0.5em", marginLeft: "1.25em" }}>
                  <div style={{ marginBottom: "1em" }}>
                    <p className={styles.overview_type}>OPPORTUNITIES</p>
                    <p className={styles.overview_specific_content}>
                      <span className={styles.star}>&#9733;</span> Earnings are
                      forecast to grow 24.56% per year.
                    </p>
                    <p className={styles.overview_specific_content}>
                      <span className={styles.star}>&#9733;</span> Earnings grew
                      by 125.45% over the past year.
                    </p>
                  </div>
                  <div>
                    <p className={styles.overview_type}>RISKS</p>
                    <p className={styles.overview_specific_content}>
                      <span className={styles.warning_symbol}>&#9888;</span>{" "}
                      Significant insider selling over the past 3 month.
                    </p>
                    <p className={styles.overview_specific_content}>
                      <span className={styles.warning_symbol}>&#9888;</span>{" "}
                      Shareholders have been diluted in the past year.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div className={styles.day_chart} id="timeline">
            <p className={styles.title_text}>
              Company Activity Timeline - Will Be Refined Next Season!
            </p>
            <WrknDayChart CompanyName={individual.id} />
          </div>
        </div>

        <div className={styles.center_container}>
          <div className={styles.fourth_layer}>
            <div className={styles.chat_box} id="chat">
              <Chat />
            </div>

            <div className={styles.stats_container} id="stats">
              <p className={styles.title_text}>Company Statistics</p>
              <MainPage company_name={company_name} />
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div className={styles.news} id="news">
            <p className={styles.title_text}>Important Events</p>
            {posts.map((post) =>
              post.categories != null &&
              post.categories._ref == `${individual.news_type}` ? (
                <Link
                  key={post._id}
                  href={`/simulator_news/${post.slug.current}`}
                >
                  <div className={styles.news_container}>
                    <div className={styles.vertical_line} />
                    <div style={{ marginTop: "-32em" }}>
                      <div className={styles.top_container_inline}>
                        <img
                          className={styles.author_pic}
                          src={urlFor(post.author.image).url()!}
                          alt=""
                        />
                        <p className={styles.news_title}>{post.title}</p>
                      </div>
                      <p className={styles.news_author}>
                        {post.author.name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {new Date(post._createdAt).toLocaleString()}
                      </p>

                      <p className={styles.news_decription}>
                        {post.description}
                      </p>
                      <div style={{ marginLeft: "8em", marginTop: "1em" }}>
                        <div className={styles.top_container_inline}>
                          <p>⚡️</p>
                          <p className={styles.key_news_lst}>{post.key1}</p>
                        </div>
                        <div className={styles.top_container_inline}>
                          <p>⚡️</p>
                          <p className={styles.key_news_lst}>{post.key2}</p>
                        </div>
                        <div className={styles.top_container_inline}>
                          <p>⚡️</p>
                          <p className={styles.key_news_lst}>{post.key3}</p>
                        </div>
                      </div>
                    </div>

                    <img
                      className={styles.img_comp}
                      src={urlFor(post.mainImage).url()!}
                      alt=""
                    />
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </div>

      <div style={{ height: "8em" }} />
    </div>
  );
}

export function getStaticPaths() {
  const companies = CompanyInfo;

  return {
    paths: companies.map((company) => {
      const slug = company.id;
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const companies: any = {
    ast: {
      index: 0,
      id: "ast",
      short_name: "A",
      name: "Astral Company Limited",
      overview:
        "Astral Company Limited (AST) is a car manufacturer that focuses on three mainstream: automotive, electric vehicle, and batteries. Starting in 2010, the company continues to invest in its electric vehicle and batteries business segments, aiming to establish its leading position in the two areas.",
      news_type: "31e2f577-9583-4864-b22d-21869fa422a8",
      industry: "IT",
    },
    dsc: {
      index: 1,
      id: "dsc",
      short_name: "D",
      name: "Doshacom Group",
      overview:
        "Doshacom is a leading provider of telecommunications, media, and technology services . The company offers wireless, wireline, satellite, and strategic data services, including Virtual Private Networks (VPN), Ethernet and broadband services. It is one of the biggest wireline and wireless providers in the US.",
      news_type: "534aaba1-a048-4c59-af4f-26ad5a951f9a",
      industry: "Communications",
    },
    fsin: {
      index: 2,
      id: "fsin",
      short_name: "F",
      name: "FlashIn, Inc.",
      overview:
        "FlashIn, Inc. (FSIN) is a fashion company based in France that designs and produces clothes, accessories, and sneakers. By 2072, FlashIn had started more than 1,000 retail stores worldwide. The company focuses on athletic apparel and streetwear, building a solid customer base among younger generations.",
      news_type: "6d3c59be-ec9e-442b-81c9-e4498ee670d2",
      industry: "Cons. Disc.",
    },
    hhw: {
      index: 3,
      id: "hhw",
      short_name: "W",
      name: "Hahawa & Co.",
      overview:
        "Hahawa & Co. (HHW) is an American chain of department stores founded in 1858 by Chinese immigrant Qing Hou. As of 2021, Hahawa was the largest U.S. department store company by retail sales with 608 physical department stores, including ten flagship stores, 178 magnet, 250 core, and 117 neighborhood stores.",
      news_type: "d7e6b3bd-d8a9-46ac-94f6-bb0f7ef94eee",
      industry: "Retail",
    },
    jky: {
      index: 4,
      id: "jky",
      short_name: "J",
      name: "Jileky Investment, Inc.",
      overview:
        "Jilepy Investment, Inc.(JKY) offers financial services among three major businesses: Corporate & Investment Bank, Commercial Banking, and Asset & Wealth Management. The company provides services to fulfill various client needs, including investment and lending products, deposit, cash management,…",
      news_type: "973458a0-eb3a-4e85-bd2a-f7513bf73bab",
      industry: "Financials",
    },

    sgo: {
      index: 5,
      id: "sgo",
      short_name: "S",
      name: "Surgo Corporation",
      overview:
        "Surgo (SGO) is a biomedical company that focuses on three segments: Medical devices, pharmaceuticals, and Consumer Health. It has established popularity through products in body lotion and facial cleansers. Recently, Surgo successfully invented AlphaTech, BetaTech, and other advanced surgical techs.",
      news_type: "5da3cc57-215d-413e-bae4-92d6b5d05e74",
      industry: "Healthcare",
    },
    wrkn: {
      index: 5,
      id: "wrkn",
      short_name: "W",
      name: "Wakron, Inc.",
      overview:
        "Wakron, Inc. (WRKN) is a technology company headquartered in California, United States. The company develops products for people to connect and socialize with friends, families, and partners. Wakron’s main product WaKO, a decentralized platform for users to chat in text, video calls, and groups.",
      news_type: "d8488564-bc41-4874-a820-9ac245c07af1",
      industry: "I.T.",
    },
  };

  const company_name = params.slug;
  const individual_comp = companies[company_name];

  const query = `*[_type == "simulator_news"]{
    _id,
    title,
  
    author -> {
      name,
      image
  },
    description,
    mainImage,
    slug,
    categories[1],
    key1,
    key2,
    key3,
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      individual: individual_comp,
      posts,
      company_name,
    },
  };
}
