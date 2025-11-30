import React, { useState } from 'react';
import styles from './ChangePassword.module.scss';
import  {useParams,useNavigate} from 'react-router-dom';
import Header from '../../components/Header/Header';


function ChangePassword({ onSubmit }) {
  const { role } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const isDisabled = !form.username || !form.oldPassword || !form.newPassword || !form.confirm || form.newPassword !== form.confirm;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm) {
      setError('Mật khẩu mới và xác nhận không khớp');
      return;
    }
    
    // Show success notification
    setNotification({ show: true, message: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.' });
    
    // Navigate to homepage after 2 seconds
    setTimeout(() => {
      const userRole = localStorage.getItem('role') || role || 'student';
      navigate(`/`);
    }, 2000);
    
    if (onSubmit) onSubmit(form);
  };
  const Back2Home = () => {
    navigate(`/${role}/home`);
    };
  return (
    <div className={styles.container}>
      <Header />
      
      {notification.show && (
        <div className={styles.notification}>
          {notification.message}
        </div>
      )}
      
      <div className={styles.content}>
        <h2 className={styles.title}>THAY ĐỔI MẬT KHẨU</h2>
        <div className={styles.body}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Username</label>
            <input name="username" value={form.username} onChange={handleChange} className={styles.input} />
            <label className={styles.label}>Old Password</label>
            <input name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} className={styles.input} />
            <label className={styles.label}>New Password</label>
            <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} className={styles.input} />
            <label className={styles.label}>Confirm</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className={styles.input} />
            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.submitBtn} onClick={onSubmit}>Tiếp tục</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
