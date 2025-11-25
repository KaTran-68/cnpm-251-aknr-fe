import React from "react";
import styles from "./Footer.module.scss";
import { IoLocationOutline, IoCallOutline, IoMailOutline } from "react-icons/io5";
import bkLogo from "../../assets/images/bk_name_vi.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <img src={bkLogo} alt="HCMUT logo" className={styles.logo} />
      </div>
      <div className={styles.footerRight}>
        <div className={styles.contactRow}>
          <IoLocationOutline />
          <span>Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP.HCM</span>
        </div>
        <div className={styles.contactRow}>
          <IoCallOutline />
          <a href="tel:02838654087">028 3865 4087</a>
        </div>
        <div className={styles.contactRow}>
          <IoMailOutline />
          <a href="mailto:sps@hcmut.edu.vn">sps@hcmut.edu.vn</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
