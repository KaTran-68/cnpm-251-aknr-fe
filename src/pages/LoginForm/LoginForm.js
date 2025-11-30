import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import backgroundImg from '../../assets/images/background.png';
import TSSLogo from '../../assets/images/logoTSS.png';
import BKLogo from '../../assets/images/logoBK.png';
import {getUserProfile} from '../../services/api';
import { AuthLogin } from '../../services/api';

function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || '';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role in LoginForm:", role);
    const response = await AuthLogin(username, password, role);
    if (response.auth){
      if (role === 'admin') {
        navigate("/admin/home");
      }
      else if (role === 'teacher') {
        navigate("/teacher/home");
      }
      else if (role === 'tutor') {
        navigate("/tutor/home");
      }
      else {
        navigate("/student/home");
      }
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('auth', true);
    }
    else{
      setError(response.data);
    }
}
  return (
    <div className={styles.container}>
      {}
      <div className={styles.leftPanel}>
        <img src={backgroundImg} alt="Background" />
        <h1>HCMUT_TSS</h1>
        <h2>Tutor Support System</h2>
      </div>
      <div className={styles.rightPanel}>
        <img src={TSSLogo} alt="TSS Logo" onClick={() => navigate("/")} style={{cursor:'pointer'}} />
        <h2 className={styles.title}>Đăng nhập</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
          />
          <label htmlFor="password">Mật khẩu</label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? '🙉' : '🙈'}
            </span>
          </div>
          <div>
            <span
              className={styles.forgotPassword}
              onClick={() => navigate('/forgot-password')}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              title="Quên mật khẩu"
            >
              Quên mật khẩu?
            </span>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <div className={styles.contactInfo}>
          <img src={BKLogo} alt="BK Logo"/>
          <div className={styles.info}>
            <div className={styles.row}>
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 7C14 6.08075 13.8189 5.1705 13.4672 4.32122C13.1154 3.47194 12.5998 2.70026 11.9497 2.05025C11.2997 1.40024 10.5281 0.884626 9.67878 0.532843C8.8295 0.18106 7.91925 0 7 0C6.08075 0 5.17049 0.18106 4.32122 0.532843C3.47194 0.884626 2.70026 1.40024 2.05025 2.05025C1.40024 2.70026 0.884626 3.47194 0.532843 4.32122C0.18106 5.1705 -1.36979e-08 6.08075 0 7C0 8.387 0.409 9.677 1.105 10.765H1.097L7 20L12.903 10.765H12.896C13.6169 9.6416 14.0001 8.33482 14 7ZM7 10C6.20435 10 5.44129 9.68393 4.87868 9.12132C4.31607 8.55871 4 7.79565 4 7C4 6.20435 4.31607 5.44129 4.87868 4.87868C5.44129 4.31607 6.20435 4 7 4C7.79565 4 8.55871 4.31607 9.12132 4.87868C9.68393 5.44129 10 6.20435 10 7C10 7.79565 9.68393 8.55871 9.12132 9.12132C8.55871 9.68393 7.79565 10 7 10Z" fill="#65B4DF"/>
              </svg>
              <span style={{color: '#65B4DF'}} >Cơ sở 2: Khu phố Tân Lập, Phường Đông Hòa, TP.HCM</span>
            </div>
            <div className={styles.row}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.42444 9.52111C6.18444 12.98 9.02 15.8033 12.4789 17.5756L15.1678 14.8867C15.4978 14.5567 15.9867 14.4467 16.4144 14.5933C17.7833 15.0456 19.2622 15.29 20.7778 15.29C21.45 15.29 22 15.84 22 16.5122V20.7778C22 21.45 21.45 22 20.7778 22C9.30111 22 0 12.6989 0 1.22222C0 0.55 0.55 0 1.22222 0H5.5C6.17222 0 6.72222 0.55 6.72222 1.22222C6.72222 2.75 6.96667 4.21667 7.41889 5.58556C7.55333 6.01333 7.45555 6.49 7.11333 6.83222L4.42444 9.52111Z" fill="#65B4DF"/>
              </svg>
              <a href="tel:02838654087" style={{color: '#65B4DF'}}>028 3865 4087</a>
            </div>
            <div className={styles.row}>
              <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6 0H2.4C1.08 0 0.012 1.06875 0.012 2.375L0 16.625C0 17.9312 1.08 19 2.4 19H21.6C22.92 19 24 17.9312 24 16.625V2.375C24 1.06875 22.92 0 21.6 0ZM21.6 4.75L12 10.6875L2.4 4.75V2.375L12 8.3125L21.6 2.375V4.75Z" fill="#65B4DF"/>
              </svg>
              <a href="mailto:spso@hcmut.edu.vn" style={{color: '#65B4DF'}}>spso@hcmut.edu.vn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
