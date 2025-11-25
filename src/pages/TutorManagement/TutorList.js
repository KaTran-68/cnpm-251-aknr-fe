import { useState } from "react";
import styles from "./TutorList.module.scss";
import Header from '../../components/Header/Header';

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

  return (
    <div className={styles.container}>
      
      <Header />
    {/* BLUE TOP AREA */}
      <div className={styles.topArea}>
        <h2 className={styles.pageTitle}>Quản lý Tutor</h2>

      {/* ---------------- STATISTIC CARDS ---------------- */}
      <div className={styles.statsRow}>
        {[
          { title: "Tổng đơn", num: 10, icon: <FaClipboardList />, color: "Blue" },
          { title: "Chờ duyệt", num: 2, icon: <FaClock />, color: "Yellow" },
          { title: "Đã duyệt", num: 7, icon: <FaCheckCircle />, color: "Green" },
          { title: "Từ chối", num: 1, icon: <FaTimesCircle />, color: "Red" },
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
        <ApplicationTable onView={(row) => setViewData(row)} />

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
  );
}
