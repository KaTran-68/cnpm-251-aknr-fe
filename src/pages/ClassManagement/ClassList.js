import { useState } from "react";
import styles from "./ClassList.module.scss";
import Header from '../../components/Header/Header';
import {
  FaCheckCircle,
    FaBookOpen,
  FaRegClock,
    FaUsers
} from "react-icons/fa";

import ClassCard from "../../components/ClassCard/ClassCard";
import ClassDetails from "../../components/ClassDetails/ClassDetails";
import { CLASS_STATUSES } from "../../constants/statuses";

export default function ClassList() {
  const [selectedClass, setSelectedClass] = useState(null);

//   const classes = [
//   { name: "Giải tích 1", tutor: "Nguyễn Văn A", status: "upcoming", student: "Nguyễn Văn B" },
//   { name: "Giải tích 1", tutor: "Nguyễn Văn A", status: "ongoing", student: "Nguyễn Văn B" },
//   { name: "Giải tích 1", tutor: "Nguyễn Văn C", status: "ended", student: "Nguyễn Văn C" },
// ];
const classes = [
  { name: "Giải tích 1", tutor: "Nguyễn Văn A", status: CLASS_STATUSES.UPCOMING.label, statusKey: CLASS_STATUSES.UPCOMING.key, student: "Nguyễn Văn B" },
  { name: "Giải tích 1", tutor: "Nguyễn Văn A", status: CLASS_STATUSES.ONGOING.label, statusKey: CLASS_STATUSES.ONGOING.key, student: "Nguyễn Văn B" },
  { name: "Giải tích 1", tutor: "Nguyễn Văn C", status: CLASS_STATUSES.ENDED.label, statusKey: CLASS_STATUSES.ENDED.key, student: "Nguyễn Văn C" },
  { name: "Giải tích 1", tutor: "Nguyễn Văn D", status: CLASS_STATUSES.ENDED.label, statusKey: CLASS_STATUSES.ENDED.key, student: "Nguyễn Văn C" }
];



  return (
    <div className={styles.container}>
      <Header />

      {/* BLUE TOP AREA */}
      <div className={styles.topArea}>
        <h2 className={styles.pageTitle}>Quản lý lớp học</h2>

        {/* ----- STATISTIC CARDS (Unified Format) ----- */}
        <div className={styles.statsRow}>
          {[
            { title: "Tổng số lớp", num: 4, icon: <FaBookOpen />, color: "Blue" },
            { title: "Sắp diễn ra", num: 1, icon: <FaRegClock />, color: "Purple" },
            { title: "Đang diễn ra", num: 2, icon: <FaUsers />, color: "Green" },
            { title: "Đã kết thúc", num: 1, icon: <FaCheckCircle />, color: "Red" },
          ].map((item, idx) => (
            <div className={styles.statCard} key={idx}>
              <div className={styles.statInfo}>
                <p className={styles.statTitle}>{item.title}</p>
                <span className={styles.statNumber}>{item.num}</span>
              </div>

              <div className={`${styles.iconWrapper} ${styles[`icon${item.color}`]}`}>
                <span className={styles.iconMain}>{item.icon}</span>
              </div>
            </div>
          ))}
        </div>



        {/* WHITE CONTENT BOX */}
        <div className={styles.whiteBox}>
          {/* Filters */}
          <div className={styles.filterRow}>
            <input className={styles.input} placeholder="Tìm kiếm lớp học..." />

            <select className={styles.select}>
              <option>Tất cả tutor</option>
            </select>

            <select className={styles.select}>
              <option>Tất cả môn học</option>
            </select>

            <button className={styles.searchBtn}>Tìm kiếm</button>
          </div>

        {/* Class Cards */}
        <div className={styles.cardGrid}>
          {classes.map((cls, index) => (
            <ClassCard
              key={index}
              data={cls}
              onView={() => setSelectedClass(cls)}
              />
          ))}
        </div>
      </div>

      </div>
      {selectedClass && (
        <ClassDetails
          data={selectedClass}
          onClose={() => setSelectedClass(null)}
          />
      )}
    </div>
  );
}
