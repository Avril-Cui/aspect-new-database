import React from "react";
import styles from "../styles/Graph.module.css";

function GraphTest() {
  return (
    <div className={styles.graph_style}>
      <iframe
        id="igraph"
        scrolling="no"
        src="https://plotly.com/~Avril_Cui/12.embed"
        height="525"
        width="100%"
      ></iframe>
    </div>
  );
}

export default GraphTest;
