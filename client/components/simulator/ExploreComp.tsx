import React from "react";
import styles from "./ExploreComp.module.css";
import dynamic from "next/dynamic";

const OverviewMiniChart = dynamic(() => import("./OverviewChart"), {
  ssr: false,
});

function ExploreComp() {
  return (
    <div className={styles.container}>
      <p className={styles.header}>Explore Interesting Companies</p>
      <div
        className={styles.inline}
        style={{ marginTop: "0.75em", marginBottom: "2em" }}
      >
        <div style={{ marginLeft: "1.5em", marginTop: "0.75em" }}>
          <div className={styles.inline}>
            <div className={styles.logo_container}>
              <p className={styles.logo}>W</p>
            </div>
            <div>
              <p className={styles.comp_name}>Wakron, INC.</p>
              <div className={styles.inline}>
                <p className={styles.comp_full_name}>WRKN</p>
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
                685.23 <span>ASD</span>
              </p>
              <p className={styles.price_change}>+12.83 (+1.86%)</p>
            </div>
          </div>

          <table className={styles.stats_table}>
            <tbody>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Earning (P/E)
                </td>
                <td className={styles.stats_table_right}>1.523</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>Price to Book (P/B)</td>
                <td className={styles.stats_table_right}>5.125</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Sales (P/S)
                </td>
                <td className={styles.stats_table_right}>1.277</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>Enterprise Value</td>
                <td className={styles.stats_table_right}>177.67 B</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className={styles.overview}>Company Overview</p>
          <div className={styles.overview_text}>
            Wakron, Inc. (WRKN) is a technology company headquartered in
            California, United States. The company develops products for people
            to connect and socialize with friends, families, and partners.
            Wakron’s main product WaKO, a decentralized platform for users to
            chat in text, video calls, and groups. Overall, Wakron is a very
            interesting company that worth your exploration. Hope you enjoy
            trading this company. Hope you enjoy trading this company. Hope you
            enjoy trading this company. Hope you enjoy trading this company.
          </div>
        </div>
        <div style={{ marginLeft: "2em" }}>
          <OverviewMiniChart />
        </div>
      </div>

      <div className={styles.split} />

      <div className={styles.inline} style={{ marginBottom: "2em" }}>
        <div style={{ marginLeft: "1.5em", marginTop: "0.75em" }}>
          <div className={styles.inline}>
            <div className={styles.logo_container}>
              <p className={styles.logo}>S</p>
            </div>
            <div>
              <p className={styles.comp_name}>Surgo Corporation</p>
              <div className={styles.inline}>
                <p className={styles.comp_full_name}>SGO</p>
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
                685.23 <span>ASD</span>
              </p>
              <p className={styles.price_change}>+16.72 (+3.64%)</p>
            </div>
          </div>

          <table className={styles.stats_table}>
            <tbody>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Earning (P/E)
                </td>
                <td className={styles.stats_table_right}>1.523</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>Price to Book (P/B)</td>
                <td className={styles.stats_table_right}>5.125</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Sales (P/S)
                </td>
                <td className={styles.stats_table_right}>1.277</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>Enterprise Value</td>
                <td className={styles.stats_table_right}>177.67 B</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className={styles.overview}>Company Overview</p>
          <div className={styles.overview_text}>
            Surgo (SGO) is a US-based biomedical company that focuses on three
            segments: Medical devices, pharmaceuticals, and Consumer Health. It
            is known for its leading technique in both traditional and novel
            medical areas. Specifically, Surgo has established its popularity
            among customers in the Consumer Health industry through its
            well-known products in body lotion and facial cleansers. In recent
            years, Surgo invested much of its R&D in the Medical Device and
            Pharmaceutical industry. Surgo successfully
          </div>
        </div>
        <div style={{ marginLeft: "2em" }}>
          <OverviewMiniChart />
        </div>
      </div>

      <div className={styles.split} />

      <div className={styles.inline} style={{ marginBottom: "2em" }}>
        <div style={{ marginLeft: "1.5em", marginTop: "0.75em" }}>
          <div className={styles.inline}>
            <div className={styles.logo_container}>
              <p className={styles.logo}>A</p>
            </div>
            <div>
              <p className={styles.comp_name}>Astral Limited</p>
              <div className={styles.inline}>
                <p className={styles.comp_full_name}>AST</p>
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
                685.23 <span>ASD</span>
              </p>
              <p className={styles.price_change}>+3.25 (+0.23%)</p>
            </div>
          </div>

          <table className={styles.stats_table}>
            <tbody>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Earning (P/E)
                </td>
                <td className={styles.stats_table_right}>1.523</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>Price to Book (P/B)</td>
                <td className={styles.stats_table_right}>5.125</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>
                  Price to Sales (P/S)
                </td>
                <td className={styles.stats_table_right}>1.277</td>
              </tr>
              <tr>
                <td className={styles.stats_table_left}>Enterprise Value</td>
                <td className={styles.stats_table_right}>177.67 B</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className={styles.overview}>Company Overview</p>
          <div className={styles.overview_text}>
            Astral Company Limited (AST) is a car manufacturer that designs and
            develops vehicles with new technologies. Astral is headquartered in
            Shanghai and has various business locations worldwide. Astral’s
            business operation focuses on three mainstream: automotive, electric
            vehicle, and batteries. Starting in 2010, the company continues to
            invest in its electric vehicle and batteries business segments,
            aiming to establish its leading position in the two areas.
          </div>
        </div>
        <div style={{ marginLeft: "2em" }}>
          <OverviewMiniChart />
        </div>
      </div>
    </div>
  );
}

export default ExploreComp;
