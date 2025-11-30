import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./ApplicationTable.module.scss";
import { APP_STATUSES } from "../../constants/statuses";

export default function ApplicationTable({ applications = [], onView, onApprove, onReject }) {
  // Map status from API to display format
  const getStatusInfo = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "pending") return { key: APP_STATUSES.PENDING.key, label: APP_STATUSES.PENDING.label };
    if (statusLower === "approved") return { key: APP_STATUSES.APPROVED.key, label: APP_STATUSES.APPROVED.label };
    if (statusLower === "rejected") return { key: APP_STATUSES.REJECTED.key, label: APP_STATUSES.REJECTED.label };
    return { key: "pending", label: status };
  };

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
          {applications.length > 0 ? (
            applications.map((row, index) => {
              const statusInfo = getStatusInfo(row.status);
              return (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{renderStatus(statusInfo.key, statusInfo.label)}</td>
                  <td>{row.daySubmit}</td>
                  <td>{row.dayRespond || 'Chưa duyệt'}</td>

                  <td className={styles.actionCol}>
                    <button
                      className={`${styles.actionBtn} ${styles.view}`}
                      onClick={() => onView(row)}
                    >
                      <FaEye /> Xem
                    </button>

                    {statusInfo.key === APP_STATUSES.PENDING.key && (
                      <>
                        <button 
                          className={`${styles.actionBtn} ${styles.approve}`}
                          onClick={() => onApprove(index)}
                        >
                          <FaCheckCircle /> Duyệt
                        </button>
                        <button 
                          className={`${styles.actionBtn} ${styles.reject}`}
                          onClick={() => onReject(index)}
                        >
                          <FaTimesCircle /> Từ chối
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                Không có đơn đăng ký
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
  );
}
