import styles from "../../styles/product/product.module.css";
import chart from "../../public/chart.png";
import Image from "next/image";
import dict from "../../image/screenshot/dict.png";
import news from "../../public/news.jpg";

function Timeline() {
  return (
    <div>
      <div className={styles.timeline}>
        <div>
          <div className={styles.vl} style={{ height: "10em" }}></div>
          <div className={styles.circle} />
          <div className={styles.vl} style={{ height: "70em" }}></div>
          <div className={styles.circle} />
          <div className={styles.vl} style={{ height: "21em" }}></div>
          <div className={styles.circle} />
          <div className={styles.vl} style={{ height: "27em" }}></div>
          <div className={styles.circle} />
          <div className={styles.vl} style={{ height: "48em" }}></div>
          <div className={styles.circle} />
          <div className={styles.vl} style={{ height: "50em" }}></div>
        </div>
        <div className={styles.items}>
          <div style={{ marginTop: "10em" }}>
            <h2 className={styles.sub_subheader}>
              Comprehensive Data Visualization
            </h2>
            <p className={styles.sub_subintro}>
              Read and work with various financial charts to understand strength
              and risk of each companies.
            </p>
            <ul className={styles.chart_list}>
              <li>🚀 Histogram and Line Graph</li>
              <li>🚀 Pie Charts</li>
              <li>🚀 Waterfall Charts</li>
              <li>🚀 Tree Charts</li>
              <li>🚀 Scatter plots</li>
            </ul>
          </div>
          <div style={{ marginTop: "55em" }}>
            <h2 className={styles.sub_subheader}>
              Competitive Gaming Environment
            </h2>
            <p className={styles.sub_subintro}>
              Updating ranking feature to see the top winners in the current
              game and compete.
            </p>
            <ul className={styles.chart_list}>
              <li>🚀 Interactive user environment.</li>
              <li>🚀 Challenging rules.</li>
              <li>🚀 Chat features for discussions.</li>
              <li>🚀 Communicate and learn.</li>
              <li>🚀 Award for top winners.</li>
            </ul>
          </div>
          <div style={{ marginTop: "7em" }}>
            <h2 className={styles.sub_subheader}>
              Fundamental Model and Analysis
            </h2>
            <p className={styles.sub_subintro}>
              Work with web-embedded fundamental spreadsheets and templates to
              analyze stocks and form investment decisions. The templates
              provides users a practical opportunity to apply knowledge they
              learned. Models provided include:
            </p>
            <div className={styles.inline} style={{ marginTop: "3em" }}>
              <div className={styles.square_container}>Financial Statement</div>
              <div className={styles.square_container}>WACC Calculation</div>
              <div className={styles.square_container}>
                Sensitivity Analysis
              </div>
              <div className={styles.square_container1}>DCF Model</div>
            </div>
          </div>
          <div style={{ marginTop: "8em" }}>
            <h2 className={styles.sub_subheader}>
              Collect Market Clue: Stylistic News
            </h2>
            <p className={styles.sub_subintro}>
              Capture important market information from different news sources.
              In Aspect market, all information matters! This process is
              essential to experienced investors.
            </p>
          </div>
          <div style={{ marginTop: "42em" }}>
            <h2 className={styles.sub_subheader}>
              Financial Terms at Your Fingertips
            </h2>
            <p className={styles.sub_subintro}>
              While playing, learn financial terms and concepts to get a clearer
              insight of the financial world. Search financial terms using
              Aspect dictionary.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.tl_img} style={{marginTop: "-204.75em"}}>
        <Image src={chart} width={1200} height={645} />
      </div>
      <div className={styles.tl_img} style={{marginTop: "-89.5em"}}>
        <Image src={news} width={1200} height={416} />
      </div>
      <div className={styles.tl_img} style={{ marginTop: "-40em" }}>
        <Image src={dict} width={1200} height={645} />
      </div>
    </div>
  );
}

export default Timeline;