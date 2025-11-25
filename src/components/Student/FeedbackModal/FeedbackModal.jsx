import React, { useState } from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ show, onClose, onSubmit, sessionTitle }) => {
  const [feedback, setFeedback] = useState({
    content: ''
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.content.trim()) {
      alert('Vui lòng nhập nội dung feedback');
      return;
    }
    onSubmit(feedback);
    setFeedback({ content: '' });
  };

  return (
    <div className="feedback-modal-backdrop">
      <div className="feedback-modal">
        <h5>📝 Feedback buổi học</h5>
        <div className="session-info">
          <strong>Buổi học:</strong> {sessionTitle || 'Chưa xác định'}
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nội dung feedback *:</label>
            <textarea
              className="form-control"
              rows={6}
              placeholder="Chia sẻ cảm nhận của bạn về buổi học..."
              value={feedback.content}
              onChange={(e) => setFeedback(prev => ({ ...prev, content: e.target.value }))}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-success">
              Gửi feedback
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;