import React, { useEffect, useState } from "react";
import styles from "./RegisterSchedule_SV.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getClassData } from "../../services/api";
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

function RegisterSchedule_SV() {
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClasses() {
      try {
        const data = await getClassData();
        if (data.success) {
          setSlots(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
        setSlots(MOCK_SLOTS); // fallback to mock data on error
      }
    }
    fetchClasses();
  }, []);

  const filtered = slots.filter((c) => {
    if (c.status === "Available") return true;
    return false;
  });

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

  // Lấy danh sách môn học chung cho tất cả slot
  const subjects = Array.from(new Set(slots.map(item => item.subject).filter(Boolean)));

  return (

    <div className={styles.page}>
      <Header />
      <div className={styles.header}>
        <h1>Đăng ký lịch học</h1>
      </div>

      <div className={styles.frameBg}>
        <div className={styles.statsCard}>
          <div className={styles.statsTitle}>Tổng số lớp</div>
          <div className={styles.statsValue}>{filtered.length}</div>
        </div>

        <div className={styles.controls}>
          <input placeholder="Tìm kiếm lớp học" className={styles.search} />
          <button className={styles.pill}>Tất cả môn học</button>
          <button className={styles.pill}>Ngày học trong tuần</button>
        </div>

        <div className={styles.grid}>
          {filtered.map((s,index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.date}>Ngày: {s.date}</div>
                <div className={styles.tag}> </div>
              </div>

              <div className={styles.meta}>
                <div>📅 {getWeekday(s.date)} {s.time}</div>
                <div>💻 {s.location}</div>
              </div>

              <div className={styles.sep} />

              <div className={styles.tutorLabel}>Tutor</div>
              <div className={styles.tutorName}>{s.tutor}</div>

              <label className={styles.chooseLabel}>Chọn môn</label>
              <select
                key={index}
                className={styles.input}
                value={selected[index]}
                onChange={(e) => handleChange(index, e.target.value)}
              >
                <option value="">Chọn môn học</option>
                {subjects.length > 0
                  ? subjects.map((subject, idx) => (
                      <option key={index + '-' + idx} value={subject}>{subject}</option>
                    ))
                  : <option value="Giải tích 1">Giải tích 1</option>
                }
              </select>

              <button
                className={styles.registerBtn}
                onClick={() => handleRegister(index)}
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



export default RegisterSchedule_SV