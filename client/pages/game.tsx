import styles from "../styles/product/product.module.css";
import Head from "next/head";
import Image from "next/image";
import company from "../image/logo/company.png";
import terms from "../image/logo/terms.png";
import model from "../image/logo/model.png";
import main from "../image/screenshot/main.png";
import dict from "../image/screenshot/dict.png";
import spreadsheet from "../image/screenshot/spreadsheet.png";
import chart from "../image/screenshot/chart.png";
import leaderboard from "../image/screenshot/leaderboard.png";
import trade from "../image/screenshot/trade.png";
import news from "../image/screenshot/news.png";
import chat from "../image/screenshot/chat.png";

const Product = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product Introduction</title>
      </Head>
      <div className={styles.layer_one}>
        <h1 className={styles.header}>Dynamic Market Trading Game</h1>
        <p className={styles.intro}>
          Learn trading and finance by experiencing a virtual, dynamic stock
          market with various events.
        </p>
      </div>
      <div className={styles.layer_two}>
        <div className={styles.inline} style={{ marginLeft: "1.5em" }}>
          <div className={styles.inline_cell}>
            <div className={styles.logo}>
              <Image src={company} width="50px" height="50px" />
            </div>
            <p className={styles.inline_header}>Explore Companies</p>
            <p className={styles.inline_text}>
              Analysis interesting companies with unqiue traits.
            </p>
          </div>

          <div className={styles.inline_cell}>
            <div className={styles.logo}>
              <Image src={terms} width="50px" height="50px" />
            </div>
            <p className={styles.inline_header}>Learn Terminologies</p>
            <p className={styles.inline_text}>
              Understand important financial terms and useful models.
            </p>
          </div>

          <div className={styles.inline_cell}>
            <div className={styles.logo}>
              <Image src={model} width="50px" height="50px" />
            </div>
            <p className={styles.inline_header}>Implement Models</p>
            <p className={styles.inline_text}>
              Guides to implement models to assist investment decisions.
            </p>
          </div>

          <div className={styles.inline_cell}>
            <div className={styles.logo}>
              <Image src={company} width="50px" height="50px" />
            </div>
            <p className={styles.inline_header}>Compete With Friends</p>
            <p className={styles.inline_text}>
              Join game and compete & discuss with other users.
            </p>
          </div>
        </div>
        <div className={styles.display_game}>
          <div className={styles.screenshot_main}>
            <Image src={main} width="1200px" height="630px" />
          </div>
        </div>
      </div>

      <div className={styles.layer_five}>
        <div className={styles.inline}>
          <div className={styles.charts} style={{ marginRight: "2em" }}>
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
            <div style={{ marginTop: "2em" }}>
              <Image src={chart} width="550" height="360" />
            </div>
          </div>
          <div className={styles.charts}>
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
            <div style={{ marginTop: "2.75em" }}>
              <Image src={leaderboard} width="550" height="350" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.layer_four}>
        <div className={styles.inline}>
          <div>
            <h2 className={styles.sub_subheader}>
              Fundamental Model and Analysis
            </h2>
            <p className={styles.sub_subintro}>
              Work with web-embedded fundamental spreadsheets and templates to
              analyze stocks and form investment decisions. The templates
              provides users a practical opportunity to apply knowledge they
              learned. Models provided include:
            </p>
            <div style={{ marginTop: "1.5em" }}>
              <div
                className={styles.model_name}
                style={{ background: "#C9FFD1", color: "#577A60" }}
              >
                WACC Calculation
              </div>
              <div
                className={styles.model_name}
                style={{ background: "#6ee780", color: "#415f49" }}
              >
                Sensitivity Analysis
              </div>
              <div
                className={styles.model_name}
                style={{ background: "#56b664", color: "#1a1a1a" }}
              >
                Discounted Cash Flow Model
              </div>
            </div>
          </div>
          <div className={styles.spreadsheet_pic}>
            <Image
              src={spreadsheet}
              width="630px"
              height="400px"
              style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
            />
          </div>
        </div>
      </div>

      <div className={styles.layer_three}>
        <div className={styles.layer_top}>
          <h2 className={styles.subheader1}>
            Make Trades — Your Decision Influences the Market!
          </h2>
          <p className={styles.sub_intro} style={{ marginLeft: "5em" }}>
            While playing, learn financial terms and concepts to get a clearer
            insight of the financial world.
          </p>
        </div>
        <div className={styles.display_game}>
          <div className={styles.screenshot_main}>
            <Image src={trade} width="1200px" height="630px" />
          </div>
        </div>
      </div>

      <div className={styles.layer_five} style={{marginLeft: "2em"}}>
        <div className={styles.inline}>
          <div className={styles.charts1} style={{ marginRight: "2em" }}>
            <h2 className={styles.sub_subheader}>
              Collect Market Clue: Stylistic News
            </h2>
            <p className={styles.sub_subintro}>
              Capture important market information from different news sources.
              ALL INFO MATTERS!
            </p>
            <div style={{ marginTop: "2em", marginLeft: "2em" }}>
              <Image src={news} width="410" height="400" />
            </div>
          </div>

          <div className={styles.charts1} style={{ marginRight: "2em" }}>
            <h2 className={styles.sub_subheader}>
              Chat: Join Discussion and Share Opinions
            </h2>
            <p className={styles.sub_subintro}>
              Communicate with other users and share your opinions on stocks.
              Unity creates values.
            </p>
            <div style={{ marginTop: "2em", marginLeft: "2em" }}>
              <Image src={chat} width="410" height="360" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.layer_three}>
        <div className={styles.layer_top}>
          <h2 className={styles.subheader}>
            Financial Terms at Your Fingertips
          </h2>
          <p className={styles.sub_intro}>
            While playing, learn financial terms and concepts to get a clearer
            insight of the financial world.
          </p>
        </div>
        <div className={styles.display_game}>
          <div className={styles.screenshot_main}>
            <Image src={dict} width="1200px" height="630px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;