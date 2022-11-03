import React from "react";
import styles from "../styles/model/model.module.css";
import TermsSection from "../components/terminology/terms_section";
import Link from "next/link";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Model({ posts }: Props) {
  return (
    <div>
      <p className={styles.title}>Useful Models For Financial Analysis</p>
      <div className={styles.style_description}>
        <p className={styles.description}>
          Apply financial concepts and theories in investment decisions through Excel or programming
          algorithms.
        </p>
      </div>

      <TermsSection
        section_num="Section One"
        section_name="DCF Model"
        intro_text="This section introduces the classical Discounted Cash Flow Model (DCF). DCF commonly used in fundamental valuation approach and it looks for the 'intrinsic' value of companies. The model is built based on the Time Value of Money (TVM) theory, so we will first learn the TVM. Then, different components inside DCF will be introduced. By the end of this section, you will be able to construct your own DCF model using Excel."
        start_link="/post/swot"
      />
      <div className={styles.container} style={{marginBottom: 100}}>
      <div className={styles.scroll}>
        <div className={styles.term_sections_cont}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
            style={{ width: 1060 }}
          >
            {posts.map((post) => (
              post.categories != null && post.categories._ref == "e242b86d-7cea-49b1-aeb9-312d45b3d319" ?
              (<Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className={styles.img_border}>
                  <img
                    className={styles.img}
                    src={urlFor(post.mainImage).url()!}
                    alt=""
                  />
                  <div className={styles.text_cont}>
                    <div>
                      <p className={styles.section_title}>{post.title}</p>
                      <p className={styles.section_text}>{post.description}</p>
                    </div>
                    <img
                      className={styles.author_pic}
                      src={urlFor(post.author.image).url()!}
                      alt=""
                    />
                  </div>
                </div>
              </Link>):null
            ))}
          </div>
        </div>
      </div>
      </div>


      <TermsSection
        section_num="Section Two"
        section_name="Portfolio"
        intro_text="Portfolio management is an important topic. In this section, a simple but essential portfolio modelling method will be introduced. We will first walk through several related theories. Then, some fundamental Python skills required in building this model will be taught. By the end of this section, you will be able to construct a model that can help finding the efficient portfolio combinations."
        start_link="/post/swot"
      />
      <div className={styles.container}>
      <div className={styles.scroll}>
        <div className={styles.term_sections_cont}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
            style={{ width: 1060 }}
          >
            {posts.map((post) => (
              post.categories != null && post.categories._ref == "abc7e3c9-97a5-4ea7-9e0f-200a04849e30" ?
              (<Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className={styles.img_border}>
                  <img
                    className={styles.img}
                    src={urlFor(post.mainImage).url()!}
                    alt=""
                  />
                  <div className={styles.text_cont}>
                    <div>
                      <p className={styles.section_title}>{post.title}</p>
                      <p className={styles.section_text}>{post.description}</p>
                    </div>
                    <img
                      className={styles.author_pic}
                      src={urlFor(post.author.image).url()!}
                      alt=""
                    />
                  </div>
                </div>
              </Link>):null
            ))}
          </div>
        </div>
      </div>
      </div>


    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
  
    author -> {
      name,
      image
  },
    description,
    mainImage,
    slug,
    categories[1]
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

