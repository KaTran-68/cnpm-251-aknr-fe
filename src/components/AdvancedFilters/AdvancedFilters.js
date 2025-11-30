import { useState } from "react";
import styles from "./AdvancedFilters.module.scss";
import { APP_STATUSES } from "../../constants/statuses";

export default function AdvancedFilters({ onClose, onApply }) {
  const [filters, setFilters] = useState({
    status: "",
    dateFrom: "",
    dateTo: ""
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({
      status: "",
      dateFrom: "",
      dateTo: ""
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>

        <h4 className={styles.title}>Bộ lọc nâng cao</h4>

        {/* ----- TRẠNG THÁI ----- */}
        <div className="mb-3">
          <label className={styles.label}>Trạng thái</label>
          <select 
            className={styles.select}
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Chọn trạng thái</option>
            {Object.values(APP_STATUSES).map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* ----- NGÀY NỘP ĐƠN ----- */}
        <div className={styles.dateGroup}>
          <label className={styles.label}>Ngày nộp đơn</label>

          <input
            type="date"
            className={styles.dateInput}
            placeholder="Từ"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          />

          <input
            type="date"
            className={styles.dateInput}
            placeholder="Đến"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          />
        </div>

        {/* ----- BUTTONS ----- */}
        <div className={styles.btnRow}>
          <button className={styles.clearBtn} onClick={handleClear}>✕ Bỏ chọn</button>
          <button className={styles.applyBtn} onClick={handleApply}>Áp dụng bộ lọc</button>
        </div>

      </div>
    </div>
  );
}
