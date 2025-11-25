import React, { useEffect, useMemo, useState } from 'react';
import styles from './ManageClass.module.scss';
import AttendanceModal from '../../components/AttendanceModal/AttendanceModal';
import Notification from '../../components/Notification/Notification';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { confirmAttendance } from '../../services/attendance';
import MockAuthService from '../../services/mockAuth';
import MockDataProvider from '../../services/mockData';
import MockLoginModal from '../../components/MockLoginModal/MockLoginModal';
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal';
import TranscriptModal from '../../components/TranscriptModal/TranscriptModal';

const sections = [
  { title: 'Điểm danh', key: 'attendance' },
  { title: 'Quizz', key: 'quiz' },
  { title: 'Gửi feedback', key: 'feedback' },
  { title: 'Xem biên bản buổi học', key: 'minutes' },
];

const ManageClass = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingQuizzes, setLoadingQuizzes] = useState(false);
  const [error, setError] = useState('');
  const [creatingDemo, setCreatingDemo] = useState(false);
  const [currentUser, setCurrentUser] = useState(MockAuthService.getCurrentUser());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const navigate = useNavigate();

  const selectedSession = useMemo(
    () => sessions.find((s) => s._id === selectedSessionId) || null,
    [sessions, selectedSessionId]
  );



  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoadingSessions(true);
        const sessions = await MockDataProvider.getSessions();
        setSessions(sessions);
        setSelectedSessionId(sessions[0]?._id || '');
        setError('');
      } catch (err) {
        setError('Không tải được danh sách buổi học');
      } finally {
        setLoadingSessions(false);
      }
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    if (!selectedSessionId) {
      setQuizzes([]);
      return;
    }
    const fetchQuizzes = async () => {
      try {
        setLoadingQuizzes(true);
        const quizzes = await MockDataProvider.getQuizzesBySession(selectedSessionId);
        setQuizzes(quizzes);
      } catch (err) {
        setError('Không tải được quiz');
      } finally {
        setLoadingQuizzes(false);
      }
    };
    fetchQuizzes();
  }, [selectedSessionId]);

  const handleConfirm = async ({ studentName, studentId, password }) => {
    if (!selectedSessionId) {
      alert('Chưa có buổi học để điểm danh');
      return;
    }
    try {
      const resolvedName = studentName || currentUser?.name;
      const resolvedId = studentId || currentUser?.studentId;
      if (!resolvedName) {
        alert('Không tìm thấy thông tin sinh viên. Vui lòng đăng nhập lại.');
        return;
      }
      // Hardcode: Always accept password "123"
      if (password !== '123') {
        alert('Mật khẩu không đúng. Mật khẩu đúng là: 123');
        return;
      }
      // Simulate successful attendance
      setShowModal(false);
      setNotification({ show: true, message: 'Điểm danh thành công' });
    } catch (err) {
      alert('Điểm danh thất bại, vui lòng thử lại');
    }
  };

  const handleCreateDemoSession = async () => {
    try {
      setCreatingDemo(true);
      const payload = {
        title: 'Buổi học demo',
        date: new Date().toISOString(),
        location: 'meet.google.com/demo',
        description: 'Buổi học dùng để thử nghiệm kết nối FE/BE',
      };
      const newSession = await MockDataProvider.createSession(payload);
      setSessions((prev) => [newSession, ...prev]);
      setSelectedSessionId(newSession._id);
      setError('');
    } catch (err) {
      alert('Không thể tạo buổi học demo');
    } finally {
      setCreatingDemo(false);
    }
  };

  const handleLoginSuccess = () => {
    setCurrentUser(MockAuthService.getCurrentUser());
  };

  const handleLogout = () => {
    MockAuthService.logout();
    setCurrentUser(null);
  };

  const handleFeedbackSubmit = (feedback) => {
    // Hardcode: Just show success message
    setShowFeedbackModal(false);
    setNotification({ show: true, message: 'Gửi feedback thành công! Cảm ơn bạn đã đóng góp ý kiến.' });
  };

  const renderSessionInfo = () => {
    if (loadingSessions) return <div className={styles.meta}>Đang tải dữ liệu...</div>;
    if (!selectedSession)
      return (
        <div className={styles.emptyState}>
          <div>Chưa có buổi học nào.</div>
          <button className="btn btn-dark" onClick={handleCreateDemoSession} disabled={creatingDemo}>
            {creatingDemo ? 'Đang tạo...' : 'Tạo buổi demo'}
          </button>
        </div>
      );

    const dateLabel = selectedSession.date
      ? new Date(selectedSession.date).toLocaleString('vi-VN')
      : 'Chưa cập nhật thời gian';

    return (
      <>
        <strong>{selectedSession.title}</strong>
        <div className={styles.meta}>{dateLabel}</div>
        <div className={styles.metaSmall}>Địa chỉ: {selectedSession.location || 'Chưa cập nhật'}</div>
      </>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.contentFrame}>
          <div className={styles.card}>
            <div className={styles.studentInfoBar}>
              {currentUser ? (
                <>
                  <span className={styles.studentName}>Sinh viên: {currentUser.name}</span>
                  {currentUser.studentId && (
                    <span className={styles.studentId}>MSSV: {currentUser.studentId}</span>
                  )}
                  <button className="btn btn-sm btn-outline-secondary" onClick={handleLogout}>Đăng xuất</button>
                </>
              ) : (
                <>
                  <span className={styles.notLoggedIn}>Chưa đăng nhập</span>
                  <button className="btn btn-sm btn-primary" onClick={() => setShowLoginModal(true)}>Đăng nhập</button>
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
                          <button className="btn btn-light" onClick={() => setShowModal(true)} disabled={!selectedSession}>
                            ☆ Điểm danh
                          </button>
                        </div>
                      )}
                      {s.key === 'quiz' && (
                        <div className={styles.quizList}>
                          {loadingQuizzes && <div>Đang tải danh sách quiz...</div>}
                          {!loadingQuizzes && quizzes.length === 0 && <div>Chưa có quiz nào cho buổi học này.</div>}
                          {!loadingQuizzes &&
                            quizzes.map((q) => (
                              <div key={q._id} className={styles.quizRow}>
                                <div className={styles.quizName} onClick={() => navigate(`/quiz/${q._id}`)}>
                                  {q.title}
                                </div>
                                <div className={styles.quizAction}>
                                  <button className="btn btn-dark" onClick={() => navigate(`/quiz/${q._id}`)}>
                                    Làm
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                      {s.key === 'feedback' && (
                        <div>
                          <button className="btn btn-success" onClick={() => setShowFeedbackModal(true)} disabled={!selectedSession}>
                            📝 Gửi feedback
                          </button>
                        </div>
                      )}
                      {s.key === 'minutes' && (
                        <div>
                          <button className="btn btn-info" onClick={() => setShowTranscriptModal(true)} disabled={!selectedSession}>
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
          onConfirm={handleConfirm}
          defaultUser={currentUser}
        />
        <Notification
          show={notification.show}
          message={notification.message}
          onClose={() => setNotification({ ...notification, show: false })}
        />
        <MockLoginModal
          show={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
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
  );
};

export default ManageClass;
