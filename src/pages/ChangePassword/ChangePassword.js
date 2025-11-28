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
    if (onSubmit) onSubmit(form);
  };
  const Back2Home = () => {
    navigate(`/${role}/home`);
    };
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.title}>THAY ĐỔI MẬT KHẨU</h2>
        <div className={styles.body}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Username</label>
            <input name="username" value={form.username} onChange={handleChange} className={styles.input} />
            <label>Old Password</label>
            <input name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} className={styles.input} />
            <label>New Password</label>
            <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} className={styles.input} />
            <label>Confirm</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange} className={styles.input} />
            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.submitBtn} disabled={isDisabled}>Tiếp tục</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
