import React from 'react';
import './AttendanceListModal.css';

const AttendanceListModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="attendance-modal-overlay">
      <div className="attendance-modal-box">
        <h4 className="attendance-modal-title">Danh sách điểm danh</h4>
        
        <div className="student-list">
          <div className="student-item">
            <div className="avatar-circle">1</div>
            <span className="student-name">Nguyễn Văn A</span>
            <input type="checkbox" checked readOnly className="form-check-input" />
          </div>
          <div className="student-item">
            <div className="avatar-circle">2</div>
            <span className="student-name">Trần Thị B</span>
            <input type="checkbox" checked readOnly className="form-check-input" />
          </div>
          <div className="student-item">
            <div className="avatar-circle">3</div>
            <span className="student-name">Lê Văn C</span>
            <input type="checkbox" checked readOnly className="form-check-input" />
          </div>
          <div className="student-item">
            <div className="avatar-circle">4</div>
            <span className="student-name">Phạm Văn D</span>
            <input type="checkbox" checked readOnly className="form-check-input" />
          </div>
        </div>

        <div className="attendance-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceListModal;
