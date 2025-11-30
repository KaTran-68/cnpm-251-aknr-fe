import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import TopBar from "../../components/layout/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./ConfirmSchedule.module.scss";
import { getClassData } from "../../services/api";

const ConfirmSchedule = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getClassData();
        if (response.success) {
          console.log(response.data);
          // Filter only "Pending" status
          const pendingClasses = response.data.filter(
            item => item.status === "Pending" || item.status === "pending"
          );
          setClassData(pendingClasses);
        } else {
          console.log("error fetching data");
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleConfirm = (index) => {
    // Remove the item from the list
    const newData = classData.filter((_, i) => i !== index);
    setClassData(newData);
    
    // Show notification
    setNotification({
      show: true,
      message: "Đã xác nhận lịch dạy thành công!",
      type: "success"
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleReject = (index) => {
    // Remove the item from the list
    const newData = classData.filter((_, i) => i !== index);
    setClassData(newData);
    
    // Show notification
    setNotification({
      show: true,
      message: "Đã từ chối lịch dạy!",
      type: "error"
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const filteredData = classData.filter((item) =>
    item.student?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <Header />

      {notification.show && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.headerSection}>
          <button className={styles.btnBack} onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h1 className={styles.title}>XÁC NHẬN LỊCH DẠY</h1>
        </div>

        <div className={styles.heroSection}>


          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.tableCard}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                Đang tải dữ liệu...
              </div>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Sinh viên</th>
                      <th>Môn học</th>
                      <th>Ngày học</th>
                      <th>Giờ học</th>
                      <th>Địa điểm / địa chỉ truy cập</th>
                      <th>Xác nhận</th>
                      <th>Từ chối</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.student}</td>
                          <td>{row.subject}</td>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.location}</td>
                          <td>
                            <button 
                              className={styles.btnConfirm}
                              onClick={() => handleConfirm(index)}
                            >
                              Xác nhận
                            </button>
                          </td>
                          <td>
                            <button 
                              className={styles.btnReject}
                              onClick={() => handleReject(index)}
                            >
                              Từ chối
                            </button>
                          </td>
                          <td>
                            <button className={styles.btnReject}>Từ chối</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>
                          Không có lịch dạy cần xác nhận
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmSchedule;
