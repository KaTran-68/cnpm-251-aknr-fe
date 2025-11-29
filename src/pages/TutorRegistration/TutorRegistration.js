import React from 'react';
import styles from './TutorRegistration.module.scss';
import Header from '../../components/Header/Header';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function TutorRegistration() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "student",
    idCode: "",
    phone: "",
    faculty: "",
    major: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setForm((prev) => ({ ...prev, [name]: value }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    if (!form.fullName.trim()) return false;
    if (!form.email.trim()) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;
    console.log("submit", form);
    // TODO: gọi API submit
  };

  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.content}>
        <div className={styles.card}>
        <h2 className={styles.title}>Hoàn tất đơn đăng ký</h2>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.label}>Họ và Tên</label>
          <input
            className={styles.input}
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
          />

          <label className={styles.label}>Địa chỉ Gmail (đuôi @hcmut.edu.vn)</label>
          <input
            className={styles.input}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="abc@hcmut.edu.vn"
            type="email"
          />

          <div className={styles.row}>
            <div className={styles.radioGroup}>
              <div className={styles.label} style={{ textAlign: 'center', width: '100%' }}>Sinh viên/Cán bộ</div>
              <div className={styles.radioOptions} style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={handleChange}
                  />
                  <span>Sinh viên</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={form.role === "staff"}
                    onChange={handleChange}
                  />
                  <span>Cán bộ</span>
                </label>
              </div>
            </div>

            <div className={styles.flexItem}>
              <label className={styles.label}>Mã số sinh viên / Mã số cán bộ</label>
              <input
                className={styles.input}
                name="idCode"
                value={form.idCode}
                onChange={handleChange}
                placeholder="12345678"
              />
            </div>
          </div>

          <label className={styles.label}>Số điện thoại</label>
          <input
            className={styles.input}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="(84) 9xx xxx xxx"
          />

          <label className={styles.label}>Khoa</label>
          <input
            className={styles.input}
            name="faculty"
            value={form.faculty}
            onChange={handleChange}
            placeholder="Khoa Công nghệ Thông tin"
          />

          <label className={styles.label}>Ngành</label>
          <input
            className={styles.input}
            name="major"
            value={form.major}
            onChange={handleChange}
            placeholder="Kỹ thuật phần mềm"
          />

          <label className={styles.label}>Mô tả đôi nét về khả năng dạy học</label>
          <textarea
            className={styles.textarea}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Kinh nghiệm, môn dạy, mức độ..."
          />

          <button
            className={styles.submitBtn}
            type="submit"
            disabled={!isValid()}
            aria-disabled={!isValid()}
            onClick={() => navigate('/submitted-profiles')}
          >
            Tiếp tục
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
