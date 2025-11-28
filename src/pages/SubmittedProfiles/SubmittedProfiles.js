import React, { useState, useEffect } from 'react';
import styles from './SubmittedProfiles.module.scss';
import { FaClipboardList, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import TutorRegDetails from '../../components/TutorRegDetails/TutorRegDetails';
import { APP_STATUSES } from '../../constants/statuses';
import Header from '../../components/Header/Header';
import { getApplicationData } from '../../services/api';

export default function SubmittedProfiles() {
  const [viewData, setViewData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch application data from API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await getApplicationData();
        
        // Handle different response structures
        const data = Array.isArray(response) ? response : 
                     (response?.data && Array.isArray(response.data)) ? response.data : 
                     [];
        
        setApplications(data);
      } catch (error) {
        console.error('Error fetching application data:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Calculate statistics
  const stats = [
    { title: 'Tổng đơn', num: applications.length, icon: <FaClipboardList /> },
    { title: 'Chờ duyệt', num: applications.filter(app => app.status?.toLowerCase() === 'pending').length, icon: <FaClock /> },
    { title: 'Đã duyệt', num: applications.filter(app => app.status?.toLowerCase() === 'approved').length, icon: <FaCheckCircle /> },
    { title: 'Từ chối', num: applications.filter(app => app.status?.toLowerCase() === 'rejected').length, icon: <FaTimesCircle /> },
  ];

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
        <div className={styles.tableHeader}>
          Hiển thị 1-{applications.length} của {applications.length} đơn
        </div>
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
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : applications.length > 0 ? (
              applications.map((app, index) => {
                const statusKey = app.status?.toLowerCase() || 'pending';
                const statusInfo = Object.values(APP_STATUSES).find(s => s.key === statusKey);
                
                return (
                  <tr key={index}>
                    <td>{app.daySubmit || 'N/A'}</td>
                    <td>{app.dayRespond || 'Chưa duyệt'}</td>
                    <td>
                      <span className={`${styles.status} ${styles[statusKey]}`}>
                        {statusInfo?.label || app.status}
                      </span>
                    </td>
                    <td>
                      <button className={styles.viewBtn} onClick={() => setViewData(app)}>
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  Không có đơn đăng ký nào
                </td>
              </tr>
            )}
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
