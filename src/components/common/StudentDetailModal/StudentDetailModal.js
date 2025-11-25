import React from "react";
import styles from "./StudentDetailModal.module.scss";

const StudentDetailModal = ({ student, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.modalTitle}>THÔNG TIN CHI TIẾT SINH VIÊN</h2>

        <div className={styles.modalBody}>
          <div className={styles.avatarSection}>
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <span>{student.name.charAt(0)}</span>
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoRow}>
              <strong>Họ và tên:</strong> {student.name}
            </div>
            <div className={styles.infoRow}>
              <strong>Giới tính:</strong> {student.gender}
            </div>
            <div className={styles.infoRow}>
              <strong>MSSV:</strong> {student.mssv}
            </div>
            <div className={styles.infoRow}>
              <strong>Khoa:</strong> {student.faculty}
            </div>
            <div className={styles.infoRow}>
              <strong>Ngành:</strong> {student.major}
            </div>
            <div className={styles.infoRow}>
              <strong>Email:</strong> {student.email}
            </div>
            <div className={styles.infoRow}>
              <strong>SĐT:</strong> {student.phone}
            </div>
            <div className={styles.infoRow}>
              <strong>Điểm TBTL:</strong> {student.gpa}
            </div>
            <div className={styles.infoRow}>
              <strong>Ngày bắt đầu học:</strong> {student.startDate}
            </div>
            <div className={styles.infoRow}>
              <strong>Số buổi đã học:</strong> {student.completedSessions}
            </div>
            <div className={styles.infoRow}>
              <strong>Các môn đã học:</strong> {student.subjects}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentDetailModal;
