import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./ApplicationTable.module.scss";
import { APP_STATUSES } from "../../constants/statuses";

export default function ApplicationTable({ onView }) {
  const data = [
    {
      id: 1,
      mssv: "xxxxxxx",
      name: "Nguyễn Văn A",
      statusKey: APP_STATUSES.PENDING.key,
      status: APP_STATUSES.PENDING.label,
      submitDate: "30/9/2025, 4:00 PM",
      approveDate: "1/10/2025, 9:00 AM",
    },
    {
      id: 2,
      mssv: "xxxxxxx",
      name: "Nguyễn Văn A",
      statusKey: APP_STATUSES.APPROVED.key,
      status: APP_STATUSES.APPROVED.label,
      submitDate: "30/9/2025, 7:00 AM",
      approveDate: "1/10/2025, 9:00 AM",
    },
    {
      id: 3,
      mssv: "xxxxxxx",
      name: "Nguyễn Văn A",
      statusKey: APP_STATUSES.REJECTED.key,
      status: APP_STATUSES.REJECTED.label,
      submitDate: "30/9/2025, 9:00 AM",
      approveDate: "1/10/2025, 9:00 AM",
    },
  ];

  const renderStatus = (statusKey, label) => {
    return (
      <span className={`${styles.status} ${styles[statusKey]}`}>
        {label}
      </span>
    );
  };

  return (
    <div className={styles.wrapper}>
      <table className={`table table-bordered ${styles.table}`}>
        <thead>
          <tr>
            <th>MSSV/MSCB</th>
            <th>Họ và tên</th>
            <th>Trạng thái</th>
            <th>Ngày nộp đơn</th>
            <th>Ngày duyệt đơn</th>
            <th>Hoạt động</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.mssv}</td>
              <td>{row.name}</td>
              <td>{renderStatus(row.statusKey, row.status)}</td>
              <td>{row.submitDate}</td>
              <td>{row.approveDate}</td>

              <td className={styles.actionCol}>
                <button
                  className={`${styles.actionBtn} ${styles.view}`}
                  onClick={() => onView(row)}
                >
                  <FaEye /> Xem
                </button>

                {row.statusKey === APP_STATUSES.PENDING.key && (
                  <>
                    <button className={`${styles.actionBtn} ${styles.approve}`}>
                      <FaCheckCircle /> Duyệt
                    </button>
                    <button className={`${styles.actionBtn} ${styles.reject}`}>
                      <FaTimesCircle /> Từ chối
                    </button>
                  </>
                )}
              </td>
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
  );
}
