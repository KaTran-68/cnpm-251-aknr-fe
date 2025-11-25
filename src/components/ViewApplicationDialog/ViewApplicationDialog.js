import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";
import styles from "./ViewApplicationDialog.module.scss";

export default function ViewApplicationDialog({ data, onClose }) {
  const statusKey = data?.statusKey || (data?.status || "").toLowerCase();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* HEADER */}
        <div className={styles.header}>
          <h2>Chi tiết đơn đăng kí Tutor</h2>
          <span className={`${styles.badge} ${styles[statusKey]}`}>
            {data.status}
          </span>
        </div>

        {/* AVATAR */}
        <div className={styles.avatarBox}>
          <img src={data.avatar} alt="avatar" />
        </div>

        {/* --------- SECTION 1: THÔNG TIN CÁ NHÂN --------- */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FaUser />
            <span>Thông tin cá nhân</span>
          </div>

          <div className={styles.infoGrid}>
            <div>
              <label>Họ và tên</label>
              <p>{data.name}</p>
            </div>

            <div>
              <label>MSSV/MSCB</label>
              <p>{data.id}</p>
            </div>
          </div>
        </div>

        {/* --------- SECTION 2: MÔ TẢ --------- */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            📚
            <span>Mô tả</span>
          </div>

          <label>Mô tả của tutor</label>
          <p>{data.description}</p>
        </div>

        {/* --------- SECTION 3: TIẾN TRÌNH --------- */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <FaCalendarAlt />
            <span>Tiến trình xử lý hồ sơ</span>
          </div>

          <label>Ngày nộp</label>
          <p>{data.submitDate}</p>
        </div>

        {/* --------- SECTION 4: LIÊN HỆ --------- */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            ✉️
            <span>Liên hệ</span>
          </div>

          <p><FaEnvelope /> {data.email}</p>
          <p><FaPhone /> {data.phone}</p>
        </div>

      </div>
    </div>
  );
}
