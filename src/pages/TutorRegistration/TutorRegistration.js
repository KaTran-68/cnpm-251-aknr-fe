import React from 'react';
import styles from './TutorRegistration.module.scss';

export default function TutorRegistration() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Hoàn tất đơn đăng ký</h2>

        <form>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Họ và Tên</label>
              <input className={styles.input} />
            </div>

            <div>
              <label className={styles.label}>Địa chỉ Gmail (đuôi @hcmut.edu.vn)</label>
              <input className={styles.input} />
            </div>

            <div className={styles.fullRow}>
              <label className={styles.label}>Sinh viên/Cán bộ</label>
              <div className={styles.radioGroup}>
                <label><input type="radio" name="role" /> Sinh viên</label>
                <label><input type="radio" name="role" /> Cán bộ</label>
              </div>
            </div>

            <div>
              <label className={styles.label}>Mã số sinh viên/ Mã số cán bộ</label>
              <input className={styles.input} />
            </div>

            <div>
              <label className={styles.label}>Số điện thoại</label>
              <input className={styles.input} />
            </div>

            <div className={styles.fullRow}>
              <label className={styles.label}>Khoa</label>
              <input className={styles.input} />
            </div>

            <div className={styles.fullRow}>
              <label className={styles.label}>Ngành</label>
              <input className={styles.input} />
            </div>

            <div className={styles.fullRow}>
              <label className={styles.label}>Mô tả đôi nét về khả năng dạy học</label>
              <textarea className={styles.textarea} />
            </div>

            <div className={styles.fullRow}>
              <div className={styles.helper}>Bạn có thể bổ sung tài liệu minh chứng sau khi được duyệt.</div>
            </div>

          </div>

          <div className={styles.actionRow}>
            <button type="button" className={styles.submitBtn}>Tiếp tục</button>
          </div>
        </form>
      </div>
    </div>
  );
}
