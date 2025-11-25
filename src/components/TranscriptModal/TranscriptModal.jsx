import React from 'react';
import './TranscriptModal.css';

const TranscriptModal = ({ show, onClose, sessionData }) => {
  if (!show) return null;

  const mockTranscript = {
    sessionTitle: sessionData?.title || 'Buổi học không xác định',
    date: sessionData?.date ? new Date(sessionData.date).toLocaleString('vi-VN') : 'Chưa có thời gian',
    location: sessionData?.location || 'Chưa có địa điểm',
    attendees: [
      'Nguyễn Văn A (SV001)',
      'Trần Thị B (SV002)', 
      'Lê Văn C (SV003)',
      'Phạm Thị D (SV004)',
      'Hoàng Văn E (SV005)'
    ],
    agenda: [
      'Ôn tập kiến thức cũ (15 phút)',
      'Giảng bài mới: Tích phân cơ bản (30 phút)',
      'Thực hành bài tập (20 phút)',
      'Hỏi đáp và giải đáp thắc mắc (10 phút)',
      'Giao bài tập về nhà (5 phút)'
    ],
    keyPoints: [
      'Công thức tích phân cơ bản: ∫f(x)dx',
      'Phương pháp tích phân từng phần',
      'Ứng dụng tích phân trong tính diện tích',
      'Bài tập thực hành: Tính tích phân xác định'
    ],
    homework: 'Làm bài tập 1.1 → 1.5 trong sách giáo khoa. Deadline: Buổi học tiếp theo.',
    nextSession: 'Buổi 3: Ứng dụng tích phân trong hình học - Thứ 5, 14:00, Phòng 101'
  };

  return (
    <div className="transcript-modal-backdrop">
      <div className="transcript-modal">
        <div className="transcript-header">
          <h4>📋 Biên bản buổi học</h4>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="transcript-content">
          <div className="info-section">
            <h5>Thông tin buổi học</h5>
            <div className="info-grid">
              <div><strong>Tên buổi học:</strong> {mockTranscript.sessionTitle}</div>
              <div><strong>Thời gian:</strong> {mockTranscript.date}</div>
              <div><strong>Địa điểm:</strong> {mockTranscript.location}</div>
              <div><strong>Số học viên tham dự:</strong> {mockTranscript.attendees.length}</div>
            </div>
          </div>

          <div className="attendees-section">
            <h5>Danh sách tham dự</h5>
            <ul className="attendees-list">
              {mockTranscript.attendees.map((attendee, idx) => (
                <li key={idx}>{attendee}</li>
              ))}
            </ul>
          </div>

          <div className="agenda-section">
            <h5>Nội dung buổi học</h5>
            <ol className="agenda-list">
              {mockTranscript.agenda.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="keypoints-section">
            <h5>Điểm chính được học</h5>
            <ul className="keypoints-list">
              {mockTranscript.keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="homework-section">
            <h5>Bài tập về nhà</h5>
            <div className="homework-content">
              {mockTranscript.homework}
            </div>
          </div>

          <div className="next-session-section">
            <h5>Buổi học tiếp theo</h5>
            <div className="next-session-content">
              {mockTranscript.nextSession}
            </div>
          </div>
        </div>

        <div className="transcript-footer">
          <small>
            📍 Biên bản này được tạo tự động. Mọi thắc mắc xin liên hệ giảng viên.
          </small>
        </div>
      </div>
    </div>
  );
};

export default TranscriptModal;