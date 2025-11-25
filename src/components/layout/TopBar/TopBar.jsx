import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import styles from "./TopBar.module.scss";

const TopBar = ({ onAvatarClick }) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>T</div>
        <span className={styles.brandText}>TSS</span>
      </div>
      <button
        type="button"
        className={styles.avatar}
        aria-label="Open profile"
        onClick={onAvatarClick}
      >
        <IoPersonCircleOutline size={44} />
      </button>
    </div>
  );
};

export default TopBar;
