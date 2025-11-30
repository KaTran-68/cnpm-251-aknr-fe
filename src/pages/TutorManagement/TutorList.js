import { useState, useEffect } from "react";
import styles from "./TutorList.module.scss";
import Header from '../../components/Header/Header';
import { getApplicationData } from "../../services/api";

import {
  FaFilter,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaClock,
} from "react-icons/fa";

import ApplicationTable from "../../components/ApplicationTable/ApplicationTable";
import AdvancedFilters from "../../components/AdvancedFilters/AdvancedFilters";
import ViewApplicationDialog from "../../components/ViewApplicationDialog/ViewApplicationDialog";

export default function TutorList() {
  const [showFilter, setShowFilter] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getApplicationData();
        if (response.success) {
          console.log(response.data);
          setApplications(response.data);
        } else {
          console.log("error fetching application data");
        }
      } catch (error) {
        console.error("Failed to fetch application data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleApprove = (index) => {
    const updatedApplications = [...applications];
    updatedApplications[index] = {
      ...updatedApplications[index],
      status: "Approved",
      dayRespond: new Date().toLocaleDateString('en-GB')
    };
    setApplications(updatedApplications);
    showNotification("Đã duyệt đơn thành công!", "success");
  };

  const handleReject = (index) => {
    const updatedApplications = [...applications];
    updatedApplications[index] = {
      ...updatedApplications[index],
      status: "Rejected",
      dayRespond: new Date().toLocaleDateString('en-GB')
    };
    setApplications(updatedApplications);
    showNotification("Đã từ chối đơn!", "error");
  };

  // Calculate statistics
  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === "Pending" || app.status === "pending").length,
    approved: applications.filter(app => app.status === "Approved" || app.status === "approved").length,
    rejected: applications.filter(app => app.status === "Rejected" || app.status === "rejected").length,
  };

  // Filter applications by search term
  const filteredApplications = applications.filter(app =>
    app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.mssv?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      
      {notification.show && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}
      
      <div className={styles.container}>
        {/* BLUE TOP AREA */}
        <div className={styles.topArea}>
          <h2 className={styles.pageTitle}>Quản lý Tutor</h2>

          {/* ---------------- STATISTIC CARDS ---------------- */}
          <div className={styles.statsRow}>
            {[
              { title: "Tổng đơn", num: stats.total, icon: <FaClipboardList />, color: "Blue" },
              { title: "Chờ duyệt", num: stats.pending, icon: <FaClock />, color: "Yellow" },
              { title: "Đã duyệt", num: stats.approved, icon: <FaCheckCircle />, color: "Green" },
              { title: "Từ chối", num: stats.rejected, icon: <FaTimesCircle />, color: "Red" },
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

        {/* ---------------- SEARCH + TABLE WRAPPER ---------------- */}
        <div className={styles.whiteBox}>
          {/* Search Row */}
          <div className={styles.searchRow}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Tìm kiếm theo tên hoặc MSSV..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className={styles.filterBtn}
              onClick={() => setShowFilter(true)}
            >
              <FaFilter className={styles.filterIcon} />
              Bộ lọc nâng cao
            </button>
          </div>

          {/* ---------------- TABLE ---------------- */}
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              Đang tải dữ liệu đơn đăng ký...
            </div>
          ) : (
            <ApplicationTable 
              applications={filteredApplications}
              onView={(row) => setViewData(row)}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}

          {/* Filter Sidebar */}
          {showFilter && <AdvancedFilters onClose={() => setShowFilter(false)} />}

          {/* View Detail Popup */}
          {viewData && (
            <ViewApplicationDialog
              data={viewData}
              onClose={() => setViewData(null)}
            />
          )}
        </div>
      </div>
    </div>
    </>
  );
}
