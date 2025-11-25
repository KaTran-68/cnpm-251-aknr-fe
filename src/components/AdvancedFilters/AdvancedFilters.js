import styles from "./AdvancedFilters.module.scss";
import { APP_STATUSES } from "../../constants/statuses";

export default function AdvancedFilters({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>

        <h4 className={styles.title}>Bộ lọc nâng cao</h4>

        {/* ----- TRẠNG THÁI ----- */}
        <div className="mb-3">
          <label className={styles.label}>Trạng thái</label>
          <select className={styles.select}>
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
          />

          <input
            type="date"
            className={styles.dateInput}
            placeholder="Đến"
          />
        </div>

        {/* ----- BUTTONS ----- */}
        <div className={styles.btnRow}>
          <button className={styles.clearBtn} onClick={onClose}>✕ Bỏ chọn</button>
          <button className={styles.applyBtn}>Áp dụng bộ lọc</button>
        </div>

      </div>
    </div>
  );
}
