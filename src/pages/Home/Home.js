import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Home.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import backgroundImg from '../../assets/images/background.png';
// import BKLogo from '../../assets/images/logoBK.png';
// import Footer from '../../components/Footer/Footer';

function Home() {
  const { role } = useParams();
  const navigate = useNavigate();
  const actualRole = localStorage.getItem('role');

  useEffect(() => {
    if (role && actualRole && role !== actualRole) {
      navigate(`/${actualRole}/home`, { replace: true });
    }
  }, [role, actualRole, navigate]); 

  let bodyContent;
  if (role === 'student') {
    bodyContent = (
      <button className={styles.tutorBtn} onClick={() => navigate('/tutor-selection')}>Đăng ký chọn Tutor</button>
    );  
  } else if (role === 'tutor') {
    bodyContent = (
      <>
        <div style={{ display: 'flex', gap: '3vw', marginBottom: '2rem' }}>
          <button className={styles.tutorBtn}>Danh sách Sinh viên</button>
          <button className={styles.tutorBtn}>Đăng ký lịch dạy</button>
        </div>
        <button className={styles.tutorBtn} style={{marginTop: '2rem'}}>Xem lịch dạy</button>
      </>
    );
  } else if (role === 'admin') {
    bodyContent = (
      <div style={{ display: 'flex', gap: '3vw', marginBottom: '2rem' }}>
        <button className={styles.tutorBtn}>Quản lý Tutor</button>
        <button className={styles.tutorBtn}>Quản lý lớp học</button>
      </div>
    );
  } else {
    bodyContent = null;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <img src={backgroundImg} alt="Background" className={styles.bgImg} />
        <div className={styles.centerContent}>
          <h1 className={styles.title}>HCMUT_TSS</h1>
          <h2 className={styles.subtitle}>Tutor Support System</h2>
          {bodyContent}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
