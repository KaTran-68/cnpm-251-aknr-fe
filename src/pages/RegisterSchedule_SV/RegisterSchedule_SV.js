import React, { useState } from "react";
import styles from "./RegisterSchedule_SV.module.scss";
import { useNavigate } from "react-router-dom";

/**
 * RegisterSchedule page - demo implementation based on pasted2.txt visual.
 * This page is shown after clicking "Đăng ký lịch học".
 */

const MOCK_SLOTS = [
  {
    id: "s1",
    date: "24/11/2025",
    dayTime: "Thứ 2, 7:00-8:30PM",
    mode: "Online",
    tutor: "Nguyễn Văn A",
  },
  {
    id: "s2",
    date: "26/11/2025",
    dayTime: "Thứ 4, 7:00-8:30PM",
    mode: "Online",
    tutor: "Nguyễn Văn A",
  },
  {
    id: "s3",
    date: "28/11/2025",
    dayTime: "Thứ 6, 7:00-8:30PM",
    mode: "Online",
    tutor: "Nguyễn Văn A",
  },
  {
    id: "s4",
    date: "28/11/2025",
    dayTime: "Thứ 6, 9:00-11:00PM",
    mode: "Online",
    tutor: "Nguyễn Văn A",
  },
];

export default function RegisterSchedule() {
  const [slots] = useState(MOCK_SLOTS);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  function handleChange(slotId, value) {
    setSelected((s) => ({ ...s, [slotId]: value }));
  }

  function handleRegister(slotId) {
    const subject = selected[slotId];
    if (!subject || subject.trim() === "") {
      alert("Vui lòng nhập/ chọn môn muốn đăng ký");
      return;
    }
    // demo success
    alert(`Đã đăng ký slot ${slotId} với môn: ${subject}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Đăng ký lịch học</h1>
      </div>

      <div className={styles.frameBg}>
        <div className={styles.statsCard}>
          <div className={styles.statsTitle}>Tổng số lớp</div>
          <div className={styles.statsValue}>{slots.length}</div>
        </div>

        <div className={styles.controls}>
          <input placeholder="Tìm kiếm lớp học" className={styles.search} />
          <button className={styles.pill}>Tất cả môn học</button>
          <button className={styles.pill}>Ngày học trong tuần</button>
        </div>

        <div className={styles.grid}>
          {slots.map((s) => (
            <div key={s.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.date}>Ngày: {s.date}</div>
                <div className={styles.tag}> </div>
              </div>

              <div className={styles.meta}>
                <div>📅 {s.dayTime}</div>
                <div>💻 {s.mode}</div>
              </div>

              <div className={styles.sep} />

              <div className={styles.tutorLabel}>Tutor</div>
              <div className={styles.tutorName}>{s.tutor}</div>

              <label className={styles.chooseLabel}>Chọn môn</label>
              <input
                className={styles.input}
                placeholder={
                  s.id === "s1" ? "Giải tích 1" : "Nhập môn muốn học"
                }
                value={selected[s.id] || ""}
                onChange={(e) => handleChange(s.id, e.target.value)}
              />

              <button
                className={styles.registerBtn}
                onClick={() => handleRegister(s.id)}
              >
                Đăng ký
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
