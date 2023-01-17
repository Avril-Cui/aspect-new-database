import React from "react";
import styles from "./ExploreComp1.module.css";
import Link from "next/link";
import { urlFor } from "../../sanity";
// import rocket from "../../image/logo/rocket.png";
// import message from "../../image/logo/message.png";
// import Image from "next/image";

function ExploreComp1(props: any) {
  const post = props.news
  return (
    <div className={styles.container}>
      <div
        className={styles.inline}
        style={{ marginTop: "0.75em", marginBottom: "2em" }}
      >
        <div style={{ marginLeft: "1.5em", marginTop: "0.75em" }}>
          <div className={styles.inline}>
            <div
              className={styles.logo_container}
              style={{ background: props.background }}
            >
              <p className={styles.logo}>{props.company.name2.charAt(0)}</p>
            </div>
            <div>
              <p className={styles.comp_name}>{props.company.name2}</p>
              <div className={styles.inline}>
                <p className={styles.comp_full_name}>
                  {props.company.id.toUpperCase()}
                </p>
                <p
                  className={styles.comp_full_name}
                  style={{ marginLeft: "2.25em" }}
                >
                  ASPDX
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.inline}>
              <p className={styles.price}>
                {props.price} <span>ASD</span>
              </p>
              <p className={styles.price_change} style={{ color: props.color }}>
                {props.change} ({props.pct_change}%)
              </p>
            </div>
          </div>

          <table className={styles.stats_table}>
            <tbody>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Earning (P/E)
                </td>
                <td className={styles.stats_table_right}>
                  {props.company.p_e}
                </td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>Price to Book (P/B)</td>
                <td className={styles.stats_table_right}>
                  {props.company.p_b}
                </td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Sales (P/S)
                </td>
                <td className={styles.stats_table_right}>
                  {props.company.p_s}
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <Link key={post._id} href={`/simulator_news/${post.slug.current}`}>
          <div className={styles.container_news}>
            <p className={styles.section_title_comp}>{post.title}</p>
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
              </div>
            </div>
          </div>
        </Link>
        
      </div>
    </div>
  );
}

export default ExploreComp1;
