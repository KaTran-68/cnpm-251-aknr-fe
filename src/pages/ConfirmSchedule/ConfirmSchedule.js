import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layout/TopBar/TopBar";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./ConfirmSchedule.module.scss";

const sampleData = [
  {
    id: 1,
    student: "Nguyễn Văn A",
    subject: "Giải tích 1",
    date: "3/10/2025",
    time: "8:00 - 10:00",
    location: "Khu tự học KMS H6",
  },
  {
    id: 2,
    student: "Nguyễn Văn A",
    subject: "Vật lý 1",
    date: "4/10/2025",
    time: "14:00 - 16:00",
    location: "Khu tự học tầng 3 H3",
  },
  {
    id: 3,
    student: "Nguyễn Văn B",
    subject: "Giải tích 1",
    date: "3/10/2025",
    time: "8:00 - 10:00",
    location: "Thư viện H1",
  },
  {
    id: 4,
    student: "Nguyễn Văn B",
    subject: "Đại số",
    date: "3/10/2025",
    time: "18:00 - 20:00",
    location: "Thư viện H1",
  },
];

const ConfirmSchedule = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = sampleData.filter((item) =>
    item.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <TopBar />

      <div className={styles.container}>
        <div className={styles.headerSection}>
          <button className={styles.btnBack} onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h1 className={styles.title}>HCMUT_TSS</h1>
          <div className={styles.subtitle}>Tutor Support System</div>
        </div>

        <div className={styles.heroSection}>
          <h2 className={styles.pageTitle}>XÁC NHẬN LỊCH DẠY</h2>

          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Sinh viên</th>
                    <th>Môn học</th>
                    <th>Ngày học</th>
                    <th>Giờ học</th>
                    <th>Địa điểm / địa chỉ truy cập</th>
                    <th>Xác nhận</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.student}</td>
                      <td>{row.subject}</td>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                      <td>{row.location}</td>
                      <td>
                        <button className={styles.btnConfirm}>Xác nhận</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmSchedule;
