import React from "react";
import Link from "next/link";
import styles from "./search.module.css";
import { urlFor } from "../../sanity";
import { useState } from "react";
import Image from "next/image";
import alien from "../../image/logo/alien.png";

export default function SearchList(props: any) {
  const posts = props.posts;
  let text = "No articles match your keywords.";
  let searchField = props.searchField;
  if (props.searchField == "") {
    searchField = "asdfhiohuqweufdsoj";
    text = "";
  }

  const mappedItems = posts.map((post: any) => {
    if (post.title.includes(searchField) || post.title.includes(searchField.substring(1, searchField.length))) {
      return (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
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
            </div>
          </div>
        </Link>
      );
    } else {
      return null;
    }
  });
  if (
    mappedItems.every((item: null) => item === null) &&
    props.searchField != ""
  ) {
    return (
      <div className={styles.img_container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src={alien} width="210px" height="150px" alt=""/>
        </div>
        <p className={styles.no_text}>{text}</p>
      </div>
    );
  }

  return (
    <div
      id="articles"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
    >
      {mappedItems}
    </div>
  );
}
