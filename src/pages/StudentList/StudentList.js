import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import TopBar from "../../components/layout/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import StudentDetailModal from "../../components/Common/StudentDetailModal/StudentDetailModal";
import styles from "./StudentList.module.scss";

const registeredStudents = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    gender: "Nam",
    mssv: "2411111",
    faculty: "Khoa học và Kỹ thuật Máy tính",
    gpa: "2.5/4.0",
    notes: "Đang tìm Tutor giải bộ thơi gian dài",
  },
  {
    id: 2,
    name: "Nguyễn Thị B",
    gender: "Nữ",
    mssv: "2550001",
    faculty: "Quản lý Công nghiệp",
    gpa: "2.3/4.0",
    notes: "Ưu tiên học online",
  },
  {
    id: 3,
    name: "Phạm Quang C",
    gender: "Nam",
    mssv: "2313131",
    faculty: "Tài nguyên và Môi trường",
    gpa: "2.0/4.0",
    notes: "",
  },
];

const studyingStudents = [
  {
    id: 4,
    name: "Nguyễn Thúy D",
    gender: "Nữ",
    mssv: "2413138",
    faculty: "KH-KTMT",
    gpa: "2.2/4.0",
    email: "thuy.d@hcmut.edu.vn",
    phone: "0000000000",
    avatar: null,
    major: "Khoa học Máy tính",
    startDate: "19/02/2025",
    completedSessions: 4,
    subjects: "Vật lý 1, Cấu trúc rời rạc",
  },
];

const StudentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetail = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const filteredRegistered = registeredStudents.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudying = studyingStudents.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h2 className={styles.pageTitle}>DANH SÁCH SINH VIÊN</h2>
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
                  {filteredRegistered.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.gender}</td>
                      <td>{student.mssv}</td>
                      <td>{student.faculty}</td>
                      <td>{student.gpa}</td>
                      <td>{student.notes}</td>
                      <td>
                        <button className={styles.btnAccept}>Xác nhận</button>
                      </td>
                      <td>
                        <button className={styles.btnReject}>Từ chối</button>
                      </td>
                    </tr>
                  ))}
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
                  {filteredStudying.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.gender}</td>
                      <td>{student.mssv}</td>
                      <td>{student.faculty}</td>
                      <td>{student.gpa}</td>
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
                  ))}
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
