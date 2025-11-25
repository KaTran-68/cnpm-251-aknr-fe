import React from 'react';
import styles from './TutorRegDetails.module.scss';
import { FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { APP_STATUSES } from '../../constants/statuses';

export default function TutorRegDetails({ data, onClose }){
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <h3 className={styles.title}>Chi tiết đơn đăng ký Tutor</h3>

        <div className={styles.section}>
          <div className={styles.row}><FaUser /> <strong>Thông tin cá nhân</strong></div>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.label}>Họ và tên</p>
              <p>Nguyễn Văn A</p>
            </div>
            <div>
              <p className={styles.label}>MSSV/MSCB</p>
              <p>2213452</p>
            </div>
            <div>
              <p className={styles.label}>Khoa</p>
              <p>KH-KTMT</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.row}><FaEnvelope /> <strong>Liên hệ</strong></div>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.label}>Email</p>
              <p>a.nguyents5@hcmut.edu.vn</p>
            </div>
            <div>
              <p className={styles.label}>SĐT</p>
              <p>0123456789</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.row}><FaCalendarAlt /> <strong>Tiến trình xử lý hồ sơ</strong></div>
          <div className={styles.rowBetween}>
            <div>Ngày nộp<br/><strong>20/10/20250 lúc 10:00 AM</strong></div>
            {
              (() => {
                const statusKey = (data?.statusKey || (data?.status || '')?.toLowerCase() || '').toLowerCase();
                const statusLabel = Object.values(APP_STATUSES).find(s => s.key === statusKey)?.label || data.status || statusKey;
                return (
                  <div className={`${styles.status} ${styles[statusKey]}`}>{statusLabel}</div>
                );
              })()
            }
          </div>
        </div>

        <div className={styles.footerNote}>Bạn đã trở thành tutor, vui lòng truy cập trang đăng nhập dành cho tutor!</div>
      </div>
    </div>
  )
}
