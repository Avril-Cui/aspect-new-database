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
import logo from "../image/logo/alien.png";
import Link from "next/link";
import ReactPlayer from "react-player";
import twi from "../public/twitter.png";
import ins from "../public/instagram.png";
import git from "../public/git.png";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

const Product = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product Introduction</title>
      </Head>
      <div className={styles.bg1}>
        <div className={styles.layer_one}>
          <h1 className={styles.header}>Dynamic market trading game</h1>
          <p className={styles.intro}>
            Join Aspect to learn trading and finance by experiencing a virtual,
            dynamic stock market with various interesting events.
          </p>
          <div className={styles.btns}>
            <Link href="/auth/signup">
              <a>
                <button className={styles.join_btn}>
                  Join game <span>&gt;</span>
                </button>{" "}
              </a>
            </Link>

            <Link href="https://drive.google.com/file/d/1ewv4b0DfugUCzB8tz5Wtf9PU4weWu647/view?usp=sharing">
              <a>
                <button className={styles.view_btn}>View whitepaper</button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.layer_two}>
          <div className={styles.inline} style={{ marginLeft: "2em" }}>
            <div className={styles.inline_cell}>
              <div className={styles.logo}>
                <Image src={company} width="50px" height="50px" />
              </div>
              <p className={styles.inline_header}>Explore Companies</p>
              <p className={styles.inline_text}>
                Analysis interesting companies with unique traits.
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
            <Image src={main} width="1280" height="630px" />
          </div>
        </div>
      </div>

      <div className={styles.bg2}>
        <div className={styles.video}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=vsqmaqe-xBU&ab_channel=AspectGameMaster"
            height="489px"
            width="870px"
          />
        </div>
        <div>
          <p className={styles.slogan}>
            "While playing, observe a clearer insight of the financial world. "
          </p>
          <div className={styles.social_media}>
            <p className={styles.info_header}>
              Find information and updates on Aspect
            </p>
            <div className={styles.center}>
              <div className={styles.icons}>
                <div style={{ marginLeft: "-1em" }}>
                  <Image src={twi} width={50} height={50} />
                </div>
                <div style={{ marginLeft: "2em" }}>
                  <Image src={ins} width={50} height={50} />
                </div>
                <div style={{ marginLeft: "2em" }}>
                  <Image src={git} width={50} height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bg3}>
        <p className={styles.header1}>Learn with gaming, game to learn</p>
        <div className={styles.center}>
          <p className={styles.intro1}>
            Aspect aims to create a virtual stock market with intense and
            interesting companies and market events parallel to the real world.
            By doing so, we hope to simulate trading under exceptional market
            events, preparing users for trading individually in the stock
            market.
          </p>
        </div>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="2011 - present"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              Creative Director
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
            <p>
              Creative Direction, User Experience, Visual Design, Project
              Management, Team Leading
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2010 - 2011"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Art Director</h3>
            <h4 className="vertical-timeline-element-subtitle">
              San Francisco, CA
            </h4>
            <p>
              Creative Direction, User Experience, Visual Design, SEO, Online
              Marketing
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2008 - 2010"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Web Designer</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Los Angeles, CA
            </h4>
            <p>User Experience, Visual Design</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2006 - 2008"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Web Designer</h3>
            <h4 className="vertical-timeline-element-subtitle">
              San Francisco, CA
            </h4>
            <p>User Experience, Visual Design</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="April 2013"
            iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              Content Marketing for Web, Mobile and Social Media
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Online Course
            </h4>
            <p>Strategy, Social Media</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="November 2012"
            iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              Agile Development Scrum Master
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Certification
            </h4>
            <p>Creative Direction, User Experience, Visual Design</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="2002 - 2006"
            iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">
              Bachelor of Science in Interactive Digital Media Visual Imaging
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Bachelor Degree
            </h4>
            <p>Creative Direction, Visual Design</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          />
        </VerticalTimeline>
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

      <div className={styles.layer_five} style={{ marginLeft: "2em" }}>
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

      <div className={styles.comment_from_developer}>
        <h2 className={styles.subsubheader}>
          Notes From Developer [GAME MASTER]
        </h2>
        <div className={styles.inline}>
          <div className={styles.logo_img}>
            <div style={{ marginTop: "1.25em", marginLeft: "0.65em" }}>
              <Image src={logo} width="300pz" height="230px" />
            </div>
          </div>
          <div className={styles.contact_info}>
            <p className={styles.name}>Avril Cui</p>
            <p className={styles.contact}>Founder</p>
            <p className={styles.contact1}>AvrilCui17@gmail.com</p>
          </div>
          <div style={{ marginTop: "5em" }}>
            <p className={styles.description}>
              This website is created by <b>Avril Cui</b>. I am currently a
              16-year-old high school junior.
            </p>
            <p className={styles.description} style={{ marginTop: "1em" }}>
              I created this website because my own finance-learning experience
              inspired me. Learning finance is always a challenging task.
              Complicated terminologies, intense market fluctuations, various
              models...
            </p>
            <p className={styles.description} style={{ marginTop: "1em" }}>
              I hope Aspect can help simplify the learning process through
              gaming. The game will have the best effect when playing on a
              computer. In the future season, more features will be constantly
              updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
