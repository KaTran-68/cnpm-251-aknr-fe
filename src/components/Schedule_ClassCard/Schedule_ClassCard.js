import React from "react";
import styles from "./Schedule_ClassCard.module.scss";

/**
 * Simple class card used in ScheduleView
 */
export default function ClassCard({ cls }) {
  const statusLabel = {
    upcoming: { text: "Sắp diễn ra", className: styles.tagUpcoming },
    live: { text: "Đang diễn ra", className: styles.tagLive },
    finished: { text: "Đã kết thúc", className: styles.tagFinished },
    pending: { text: "Chờ xác nhận", className: styles.tagPending },
  }[cls.status] || { text: "", className: "" };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{cls.title}</div>
        {statusLabel.text && (
          <div className={`${styles.status} ${statusLabel.className}`}>
            {statusLabel.text}
          </div>
        )}
      </div>

      <div className={styles.date}>{cls.dateLabel}</div>

      <div className={styles.meta}>
        <div>📅 {cls.dayTime}</div>
        <div>💻 {cls.mode}</div>
      </div>

      <div className={styles.sep} />

      <div className={styles.tutorLabel}>Tutor</div>
      <div className={styles.tutor}>{cls.tutor}</div>

      <div className={styles.actions}>
        <button className={styles.viewBtn}>👁 Xem chi tiết</button>
      </div>
    </div>
  );
}
