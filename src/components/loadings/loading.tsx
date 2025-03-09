import React from "react";
import styles from "./loading.module.css";

export const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <span className={styles.loader}></span>
    </div>
  );
};
