import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
import TopBar from "../../components/layout/TopBar/TopBar";
import ActionButton from "../../components/common/ActionButton/ActionButton";
import Footer from "../../components/layout/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      {/* Top Bar */}
      <TopBar />

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.title}>HCMUT_TSS</h1>
        <p className={styles.subtitle}>Tutor Support System</p>

        <div className={styles.actions}>
          <ActionButton className={styles.actionLeft} onClick={() => navigate('/students')}>Danh sách Sinh viên</ActionButton>
          <ActionButton className={styles.actionRight} onClick={() => navigate('/register')}>Đăng ký lịch dạy</ActionButton>
          <ActionButton className={styles.actionBottom} onClick={() => navigate('/view')}>Xem lịch dạy</ActionButton>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
