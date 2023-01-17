import React from "react";
import styles from "../styles/EndSeason/EndSeason.module.css";
import { sanityClient } from "../sanity";
import { Post } from "../typings";
import Link from "next/link";
import { urlFor } from "../sanity";
import rocket from "../image/logo/rocket.png";
import message from "../image/logo/message.png";
import Image from "next/image";
import LeaderBoard1 from "../components/simulator/LeaderBoard1";
import CompInfo from "../components/front_page/CompInfo";
import EndSeasonChart from "../components/end_season/price_graph";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetStaticProps } from "next";
import Head from "next/head";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  index: [Post];
  companies: any;
  news: [Post];
  comments: any;
}

export default function SeasonalRecap({
  index,
  companies,
  news,
  comments,
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const cookies = new Cookies();
  const user_data = cookies.get("userData");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data["name"] = user_data.user_name;
    data["email"] = user_data.user_email;
    console.log(data);
    fetch("/api/createEndSeasonComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>S1 Seasonal Recap</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.center}>
          <p className={styles.season_header}>S1: METE Pandemic</p>
          <div className={styles.tags_season}>
            <div style={{ marginTop: "1.25em" }}>
              <div className={styles.inline}>
                <div className={styles.tags}>Recession</div>
                <div className={styles.tags}>Governmental Policy</div>
                <div className={styles.tags}>ESG</div>
                <div className={styles.tags}>Technical Trend</div>
                <div className={styles.tags}>Market Sentiment</div>
                <div className={styles.tags}>Company IPO</div>
              </div>
            </div>
            <div style={{ marginTop: "1em" }}>
              <div className={styles.inline}>
                <div className={styles.tags}>Insider News</div>
                <div className={styles.tags}>Supply Shortage</div>
                <div className={styles.tags}>Market Opportunity</div>
                <div className={styles.tags}>Business Strategy</div>
                <div className={styles.tags}>Financials</div>
                <div className={styles.tags}>Interest Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.center}>
        <div className={styles.inline}>
          <div style={{ marginTop: "2em" }}>
            <p className={styles.topic}>Market Situation</p>
            {index.map((post: any) => (
              <Link
                key={post._id}
                href={`/simulator_news/${post.slug.current}`}
              >
                <div className={styles.container_news}>
                  <p className={styles.section_title_comp}>{post.title}</p>
                  <img
                    className={styles.img_news}
                    src={urlFor(post.mainImage).url()!}
                    alt=""
                  />
                  <p className={styles.section_text_comp}>{post.description}</p>
                  <div style={{ marginTop: "5em" }}>
                    <div className={styles.inline}>
                      <img
                        className={styles.author_pic}
                        src={urlFor(post.author.image).url()!}
                        alt=""
                      />
                      <p className={styles.post_detail_comp}>
                        by <span>{post.author.name}</span>
                      </p>
                      <p className={styles.date_passage}>April 2nd</p>
                    </div>
                  </div>
                  <div
                    className={styles.inline}
                    style={{ marginTop: "0.75em", marginBottom: "1em" }}
                  >
                    <button
                      className={styles.like_button}
                      style={{ paddingTop: "0.25em", marginLeft: "0em" }}
                    >
                      <div className={styles.inline}>
                        <Image src={rocket} width="22px" height="22px" alt="" />
                        <p className={styles.like_num}>10</p>
                      </div>
                    </button>
                    <button
                      className={styles.message_button}
                      style={{ paddingTop: "0.25em" }}
                    >
                      <div className={styles.inline}>
                        <Image
                          src={message}
                          width="22px"
                          height="22px"
                          alt=""
                        />
                        <p className={styles.like_num}>10</p>
                      </div>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.developer}>
            <p className={styles.header_topic} style={{ marginLeft: "0.7em" }}>
              From Development Team
            </p>
            <p className={styles.letter_text} style={{ marginTop: "0.75em" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              voluptate quidem recusandae at odio, omnis cum? Architecto ullam,
              ducimus fugit in aliquid sed hic quo doloremque, porro inventore
              iusto voluptas. Quisquam beatae nihil consectetur doloribus
              eveniet itaque deleniti, cupiditate aut reprehenderit dolor
              provident similique ea tenetur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Sunt delectus quis non fugit veniam
              perferendis doloremque quibusdam quas alias quisquam esse,
              voluptatem odit. Consequuntur hic.
            </p>
            <p className={styles.letter_text} style={{ marginTop: "1em" }}>
              {" "}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat
              fugiat aut eos, voluptatibus a minima labore necessitatibus soluta
              sed ducimus iure vero voluptate. Fuga, veritatis placeat minus
              modi quis nam! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Praesentium impedit eligendi aut labore necessitatibus fuga
              tempora, possimus qui neque laboriosam aliquam accusamus
              blanditiis mollitia? Ratione hic sed obcaecati voluptatum quia!
            </p>
            <p className={styles.letter_text} style={{ marginTop: "1em" }}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repellendus autem facere, nulla perspiciatis dignissimos cum
              veniam est, culpa sunt similique odio esse nam accusamus aliquam,
              provident blanditiis enim pariatur? Nemo?
            </p>
          </div>
        </div>
      </div>

      <div className={styles.center} style={{ marginTop: "1.5em" }}>
        <p className={styles.topic}>S1 Index Trend</p>
        <EndSeasonChart />
      </div>

      <div>
        <div className={styles.center}>
          <div className={styles.inline}>
            <div className={styles.comp_info}>
              {news.map((post: any) => (
                <div key={companies}>
                  <CompInfo companies={companies} news={post} />
                </div>
              ))}
            </div>
            <div>
              <div className={styles.leaderboard} style={{ marginTop: "3em" }}>
                <p className={styles.topic}>S1 Ranking</p>
                <div style={{ marginTop: "-0.5em" }}>
                  <LeaderBoard1 />
                </div>

                <div className={styles.comment}>
                  <p className={styles.topic}>Comments and Feedback</p>
                  <div className={styles.comment_container}>
                    {comments.map((comment: any) => (
                      <div
                        className={styles.user_comment}
                        key={comment.comment}
                      >
                        <div className={styles.inline}>
                          <div className={styles.comment_profile_pic}>
                            {comment.name.charAt(0)}
                          </div>
                          <p className={styles.user_name}>{comment.name}</p>
                          <div className={styles.season_tag}>BIG SHORT</div>
                        </div>
                        <div className={styles.comment_text_section}>
                          <p
                            className={styles.comment_text}
                            style={{ marginTop: "1em" }}
                          >
                            {comment.comment}
                          </p>
                        </div>
                        <div
                          className={styles.inline}
                          style={{ marginLeft: "1em", marginTop: "1em" }}
                        >
                          <button
                            className={styles.like_button}
                            style={{ paddingTop: "0.25em" }}
                          >
                            <div className={styles.inline}>
                              <Image
                                src={rocket}
                                width="22px"
                                height="22px"
                                alt=""
                              />
                              <p className={styles.like_num}>10</p>
                            </div>
                          </button>
                          <button
                            className={styles.message_button}
                            style={{ paddingTop: "0.25em" }}
                          >
                            <div className={styles.inline}>
                              <Image
                                src={message}
                                width="22px"
                                height="22px"
                                alt=""
                              />
                              <p className={styles.like_num}>10</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                    {user_data == undefined && (
                      <div>
                        <p className={styles.login_sign}>
                          Log in to leave a comment.
                        </p>
                      </div>
                    )}
                    {submitted ? (
                      <div className={styles.success_comment}>
                        <h3 className={styles.thank_you}>
                          Thank you for submitting your comment!
                        </h3>
                        <p className={styles.approve_submit}>
                          Once it has been approved, it will appear below!
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
                      >
                        <textarea
                          className={styles.leave_comment}
                          placeholder="Leave your comment and share your opinions about S1."
                          {...register("comment", { required: true })}
                        />
                        <input
                          type="submit"
                          className={styles.submit_button}
                        ></input>
                        <div className="flex flex-col p-5">
                          {errors.comment && (
                            <span className="text-red-500">
                              - The Comment Field Is Required
                            </span>
                          )}
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export const getStaticProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
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

  const MainQuery = `*[_type == "simulator_news" && _id == "09ca1fef-4c59-45e9-927f-c98c4db39046"]{
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

  const query = `*[_type == "end_season_comment" && approved == true]{
    name,
    email,
    comment
  }`;

  console.log(query);

  const comments = await sanityClient.fetch(query);

  const result_index = await sanityClient.fetch(MainQuery);
  const index = result_index;

  //   const news_info = await sanityClient.fetch(NewsQuery);
  const news = result_index;

  return {
    props: {
      index,
      companies,
      news,
      comments,
    },
  };
};
