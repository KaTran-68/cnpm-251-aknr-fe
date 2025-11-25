import React, { useState } from 'react';
import MockAuthService from '../../services/mockAuth';
import './MockLoginModal.css';

const MockLoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: ''
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên sinh viên');
      return;
    }
    
    const success = MockAuthService.mockLogin(formData.name.trim(), formData.studentId.trim());
    if (success) {
      onLoginSuccess && onLoginSuccess();
      onClose();
      setFormData({ name: '', studentId: '' });
    } else {
      alert('Đăng nhập thất bại');
    }
  };

  return (
    <div className="mock-login-backdrop">
      <div className="mock-login-modal">
        <h5>Đăng nhập (Mock)</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Tên sinh viên *"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            style={{ marginBottom: '10px' }}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Mã sinh viên"
            value={formData.studentId}
            onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
            style={{ marginBottom: '15px' }}
          />
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ marginRight: '8px' }}>
              Đăng nhập
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          * Đây là giao diện mock để test. Team auth sẽ thay thế sau.
        </div>
      </div>
    </div>
  );
};

export default MockLoginModal;