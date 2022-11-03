import styles from "../styles/simulator/simulator.module.css";
import Link from "next/link";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import Image from "next/image";
import comment from "../image/comment.png";
import share from "../image/share.png";
import star from "../image/star.png";
import StockScreener from "../components/simulator/StockScreener";
import SimulatorHeader from "../components/simulator/SimulatorHeader";
import ShowMini from "../components/simulator/company_mini/ShowMini";
import LeaderBoard from "../components/simulator/LeaderBoard";
import ExploreComp from "../components/simulator/ExploreComp";

interface Props {
  index: [Post];
  individual: [Post];
}

export default function Simulator({ index, individual }: Props) {
  return (
    <div>
      <div className={styles.container} style={{ marginTop: 150 }}>
        <SimulatorHeader />
      </div>

      <div className={styles.mini_chart}>
        <ShowMini />
      </div>

      <div className={styles.news_section}>
        <div
          className={styles.scroll}
          style={{ marginLeft: "1.25em", marginTop: "0.75em" }}
        >
          <div className={styles.inline}>
            <div>
              <p className={styles.header}>News</p>
              <div>
                <div className={styles.term_sections_cont}>
                  <div className={styles.article_container}>
                    {index.map((post) =>
                      post.categories._ref ==
                      "c00e1f5a-f49b-4969-b23f-5e750c7fa22d" ? (
                        <Link
                          key={post._id}
                          href={`/simulator_news/${post.slug.current}`}
                        >
                          <div
                            style={{ marginBottom: "2em", marginLeft: "0.5em" }}
                          >
                            <div className={styles.text_cont}>
                              <p className={styles.section_title}>
                                {post.title}
                              </p>
                              <div style={{ marginTop: 55 }}>
                                <div className={styles.post_author}>
                                  <p className={styles.post_detail}>
                                    Author: <span>{post.author.name}</span>
                                    <p className={styles.post_detail}>
                                      Published at{" "}
                                      {new Date(
                                        post._createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </p>
                                </div>
                                <img
                                  className={styles.author_pic}
                                  src={urlFor(post.author.image).url()!}
                                  alt=""
                                />
                              </div>
                              <p className={styles.section_text}>
                                {post.description}
                              </p>
                            </div>

                            <div
                              className={styles.inline}
                              style={{ marginTop: "1.25em" }}
                            >
                              <button className={styles.top_pick}>
                                <p>Editor's Picks</p>
                              </button>
                              <div>
                                <button style={{ marginLeft: "14.5em" }}>
                                  <Image
                                    src={comment}
                                    width="30px"
                                    height="30px"
                                  />
                                </button>

                                <button
                                  className={styles.comment_icon}
                                  style={{ marginLeft: "2.5em" }}
                                >
                                  <Image
                                    src={share}
                                    width="30px"
                                    height="30px"
                                  />
                                </button>

                                <button
                                  className={styles.comment_icon}
                                  style={{ marginLeft: "2.5em" }}
                                >
                                  <Image
                                    src={star}
                                    width="30px"
                                    height="30px"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.inline}>
                <p className={styles.header} style={{ marginLeft: "2em" }}>
                  Discover Company News
                </p>
                <button className={styles.more_button}>
                  <p className={styles.more_news}>More News</p>
                </button>
              </div>

              {individual.map((post) =>
                post.categories._ref ==
                "c523a11c-4a72-4328-a43a-d3b94dd60a8b" ? (
                  <Link
                    key={post._id}
                    href={`/simulator_news/${post.slug.current}`}
                  >
                    <div
                      className={styles.comp_news_container}
                      style={{ marginBottom: "2em" }}
                    >
                      <p className={styles.section_title_comp}>{post.title}</p>
                      <div className={styles.inline}>
                        <img
                          className={styles.img_comp}
                          src={urlFor(post.mainImage).url()!}
                          alt=""
                        />
                        <div className={styles.post_author_comp}>
                          <p className={styles.post_detail_comp}>
                            Author: <span>{post.author.name}</span>
                          </p>
                          <p className={styles.section_text_comp}>
                            {post.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className={styles.inline}
                        style={{ marginTop: "1.25em" }}
                      >
                        <button className={styles.news_company}>
                          <p>Fuqi Times</p>
                        </button>
                        <div className={styles.inline}>
                          <p className={styles.time}>12:00</p>
                          <p className={styles.date}>April 2nd</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "1.1em" }}>
        <StockScreener />
      </div>

      <div className={styles.fourth_layer}>
        <div className={styles.inline}>
          <div className={styles.stocks_intro}>
            <p className={styles.header} style={{ paddingLeft: ".75em", marginBottom: "0.5em"}}>
              How to Invest Money
            </p>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b176"}}>1</div>
              <p className={styles.intro_header}>
                What to Invest In
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b176de"}}>2</div>
              <p className={styles.intro_header}>
                How to Invest In Stocks
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b176b6"}}>3</div>
              <p className={styles.intro_header}>
                How to Invest in Index Funds
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b1768e"}}>4</div>
              <p className={styles.intro_header}>
                How to Invest in ETFs
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b17678"}}>5</div>
              <p className={styles.intro_header}>
                Stock Market 101
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b17646"}}>6</div>
              <p className={styles.intro_header}>
                Stock Market Sectors
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b17646"}}>7</div>
              <p className={styles.intro_header}>
                Stock Market Sections
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b17646"}}>8</div>
              <p className={styles.intro_header}>
                What is Mutual Fund
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b17625"}}>9</div>
              <p className={styles.intro_header}>
                What is Hedge Fund
              </p>
            </div>
            <div className={styles.inline1}>
              <div className={styles.circle} style={{backgroundColor: "#72b17626"}}>10</div>
              <p className={styles.intro_header}>
                What are Financial Derivatives
              </p>
            </div>
          </div>
          <LeaderBoard />
        </div>
      </div>

      <div >
        <ExploreComp />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const MainQuery = `*[_type == "index_news"]{
    _id,
    title,
  
    author -> {
      name,
      image
  },
    description,
    mainImage,
    slug,
    categories[0]
  }`;

  const IndividualQuery = `*[_type == "simulator_news"]{
    _id,
    title,
  
    author -> {
      name,
      image
  },
    description,
    mainImage,
    slug,
    categories[0]
  }`;

  const result_index = await sanityClient.fetch(MainQuery);
  const result_individual = await sanityClient.fetch(IndividualQuery);

  const index = result_index.slice(0, 1);
  const individual = result_individual.slice(0, 1);

  return {
    props: {
      index,
      individual,
    },
  };
};
