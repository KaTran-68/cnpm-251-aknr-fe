import React from 'react';
import styles from './Header.module.scss';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src="/TSS_Logo.png" alt="logo" style={{height:60}} />
        </div>

        <div className={styles.center}>
          <h1>HCMUT_TSS</h1>
          <div className={styles.subtitle}>Tutor Support System</div>
        </div>

        <div className={styles.right}>
          <FaUserCircle size={48} />
        </div>
      </div>
    </header>
  );
};

export default Header;
