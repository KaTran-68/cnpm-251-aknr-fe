import React, { useState } from 'react';
import styles from './SubmittedProfiles.module.scss';
import { FaClipboardList, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import TutorRegDetails from '../../components/TutorRegDetails/TutorRegDetails';
import { APP_STATUSES } from '../../constants/statuses';
import Header from '../../components/Header/Header';

export default function SubmittedProfiles() {
  const [viewData, setViewData] = useState(null);

  const stats = [
    { title: 'Tổng đơn', num: 10, icon: <FaClipboardList /> },
    { title: 'Chờ duyệt', num: 2, icon: <FaClock /> },
    { title: 'Đã duyệt', num: 7, icon: <FaCheckCircle /> },
    { title: 'Từ chối', num: 1, icon: <FaTimesCircle /> },
  ];

  const rows = new Array(7).fill(0).map((_, i) => ({
    id: i + 1,
    submitDate: '30/9/2025, 4:00 PM',
    approveDate: '1/10/2025, 9:00 AM',
    statusKey: i % 3 === 0 ? 'approved' : i % 3 === 1 ? 'pending' : 'rejected', // Original statusKey assignment
  }));

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.topArea}>
        <h2 className={styles.pageTitle}>Xem hồ sơ đã nộp</h2>
      </div>

      <div className={styles.statsRow}>
        {stats.map((s, idx) => {
          const colorClass = idx === 0 ? styles.iconBlue : idx === 1 ? styles.iconYellow : idx === 2 ? styles.iconGreen : styles.iconRed;
          return (
            <div className={styles.statCard} key={idx}>
              <div className={styles.statInfo}>
                <div className={styles.statTitle}>{s.title}</div>
                <div className={styles.statNumber}>{s.num}</div>
              </div>
              <div className={`${styles.iconWrapper} ${colorClass}`}>
                <div className={styles.iconMain}>{s.icon}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>Hiển thị 1-10 của 10 đơn</div>
        <table className={`table table-bordered ${styles.table}`}>
          <thead>
            <tr>
              <th>Ngày nộp đơn</th>
              <th>Ngày duyệt đơn</th>
              <th>Trạng thái</th>
              <th>Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.submitDate}</td>
                <td>{r.approveDate}</td>
                <td>{(() => {
                  const label = Object.values(APP_STATUSES).find(s => s.key === r.statusKey)?.label || r.statusKey;
                  return <span className={`${styles.status} ${styles[r.statusKey]}`}>{label}</span>
                })()}</td>
                <td><button className={styles.viewBtn} onClick={() => setViewData(r)}>Xem chi tiết</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button className={styles.pageBtn}>‹ Previous</button>
          <button className={`${styles.pageNumber} ${styles.active}`}>1</button>
          <button className={styles.pageNumber}>2</button>
          <button className={styles.pageBtn}>Next ›</button>
        </div>
      </div>

      {viewData && <TutorRegDetails data={viewData} onClose={() => setViewData(null)} />}
    </div>
  );
}
