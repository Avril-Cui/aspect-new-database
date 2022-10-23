import dynamic from "next/dynamic";
import styles from "../../styles/simulator/company.module.css";
import stock_valuation from "../../image/snowflask_chart/demo_chart.png";
import Image from "next/image";
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
import companyProfiles from "../../companyProfile";

interface Props {
  individual: any;
  posts: [Post];
}

export default function Wakron({ individual, posts }: Props) {
  return (
    <div className={styles.container}>
      <div key={individual.id}>
        <CompHeader
          CompanyName={individual.id}
          CompanyShortName={individual.short_name}
          CompanyFullName={individual.name}
        />
        <div className={styles.center_container}>
          <div className={styles.first_layer}>
            <div className={styles.price_chart}>
              <div className={styles.price_chart_content}>
                <MultiChart id={individual.id} />
              </div>
            </div>

            <div className={styles.table}>
              <p className={styles.title_text}>Ask and Bid Price</p>
              <div className={styles.table_content}>
                <table className={styles.ask_bid_table}>
                  <tbody>
                    <tr>
                      <th>Ask/Bid</th>
                      <th>Price</th>
                      <th>Number</th>
                    </tr>
                    <tr>
                      <td>S#5</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>S#4</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>S#3</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>S#2</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>S#1</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>B#1</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>B#2</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>B#3</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>B#4</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td>B#5</td>
                      <td>100.00</td>
                      <td>1000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.learn_more_btn}>
                <Button>
                  <p className={styles.learn_more}>Learn More On This</p>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div className={styles.second_layer}>
            <div className={styles.trade_container}>
              <p className={styles.title_text}>Trade Stock</p>
              <div className={styles.trade_stock_content}>
                <div>
                  <div className={styles.trade_type}>Buy</div>
                  <div className={styles.trade_input}>
                    <p className={styles.trade_text}>Share</p>
                    <div
                      className={styles.trade_place}
                      style={{ marginLeft: 70 }}
                    />
                  </div>
                  <div className={styles.trade_input}>
                    <p className={styles.trade_text}>Price</p>
                    <div
                      className={styles.trade_place}
                      style={{ marginLeft: 75 }}
                    />
                  </div>
                </div>

                <div>
                  <div className={styles.trade_type}>SELL</div>
                  <div className={styles.trade_input}>
                    <p className={styles.trade_text}>Share</p>
                    <div
                      className={styles.trade_place}
                      style={{ marginLeft: 70 }}
                    />
                  </div>
                  <div className={styles.trade_input}>
                    <p className={styles.trade_text}>Price</p>
                    <div
                      className={styles.trade_place}
                      style={{ marginLeft: 75 }}
                    />
                  </div>
                </div>

                <button className={styles.trade_stock_button}>
                  <p>Enter Trade</p>
                </button>
              </div>
            </div>

            <div className={styles.comp_overview}>
              <div className={styles.dimension_container}>
                <Image src={stock_valuation} width="270px" height="250px" />
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
                <p className={styles.title_text}>WRKN Stock Overview</p>
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
          <div className={styles.day_chart}>
            <p className={styles.title_text}>Company Activity Timeline</p>
            <WrknDayChart CompanyName={individual.id} />
          </div>
        </div>

        <div className={styles.center_container}>
          <div className={styles.fourth_layer}>
            <div className={styles.chat_box}>
              <Chat />
            </div>

            <div className={styles.stats_container}>
              <p className={styles.title_text}>Company Statistics</p>
              <MainPage />
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div className={styles.news}>
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
  const companies = companyProfiles;

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
    wrkn: {
      id: "wrkn",
      short_name: "W",
      name: "Wakron, Inc. (WRKN)",
      overview:
        "Wakron, Inc. (WRKN) is a technology company headquartered in California, United States. The company develops products for people to connect and socialize with friends, families, and partners. Wakron’s main product WaKO, a decentralized platform for users to chat in text, video calls, and groups.",
      day_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/wrkn/day.json",
      // inner_day_source: wrkn_inner,
      second_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/wrkn/second.json",
      tick_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/wrkn/tick.json",
      news_type: "d8488564-bc41-4874-a820-9ac245c07af1",
    },
    hhw: {
      id: "hhw",
      short_name: "H",
      name: "Hahawa & Co. (HHW)",
      overview:
        "Hahawa & Co. (HHW) is an American chain of department stores founded in 1858 by Chinese immigrant Qing Hou. It became a division of the Philadelphia-based Federated Department Stores in 1995. As of 2021, Hahawa was the largest U.S. department store company by retail sales with 608 physical department stores, including ten flagship stores, 178 magnet stores, 250 core stores, 117 neighborhood stores, and 53 other stores. The company had 125,000 employees and earned annual revenue of $23.3 billion as of Dec. 2021.",
      day_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/hhw/day.json",
      // inner_day_source: hhw_inner,
      second_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/hhw/second.json",
      tick_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/hhw/tick.json",
      news_type: "d7e6b3bd-d8a9-46ac-94f6-bb0f7ef94eee",
    },
    sgo: {
      id: "sgo",
      short_name: "S",
      name: "Surgo Corporation (SGO)",
      overview:
        "Surgo (SGO) is a US-based biomedical company that focuses on three segments: Medical devices, pharmaceuticals, and Consumer Health. It is known for its leading technique in both traditional and novel medical areas. Specifically, Surgo has established its popularity among customers in the Consumer Health industry through its well-known products in body lotion and facial cleansers. In recent years, Surgo invested much of its R&D in the Medical Device and Pharmaceutical industry. Surgo successfully invented AlphaTech, BetaTech, GammaTech, and other advanced surgical technologies within five years. It is currently enlarging its biology lab to process its GeneNext project in the Pharmaceutical industry.",
      day_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/sgo/day.json",
      // inner_day_source: sgo_inner,
      second_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/sgo/second.json",
      tick_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/sgo/tick.json",
      news_type: "5da3cc57-215d-413e-bae4-92d6b5d05e74",
    },
    fsin: {
      id: "fsin",
      short_name: "F",
      name: "FlashIn, Inc. (FSIN)",
      overview:
        "FlashIn, Inc. (FSIN) is a fashion company based in France that designs and produces clothes, accessories, and sneakers across the world. By 2072, FlashIn had started more than 1,000 retail stores worldwide. The company mainly focuses on athletic apparel and streetwear, building a solid customer base among younger generations. Its production series Flash, Inside, and Light are now widely popular and soon became the symbol of pop culture.",
      day_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/fsin/day.json",
      // inner_day_source: fsin_inner,
      second_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/fsin/second.json",
      tick_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/fsin/tick.json",
      news_type: "6d3c59be-ec9e-442b-81c9-e4498ee670d2",
    },
    jky: {
      id: "jky",
      short_name: "J",
      name: "Jileky Investment, Inc. (JKY)",
      overview:
        "Jilepy Investment, Inc. provides financial services for clients across the world. It offers three major businesses: Corporate & Investment Bank (CIB), Commercial Banking (CB), and Asset & Wealth Management (AWM). The company provides services to fulfill various client needs, including investment and lending products, deposit, cash management, risk management solutions, mortgages, retirement products, etc.",
      day_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/jky/day.json",
      // inner_day_source: jky_inner,
      second_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_infojkyn/second.json",
      tick_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/jky/tick.json",
      news_type: "973458a0-eb3a-4e85-bd2a-f7513bf73bab",
    },
    ast: {
      id: "ast",
      short_name: "A",
      name: "Astral Company Limited (AST)",
      overview:
        "Astral Company Limited (AST) is a car manufacturer that designs and develops vehicles with new technologies. Astral is headquartered in Shanghai and has various business locations worldwide. Astral’s business operation focuses on three mainstream: automotive, electric vehicle, and batteries. Starting in 2010, the company continues to invest in its electric vehicle and batteries business segments, aiming to establish its leading position in the two areas. Electric vehicles Stellar 100 and Stellar 101 both achieved successful sales. The company is also continuously researching and developing lithium- and nickel batteries and Superchargers for electric cars.",
      day_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/ast/day.json",
      // inner_day_source: ast_inner,
      second_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/ast/second.json",
      tick_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/ast/tick.json",
      news_type: "31e2f577-9583-4864-b22d-21869fa422a8",
    },
    dsc: {
      id: "dsc",
      short_name: "D",
      name: "Doshacom Group (DSC)",
      overview:
        "Doshacom is a leading provider of telecommunications, media, and technology services globally. The company offers wireless, wireline, satellite, and strategic data services, including Virtual Private Networks (VPN), Ethernet and broadband services. It is one of the biggest wireline and wireless providers in the US. While having the US supplying the majority of the company's revenue, Doshacom also reaches the Middle East and Asia through subsidiaries and joint ventures.",
      day_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/dsc/day.json",
      // inner_day_source: dsc_inner,
      second_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/dsc/second.json",
      tick_source:
        "/Users/xiaokeai/Desktop/aspect_website/price_info/dsc/tick.json",
      news_type: "534aaba1-a048-4c59-af4f-26ad5a951f9a",
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
    },
  };
}
