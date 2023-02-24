import styles from "./news.module.css";
import Link from "next/link";
import { urlFor } from "../../sanity";
import Image from "next/image";
import rocket from "../../image/logo/rocket.png";
import message from "../../image/logo/message.png";
import { useRef } from "react";

export default function Simulator(props: any) {
  const index = props.index;
  const elementRef: any = useRef(null);

  function handleScrollLeft() {
    elementRef.current.scrollLeft -= 1250;
  }

  function handleScrollRight() {
    elementRef.current.scrollLeft += 1250;
  }

  return (
    <div>
      <div className={styles.buttons}>
        <button
          onClick={handleScrollLeft}
          className={styles.scroll_btn}
          style={{ marginRight: "1180px" }}
        >
          &lt;
        </button>
        <button onClick={handleScrollRight} className={styles.scroll_btn}>
          &gt;
        </button>
      </div>
      <div
        ref={elementRef}
        style={{ overflowX: "scroll" }}
        className={styles.article_container}
      >
        {index.map((post: any) => (
          <Link key={post._id} href={`/simulator_news/${post.slug.current}`}>
            <a>
              <div className={styles.container}>
                <img
                  className={styles.img_news}
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <p className={styles.section_title_comp}>{post.title}</p>
                <p className={styles.section_text_comp}>{post.description}</p>
                <div className={styles.inline}>
                  <div>
                    <p className={styles.post_detail_comp}>
                      by <span>{post.author.name}</span>
                    </p>
                    <p className={styles.date}>April 2nd</p>
                  </div>
                  <button
                    className={styles.like_button}
                    style={{ paddingTop: "0.25em" }}
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
                      <Image src={message} width="22px" height="22px" alt="" />
                      <p className={styles.like_num}>10</p>
                    </div>
                  </button>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
