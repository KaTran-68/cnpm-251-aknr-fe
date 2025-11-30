import { FaCalendarAlt, FaVideo } from "react-icons/fa";
import styles from "./ClassCard.module.scss";
import { HiEye } from "react-icons/hi";


export default function ClassCard({ data, onView }) {
  const { name, tutor, status, student, statusKey } = data;

  // map statusKey to module class
  const statusClass =
    statusKey === "upcoming"
      ? styles.statusUpcoming
      : statusKey === "pending"
        ? styles.statusPending
        : statusKey === "done"
          ? styles.statusEnded
          : styles.statusCancelled;

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h3 className={styles.className}>{tutor}</h3>
          <p className={styles.subject}>{name}</p>
        </div>
        <span className={`${styles.statusTag} ${statusClass}`}>
          {status}
        </span>
      </div>

      {/* Info */}
      <div className={styles.infoRow}>
        <FaCalendarAlt className={styles.icon} />
        <span>Thứ 2-4-6, 7:00–8:30PM</span>
      </div>

      <div className={styles.infoRow}>
        <FaVideo className={styles.icon} />
        <span>Online</span>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Student */}
      <div className={styles.studentLabel}>Sinh viên</div>
      <div className={styles.studentName}>{student}</div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.detailBtn} onClick={onView}>
          <HiEye /> Xem chi tiết 
        </button>
      </div>
    </div>
  );
}
