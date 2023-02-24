import Link from "next/link";
import { urlFor } from "../../sanity";
import styles from "./terms.module.css";

function Terms(props: any) {
  const terms = [
    "Excel: Income Statement",
    "Initial Public Offering (IPO)",
    "Trading Overview",
    "Why Is ESG Important?",
  ];
  const posts = props.posts;

  const mappedItems = posts.map((post: any) => {
    for (var i = 0; i < terms.length; i++) {
      if (post.title == terms[i]) {
        return (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <a>
              {" "}
              <div className={styles.img_border}>
                <img
                  className={styles.img}
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <div className={styles.inline_dev}>
                  <img
                    className={styles.author_pic}
                    src={urlFor(post.author.image).url()!}
                    alt=""
                  />
                  <p className={styles.author_name}>{post.author.name}</p>
                </div>
                <div className={styles.text_cont}>
                  <div>
                    <p className={styles.section_title}>{post.title}</p>
                    <p className={styles.section_text}>{post.description}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      }
    }
  });

  return (
    <div
      id="articles"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
    >
      {mappedItems}
    </div>
  );
}

export default Terms;
