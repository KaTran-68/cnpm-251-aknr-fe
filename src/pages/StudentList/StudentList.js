import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import TopBar from "../../components/layout/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import StudentDetailModal from "../../components/Common/StudentDetailModal/StudentDetailModal";
import styles from "./StudentList.module.scss";
import { getStudentData } from "../../services/api";

const StudentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [studyingStudents, setStudyingStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStudentData();
        if (response.success) {
          console.log(response.data);
          // Since API doesn't have status field, separate by startDay presence
          // Students with startDay are studying, others are registered
          const studying = response.data.filter(
            student => student.startDay && student.startDay !== ""
          );
          const registered = response.data.filter(
            student => !student.startDay || student.startDay === ""
          );
          setRegisteredStudents(registered);
          setStudyingStudents(studying);
        } else {
          console.log("error fetching student data");
        }
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleViewDetail = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const filteredRegistered = registeredStudents.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudying = studyingStudents.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <div style={{ padding: '40px', textAlign: 'center' }}>
            Đang tải dữ liệu sinh viên...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.container}>
        {/* <div className={styles.header}>
          <div className={styles.headerBox}>
            <h1 className={styles.title}>HCMUT_TSS</h1>
            <div className={styles.subtitle}>Tutor Support System</div>
          </div>
        </div> */}

        <div className={styles.contentArea}>
          <div className={styles.titleRow}>
            <button className={styles.btnBack} onClick={() => navigate(-1)}>
                ← Quay lại
            </button>
            <h2 className={styles.pageTitle}>Danh sách sinh viên</h2>
          </div>

          <div className={styles.searchRow}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table 1: Registered Students */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>Danh sách Sinh viên đăng ký</div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>MSSV</th>
                    <th>Khoa</th>
                    <th>Điểm TBTL</th>
                    <th>Thông tin thêm</th>
                    <th>Xác nhận</th>
                    <th>Từ chối</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistered.length > 0 ? (
                    filteredRegistered.map((student, index) => (
                      <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.sex}</td>
                        <td>{student.mssv}</td>
                        <td>{student.faculty}</td>
                        <td>{student.gpa}/4.0</td>
                        <td>{student.major || ''}</td>
                        <td>
                          <button className={styles.btnAccept}>Xác nhận</button>
                        </td>
                        <td>
                          <button className={styles.btnReject}>Từ chối</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center' }}>
                        Không có sinh viên đăng ký
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Currently Studying Students */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>Danh sách Sinh viên đang theo học</div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>MSSV</th>
                    <th>Khoa</th>
                    <th>Điểm TBTL</th>
                    <th>Email</th>
                    <th>SĐT</th>
                    <th>Xem thông tin chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudying.length > 0 ? (
                    filteredStudying.map((student, index) => (
                      <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.sex}</td>
                        <td>{student.mssv}</td>
                        <td>{student.faculty}</td>
                        <td>{student.gpa}/4.0</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>
                          <button
                            className={styles.btnDetail}
                            onClick={() => handleViewDetail(student)}
                          >
                            Thông tin chi tiết →
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center' }}>
                        Không có sinh viên đang theo học
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showModal && selectedStudent && (
        <StudentDetailModal student={selectedStudent} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default StudentList;
