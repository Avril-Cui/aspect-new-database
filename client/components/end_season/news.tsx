import styles from "./news.module.css";
import Link from "next/link";
import { urlFor } from "../../sanity";
import Image from "next/image";
import rocket from "../../image/logo/rocket.png";
import message from "../../image/logo/message.png";

export default function News(props: any) {
  const index = props.index;

  return (
    <div>
      <div
        // className={styles.article_container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
      >
        {index.map((post: any) => (
          <Link key={post._id} href={`/end_season_news/${post.slug.current}`}>
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
                    <p className={styles.date}>Season One</p>
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
