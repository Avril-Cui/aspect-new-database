import styles from "../../styles/simulator/company.module.css";
import Link from "next/link";
import { Post } from "../../../typings";
import { sanityClient, urlFor } from "../../../sanity";


interface Props {
  posts: [Post];
}
  
export default function IndividualNews({ posts }: Props) {
  console.log(posts)
    return(
        <div className={styles.news}>
        {posts.map((post) => (
              post.categories._ref == "c523a11c-4a72-4328-a43a-d3b94dd60a8b" ?
              (<Link key={post._id} href={`/simulator_news/${post.slug.current}`}>
                <div className={styles.news_container}>
                  <img
                      className={styles.img_comp}
                      src={urlFor(post.mainImage).url()!}
                      alt=""
                  />
                  <p className={styles.news_author}>{post.author.name}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{new Date(post._createdAt).toLocaleString()}</p>
                  <p className={styles.news_title}>{post.title}</p>
                  <p className={styles.news_decription}>{post.description}</p>
                </div>
                  
              </Link>):null
            ))}
      </div>
    );
};


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

