import styles from "./search.module.css";
import SearchList from "./searchList.tsx";

const Search = (props) => {
  return (
    <div className={styles.pop_up_container}>
      <div className={styles.box}>
        <SearchList posts={props.posts} searchField={props.searchField} />
      </div>
    </div>
  );
};

export default Search;
