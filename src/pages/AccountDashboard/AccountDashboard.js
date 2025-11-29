import React, { useEffect } from 'react';
import styles from './AccountDashboard.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function AccountDashboard({}) {
  const { role } = useParams();
  const navigate = useNavigate();
  const actualRole = localStorage.getItem('role');

  function onLogout() {
    navigate('/');
  }
  function onRegister() {
    navigate('/tutor-registration');
  }

  useEffect(() => {
    if (role && actualRole && role !== actualRole) {
      navigate(`/${actualRole}/account`, { replace: true });
    }
  }, [role, actualRole, navigate]);
  const isSimple = role === 'tutor' || role === 'admin';
  const handleChangePassword = () => {
    navigate(`/${role}/change-password`);
    };
  const Back2Home = () => {
    navigate(`/${role}/home`);
    };
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>QUẢN LÝ TÀI KHOẢN</h2>
        <div className={styles.body}>
          <div className={styles.card}>
            <button className={styles.actionBtn} onClick={handleChangePassword}>Thay đổi mật khẩu</button>
            {!isSimple && (
              <button className={styles.actionBtn} onClick={onRegister}>Đăng ký làm Tutor</button>
            )}
            <button className={styles.actionBtn} onClick={onLogout}>Đăng xuất</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
