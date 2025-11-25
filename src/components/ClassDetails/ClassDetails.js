import { FaBookOpen, FaEnvelope, FaPhone } from "react-icons/fa";
import styles from "./ClassDetails.module.scss";
import { FaUser } from "react-icons/fa6";

export default function ClassDetails({ data, onClose }) {
  if (!data) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>

        {/* ===== TITLE ===== */}
        <div className={styles.titleRow}>
          <div>
            <div className={styles.titleLine}>
              <h2 className={styles.classTitle}>Lớp {data.name}</h2>
            </div>
            <p className={styles.classSub}>Giải tích 1
              <div className={`${styles.statusTag} ${styles[data.statusKey]}`}>
                {data.status}
              </div>
            </p>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        {/* ===== THÔNG TIN LỚP HỌC ===== */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaBookOpen />
            <span>Thông tin lớp học</span>
          </div>

          <div className={styles.grid}>
            <div>
              <p className={styles.label}>Sinh viên đăng kí</p>
              <p>{data.student || "Nguyễn Văn C"}</p>
            </div>

            <div>
              <p className={styles.label}>Địa điểm học</p>
              <p>📹 Online</p>
            </div>

            <div>
              <p className={styles.label}>MSSV đăng kí</p>
              <p>{data.studentId || "2412341"}</p>
            </div>

            <div>
              <p className={styles.label}>Lịch học</p>
              <p>Thứ 2, 20/9/2025, 7:00 AM - 9:00 AM</p>
            </div>

            <div className={styles.fullRow}>
              <p className={styles.label}>Mô tả</p>
              <p>Dành cho các bạn muốn 10+</p>
            </div>
          </div>
        </div>

        {/* ===== TUTOR ===== */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaUser />
            <span>Tutor</span>
          </div>

          <div className={styles.grid}>
            <div>
              <p className={styles.label}>Họ và tên</p>
              <p>{data.tutor}</p>
            </div>

            <div>
              <p className={styles.label}>MSSV/MSCB</p>
              <p>2213435</p>
            </div>

            <div className={styles.fullRow}>
              <p className={styles.label}>Email</p>
              <p>
                <FaEnvelope className={styles.icon} />
                a.nguyen12345@hcmut.edu.vn
              </p>
            </div>

            <div className={styles.fullRow}>
              <p className={styles.label}>Số điện thoại</p>
              <p>
                <FaPhone className={styles.icon} />
                0123456789
              </p>
            </div>

            <div className={styles.fullRow}>
              <p className={styles.label}>Mô tả</p>
              <p>Giải tích 1, Vật lý 1, Kỹ thuật lập trình</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
