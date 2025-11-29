import React from "react";
import styles from "./Schedule_ClassCard.module.scss";
import { HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
/**
 * Simple class card used in ScheduleView
 */
export default function ClassCard({ cls }) {
  const navigate = useNavigate();
  const statusLabel = {
    "Upcoming": { text: "Sắp diễn ra", className: styles.tagUpcoming },
    "Done": { text: "Đã kết thúc", className: styles.tagFinished },
    "Pending": { text: "Chờ xác nhận", className: styles.tagPending },
    "Cancel": { text: "Đã bị hủy", className: styles.tagCancel },
  }[cls.status] || { text: "", className: "" };
  const getWeekday = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const date = new Date(year, month - 1, day);

    const days = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7"
    ];
    return days[date.getDay()];
  };


  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{cls.subject}</div>
        {statusLabel.text && (
          <div className={`${styles.status} ${statusLabel.className}`}>
            {statusLabel.text}
          </div>
        )}
      </div>

      <div className={styles.date}>
        {cls.date}
      </div>

      <div className={styles.meta}>
        <div>
          📅 {getWeekday(cls.date)}, {cls.time}
        </div>
        <div>
          💻 {cls.location}
        </div>
      </div>


      <div className={styles.sep} />
      <div className={styles.tutorLabel}>Tutor</div>
      <div className={styles.tutor}>{cls.tutor}</div>
      <button className={styles.viewBtn} onClick={() => navigate("/class")}>
        <HiEye /> Xem chi tiết
      </button>
    </div>
  );
}
