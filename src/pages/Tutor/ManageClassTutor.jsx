import React, { useState } from 'react';
import styles from './ManageClassTutor.module.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AttendanceListModal from '../../components/AttendanceListModal/AttendanceListModal';
import MinutesCreateModal from '../../components/MinutesCreateModal/MinutesCreateModal';

const ManageClassTutor = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(-1);
  const [password, setPassword] = useState('');
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showMinutesModal, setShowMinutesModal] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleCreatePassword = () => {
    alert(`Đã tạo password điểm danh: ${password}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.contentFrame}>
          <div className={styles.card}>
            
            {/* Session Info */}
            <div className={styles.sessionInfo}>
              <div className={styles.sessionHeader}>
                <strong>Giải tích 1</strong>
                <span>Ngày 19/11/2025</span>
                <FaChevronDown className={styles.chevron} />
              </div>
              <input 
                className="form-control mt-2" 
                value="Địa chỉ: meet.google.com/cse-cnpm-luv" 
                readOnly 
              />
            </div>

            {/* Accordion Sections */}
            <div className={styles.accordion}>
              
              {/* 1. Tạo điểm danh */}
              <div className={styles.item}>
                <button className={styles.itemHeader} onClick={() => toggleAccordion(0)}>
                  <span>Tạo điểm danh</span>
                  {openIndex === 0 ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === 0 && (
                  <div className={styles.itemBody}>
                    <div className="d-flex gap-2 mb-2">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter your password here"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button className="btn btn-dark" onClick={handleCreatePassword}>
                        Tạo password
                      </button>
                    </div>
                    <a 
                      href="#" 
                      className={styles.link}
                      onClick={(e) => { e.preventDefault(); setShowAttendanceModal(true); }}
                    >
                      Xem danh sách điểm danh
                    </a>
                  </div>
                )}
              </div>

              {/* 2. Tạo Bài kiểm tra */}
              <div className={styles.item}>
                <button className={styles.itemHeader} onClick={() => toggleAccordion(1)}>
                  <span>Tạo Bài kiểm tra</span>
                  {openIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === 1 && (
                  <div className={styles.itemBody}>
                    <button className="btn btn-primary" onClick={() => navigate('/tutor/create-quiz')}>
                      Đi tới trang tạo Quiz
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Xem feedback */}
              <div className={styles.item}>
                <button className={styles.itemHeader} onClick={() => toggleAccordion(2)}>
                  <span>Xem feedback</span>
                  {openIndex === 2 ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === 2 && (
                  <div className={styles.itemBody}>
                    <div className={styles.feedbackItem}>
                      <strong>Nguyễn Văn A:</strong> Tutor siu dethuongg, thầy dạy em hiểu bài lắm ạ, cảm ơn thầy rất nhìu
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Viết biên bản buổi học */}
              <div className={styles.item}>
                <button className={styles.itemHeader} onClick={() => toggleAccordion(3)}>
                  <span>Viết biên bản buổi học</span>
                  {openIndex === 3 ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openIndex === 3 && (
                  <div className={styles.itemBody}>
                     <a 
                      href="#" 
                      className={styles.link}
                      onClick={(e) => { e.preventDefault(); setShowMinutesModal(true); }}
                    >
                      Viết biên bản
                    </a>
                  </div>
                )}
              </div>

            </div>

            {/* Cancel Button */}
            <button className="btn btn-danger mt-3">Hủy buổi học</button>

          </div>
        </div>
      </div>

      {/* Modals */}
      <AttendanceListModal 
        show={showAttendanceModal} 
        onClose={() => setShowAttendanceModal(false)} 
      />
      <MinutesCreateModal 
        show={showMinutesModal} 
        onClose={() => setShowMinutesModal(false)} 
      />
    </div>
  );
};

export default ManageClassTutor;
