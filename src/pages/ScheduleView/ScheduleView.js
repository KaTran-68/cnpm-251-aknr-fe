import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ScheduleView.module.scss";
import StatsCard from "../../components/StatsCard/StatsCard";
import ScheduleClassCard from "../../components/Schedule_ClassCard/Schedule_ClassCard";
import Header from "../../components/Header/Header";
import { getClassData } from "../../services/api";
/**
 * ScheduleView - updated: khi nhấn nút 'Đăng ký lịch học' sẽ navigate tới /register-schedule
 */

const MOCK_CLASSES = [
  {
    id: "c1",
    title: "Lớp Vật lý 1",
    dateLabel: "Ngày 21/11/2025",
    dayTime: "Thứ 6, 7:00-8:30PM",
    mode: "Online",
    tutor: "Nguyễn Văn A",
    status: "upcoming",
  },
  {
    id: "c2",
    title: "Lớp Giải tích 1",
    dateLabel: "19/11/2025",
    dayTime: "Thứ 4, 7:00-8:30PM",
    mode: "Online",
    tutor: "Nguyễn Văn A",
    status: "live",
  },
  {
    id: "c3",
    title: "Hệ thống số",
    dateLabel: "17/11/2025",
    dayTime: "Thứ 2, 7:00-8:30PM",
    mode: "Online",
    tutor: "Nguyễn Văn A",
    status: "pending",
  },
];

export default function ScheduleView() {
  const [classes, setClasses] = useState([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const RegisterTutor = localStorage.getItem('RegisterTutor');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClasses() {
      try {
        const data = await getClassData();
        if (data.success) {
          setClasses(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
        setClasses(MOCK_CLASSES); // fallback to mock data on error
      }}
    fetchClasses();
  }, []);

  
  const filtered = classes.filter((c) => {
    if (c.status === "Available") return false;
    if (RegisterTutor && c.tutorId !== RegisterTutor) return false;
    return true;
  });
  
  const stats = {
    total: filtered.length,
    upcoming: filtered.filter((c) => c.status === "Upcoming").length,
    cancel: filtered.filter((c) => c.status === "Cancel").length,
    finished: filtered.filter((c) => c.status === "Done").length,
    pending: filtered.filter((c) => c.status === "Pending").length,
  };
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.frameBg}>
        <div className={styles.topBar}>

          <div className={styles.titleWrap}>
            <div className={styles.pageTitle}>KHÔNG GIAN HỌC</div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <StatsCard title="Tổng số lớp" value={stats.total} />
          <StatsCard title="Sắp diễn ra" value={stats.upcoming} tone="purple" />
          <StatsCard title="Đã kết thúc" value={stats.finished} tone="red" />
          <StatsCard title="Chờ xác nhận" value={stats.pending} tone="yellow" />
          <StatsCard title="Đã bị hủy" value={stats.cancel} tone="green" />
        </div>

        <div className={styles.controls}>
          <input
            className={styles.searchInput}
            placeholder="Tìm kiếm lớp học"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Tìm kiếm lớp học"
          />
          <div className={styles.pills}>
            <button className={styles.pill}>Tất cả môn học</button>
            <button className={styles.pill}>Ngày học trong tuần</button>
            <select
              className={styles.select}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tình trạng: All</option>
              <option value="Upcoming">Sắp diễn ra</option>
              <option value="Done">Đã kết thúc</option>
              <option value="Pending">Chờ xác nhận</option>
              <option value="Cancel">Đã bị hủy</option>
            </select>
          </div>
        </div>

        <div className={styles.cardsArea}>
          {filtered.map((c) => (
            <ScheduleClassCard key={c.id} cls={c} />
          ))}
        </div>

        <div className={styles.footerAction}>
          {/* navigate to register page */}
          <button
            className={styles.registerBtn}
            onClick={() => navigate("/register-schedule-sv")}
          >
            Đăng ký lịch học
          </button>
        </div>
      </div>
    </div>
  );
}
