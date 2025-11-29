import React, { useEffect, useMemo, useState } from 'react';
import styles from './ClassDashboard.module.scss';
import AttendanceModal from '../../../components/Student/AttendanceModal/AttendanceModal';
import Notification from '../../../components/Common/Notification/Notification';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getClassData } from '../../../services/api';
import FeedbackModal from '../../../components/Student/FeedbackModal/FeedbackModal';
import TranscriptModal from '../../../components/Student/TranscriptModal/TranscriptModal';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const sections = [
  { title: 'Điểm danh', key: 'attendance' },
  { title: 'Quizz', key: 'quiz' },
  { title: 'Gửi feedback', key: 'feedback' },
  { title: 'Xem biên bản buổi học', key: 'minutes' },
];

const ClassDashboard = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [error, setError] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const navigate = useNavigate();

  // Get user info from localStorage
  const currentUser = {
    name: localStorage.getItem('name') || 'Nguyễn Văn A1',
    studentId: localStorage.getItem('userId') || '24101100',
    role: localStorage.getItem('role') || 'student'
  };

  const selectedSession = useMemo(
    () => sessions.find((s) => s._id === selectedSessionId) || null,
    [sessions, selectedSessionId]
  );

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoadingSessions(true);
        const response = await getClassData();
        
        // Handle different response structures
        const data = Array.isArray(response) ? response : 
                     (response?.data && Array.isArray(response.data)) ? response.data : 
                     [];
        
        // Filter classes for the current student
        const studentClasses = data.filter(cls => 
          cls.studentMssv === currentUser.studentId && 
          (cls.status === 'Ongoing' || cls.status === 'Pending' || cls.status === 'Done')
        );
        
        // Transform to session format
        const formattedSessions = studentClasses.map((cls, index) => ({
          _id: `${cls.studentMssv}-${cls.date}-${index}`,
          title: `${cls.subject} - ${cls.tutor}`,
          date: cls.date,
          time: cls.time,
          location: cls.location,
          description: cls.descriptionClass,
          status: cls.status,
          subject: cls.subject,
          tutor: cls.tutor
        }));
        
        setSessions(formattedSessions);
        setSelectedSessionId(formattedSessions[0]?._id || '');
        setError('');
      } catch (err) {
        console.error('Error fetching sessions:', err);
        setError('Không tải được danh sách buổi học');
      } finally {
        setLoadingSessions(false);
      }
    };
    
    if (currentUser.studentId) {
      fetchSessions();
    } else {
      setLoadingSessions(false);
      setError('Vui lòng đăng nhập để xem lịch học');
    }
  }, [currentUser.studentId]);

  const handleConfirm = async ({ studentName, studentId, password }) => {
    if (!selectedSessionId) {
      alert('Chưa có buổi học để điểm danh');
      return;
    }
    try {
      const resolvedName = studentName || currentUser.name;
      const resolvedId = studentId || currentUser.studentId;
      
      if (!resolvedName || !resolvedId) {
        alert('Không tìm thấy thông tin sinh viên. Vui lòng đăng nhập lại.');
        return;
      }
      
      // TODO: Call real attendance API when available
      // For now, just show success
      setShowModal(false);
      setNotification({ show: true, message: 'Điểm danh thành công' });
    } catch (err) {
      alert('Điểm danh thất bại, vui lòng thử lại');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleFeedbackSubmit = (feedback) => {
    // TODO: Call real feedback API when available
    setShowFeedbackModal(false);
    setNotification({ show: true, message: 'Gửi feedback thành công! Cảm ơn bạn đã đóng góp ý kiến.' });
  };

  const renderSessionInfo = () => {
    if (loadingSessions) return <div className={styles.meta}>Đang tải dữ liệu...</div>;
    if (!selectedSession)
      return (
        <div className={styles.emptyState}>
          <div>Chưa có buổi học nào.</div>
        </div>
      );
    

    return (
      <>
        <strong>{selectedSession.title}</strong>
        <div className={styles.meta}>
          {selectedSession.date} - {selectedSession.time}
        </div>
        <div className={styles.metaSmall}>Địa điểm: {selectedSession.location || 'Chưa cập nhật'}</div>
        <div className={styles.metaSmall}>Trạng thái: {selectedSession.status}</div>
      </>
    );
  };

  return (
    <div className={styles.container}>
    <Header />
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.contentFrame}>
          <div className={styles.card}>
            <div className={styles.studentInfoBar}>
              {currentUser.name ? (
                <>
                  <span className={styles.studentName}>Sinh viên: {currentUser.name}</span>
                  {currentUser.studentId && (
                    <span className={styles.studentId}>MSSV: {currentUser.studentId}</span>
                  )}
                </>
              ) : (
                <>
                  <span className={styles.notLoggedIn}>Chưa đăng nhập</span>
                  <button className="btn btn-sm btn-primary" onClick={() => navigate('/login')}>
                    Đăng nhập
                  </button>
                </>
              )}
            </div>
            <div className={styles.sessionTitle}>
              {renderSessionInfo()}
              {selectedSession && sessions.length > 1 && (
                <select
                  className="form-select"
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  style={{ marginTop: 12 }}
                >
                  {sessions.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className={styles.accordion}>
              {sections.map((s, idx) => (
                <div key={s.key} className={styles.item}>
                  <button className={styles.itemHeader} onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}>
                    <div>{s.title}</div>
                    <div>{openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}</div>
                  </button>
                  {openIndex === idx && (
                    <div className={styles.itemBody}>
                      {s.key === 'attendance' && (
                        <div>
                          <button 
                            className="btn btn-light" 
                            onClick={() => setShowModal(true)} 
                            disabled={!selectedSession || !currentUser.name}
                          >
                            ☆ Điểm danh
                          </button>
                          {!currentUser.name && (
                            <small className="text-muted ms-2">Vui lòng đăng nhập để điểm danh</small>
                          )}
                        </div>
                      )}
                      {s.key === 'quiz' && (
                        <div>
                          <button 
                            className="btn btn-light" 
                            onClick={() => navigate('/class/quiz/:quizId')} 
                            disabled={!selectedSession || !currentUser.name}
                          >
                            Quiz
                          </button>
                          {!currentUser.name && (
                            <small className="text-muted ms-2">Vui lòng đăng nhập để làm quiz</small>
                          )}
                        </div>
                      )}
                      {s.key === 'feedback' && (
                        <div>
                          <button 
                            className="btn btn-success" 
                            onClick={() => setShowFeedbackModal(true)} 
                            disabled={!selectedSession || !currentUser.name}
                          >
                            📝 Gửi feedback
                          </button>
                          {!currentUser.name && (
                            <small className="text-muted ms-2">Vui lòng đăng nhập để gửi feedback</small>
                          )}
                        </div>
                      )}
                      {s.key === 'minutes' && (
                        <div>
                          <button 
                            className="btn btn-info" 
                            onClick={() => setShowTranscriptModal(true)} 
                            disabled={!selectedSession}
                          >
                            📋 Xem biên bản buổi học
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AttendanceModal
          show={showModal}
          onClose={() => setShowModal(false)}
        />
        <Notification
          show={notification.show}
          message={notification.message}
          onClose={() => setNotification({ ...notification, show: false })}
        />
        <FeedbackModal
          show={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleFeedbackSubmit}
          sessionTitle={selectedSession?.title}
        />
        <TranscriptModal
          show={showTranscriptModal}
          onClose={() => setShowTranscriptModal(false)}
          sessionData={selectedSession}
        />
      </div>
    </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>

  );
};

export default ClassDashboard;
