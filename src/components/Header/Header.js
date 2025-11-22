import React from "react";
import styles from "./Header.module.scss";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = ({ onAvatarClick }) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>T</div>
        <span className={styles.brandText}>TSS</span>
      </div>
      <button className={styles.avatar} onClick={onAvatarClick} aria-label="User menu">
        <IoPersonCircleOutline size={44} />
      </button>
    </div>
  );
};

export default Header;
