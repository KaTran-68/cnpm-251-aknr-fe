import { useState, useEffect } from "react";
import styles from "./ClassList.module.scss";
import Header from '../../components/Header/Header';
import {
  FaCheckCircle,
    FaBookOpen,
  FaRegClock,
    FaUsers
} from "react-icons/fa";

import ClassCard from "../../components/ClassCard/ClassCard";
import ClassDetails from "../../components/ClassDetails/ClassDetails";
import { CLASS_STATUSES } from "../../constants/statuses";
import { getClassData } from "../../services/api";

export default function ClassList() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Fetch class data from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await getClassData();
        
        // Handle different response structures
        const data = Array.isArray(response) ? response : 
                     (response?.data && Array.isArray(response.data)) ? response.data : 
                     [];
        
        // Map API data to component format
        const formattedClasses = data
          .filter(cls => cls.status?.toLowerCase() !== 'available')
          .map(cls => {
            // Map API status to frontend status
            let statusKey = CLASS_STATUSES.UPCOMING.key;
            let statusLabel = CLASS_STATUSES.UPCOMING.label;
            const apiStatus = cls.status?.toLowerCase();
            if (apiStatus === 'pending') {
              statusKey = CLASS_STATUSES.PENDING.key;
              statusLabel = CLASS_STATUSES.PENDING.label;
            } else if (apiStatus === 'done') {
              statusKey = CLASS_STATUSES.DONE.key;
              statusLabel = CLASS_STATUSES.DONE.label;
            } else if (apiStatus === 'cancel') {
              statusKey = CLASS_STATUSES.CANCEL.key;
              statusLabel = CLASS_STATUSES.CANCEL.label;
            }
            return {
              name: cls.subject,
              tutor: cls.tutor,
              tutorId: cls.tutorId,
              student: cls.student,
              studentMssv: cls.studentMssv,
              date: cls.date,
              time: cls.time,
              location: cls.location,
              description: cls.descriptionClass,
              status: statusLabel,
              statusKey: statusKey,
              originalStatus: cls.status
            };
          });
        
        setClasses(formattedClasses);
      } catch (error) {
        console.error('Error fetching class data:', error);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Get unique tutors and subjects for filters
  const uniqueTutors = [...new Set(classes.map(cls => cls.tutor))].filter(Boolean);
  const uniqueSubjects = [...new Set(classes.map(cls => cls.name))].filter(Boolean);

  // Filter classes based on search and filters
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.tutor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.student?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTutor = selectedTutor === 'all' || cls.tutor === selectedTutor;
    const matchesSubject = selectedSubject === 'all' || cls.name === selectedSubject;
    
    return matchesSearch && matchesTutor && matchesSubject;
  });

  // Calculate statistics
  const stats = {
    total: classes.length - classes.filter(cls => cls.statusKey === CLASS_STATUSES.AVAILABLE.key).length,
    upcoming: classes.filter(cls => cls.statusKey === CLASS_STATUSES.UPCOMING.key).length,
    done: classes.filter(cls => cls.statusKey === CLASS_STATUSES.DONE.key).length,
    pending: classes.filter(cls => cls.statusKey === CLASS_STATUSES.PENDING.key).length,
    cancel: classes.filter(cls => cls.statusKey === CLASS_STATUSES.CANCEL.key).length,
  };



  return (
    <div className={styles.container}>
      <Header />

      {/* BLUE TOP AREA */}
      <div className={styles.topArea}>
        <h2 className={styles.pageTitle}>Quản lý lớp học</h2>

        {/* ----- STATISTIC CARDS (Unified Format) ----- */}
        <div className={styles.statsRow}>
          {[
            { title: "Tổng số lớp", num: stats.total, icon: <FaBookOpen />, color: "Orange" },
            { title: "Sắp diễn ra", num: stats.upcoming, icon: <FaRegClock />, color: "Purple" },
            { title: "Đã kết thúc", num: stats.done, icon: <FaCheckCircle />, color: "Blue" },
            { title: "Chờ xác nhận", num: stats.pending, icon: <FaRegClock />, color: "Green" },
            { title: "Đã bị hủy", num: stats.cancel, icon: <FaUsers />, color: "Red" },
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



        {/* WHITE CONTENT BOX */}
        <div className={styles.whiteBox}>
          {/* Filters */}
          <div className={styles.filterRow}>
            <input 
              className={styles.input} 
              placeholder="Tìm kiếm lớp học..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select 
              className={styles.select}
              value={selectedTutor}
              onChange={(e) => setSelectedTutor(e.target.value)}
            >
              <option value="all">Tất cả tutor</option>
              {uniqueTutors.map((tutor, idx) => (
                <option key={idx} value={tutor}>{tutor}</option>
              ))}
            </select>

            <select 
              className={styles.select}
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">Tất cả môn học</option>
              {uniqueSubjects.map((subject, idx) => (
                <option key={idx} value={subject}>{subject}</option>
              ))}
            </select>

            <button className={styles.searchBtn}>Tìm kiếm</button>
          </div>

        {/* Class Cards */}
        <div className={styles.cardGrid}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>
              Đang tải dữ liệu lớp học...
            </div>
          ) : filteredClasses.length > 0 ? (
            filteredClasses.map((cls, index) => (
              <ClassCard
                key={index}
                data={cls}
                onView={() => setSelectedClass(cls)}
              />
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>
              Không tìm thấy lớp học nào
            </div>
          )}
        </div>
      </div>

      </div>
      {selectedClass && (
        <ClassDetails
          data={selectedClass}
          onClose={() => setSelectedClass(null)}
          />
      )}
    </div>
  );
}
