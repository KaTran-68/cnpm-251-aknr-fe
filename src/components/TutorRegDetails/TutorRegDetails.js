import React from 'react';
import styles from './TutorRegDetails.module.scss';
import { FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { APP_STATUSES } from '../../constants/statuses';

export default function TutorRegDetails({ data, onClose }){
  const statusKey = (data?.status || '').toLowerCase();
  const statusInfo = Object.values(APP_STATUSES).find(s => s.key === statusKey);
  
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
              <p>{data?.name || 'N/A'}</p>
            </div>
            <div>
              <p className={styles.label}>MSSV/MSCB</p>
              <p>{data?.id || 'N/A'}</p>
            </div>
            <div>
              <p className={styles.label}>Khoa</p>
              <p>{data?.faculty || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.row}><FaEnvelope /> <strong>Liên hệ</strong></div>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.label}>Email</p>
              <p>{data?.email || 'N/A'}</p>
            </div>
            <div>
              <p className={styles.label}>SĐT</p>
              <p>{data?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.row}><FaCalendarAlt /> <strong>Tiến trình xử lý hồ sơ</strong></div>
          <div className={styles.rowBetween}>
            <div>Ngày nộp<br/><strong>{data?.daySubmit || 'N/A'}</strong></div>
            <div className={`${styles.status} ${styles[statusKey]}`}>
              {statusInfo?.label || data?.status || 'Chờ duyệt'}
            </div>
          </div>
        </div>

        <div className={styles.footerNote}>
          {statusKey === 'approved' 
            ? 'Bạn đã trở thành tutor, vui lòng truy cập trang đăng nhập dành cho tutor!' 
            : statusKey === 'rejected'
            ? 'Đơn đăng ký của bạn đã bị từ chối.'
            : 'Đơn đăng ký của bạn đang được xem xét.'}
        </div>
      </div>
    </div>
  )
}
