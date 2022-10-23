import styles from "./comp_news.module.css";
import Link from "next/link";
import { sanityClient, urlFor } from "../../../sanity";
import { Post } from "../../../typings";
import Image from "next/image";

interface Props {
  posts: [Post];
}

export default function CompNews({ posts }: Props) {
  return (
    <div>

      <div className={styles.news_section}>
                
      <div className={styles.scroll}>
        <div className={styles.term_sections_cont}>
          <div className={styles.article_container}>
            
          </div>
        </div>
      </div>

      <div className={styles.sep_line}/>
      <p className={styles.comp_news}>Discover Company News</p>



      <div className={styles.scroll_comp}>
            
      </div>
      </div>


    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "simulator_news"]{
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

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};