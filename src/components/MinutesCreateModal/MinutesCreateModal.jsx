import React from 'react';
import './MinutesCreateModal.css';

const MinutesCreateModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content minutes-modal">
        <h4 className="text-center mb-4">Viết biên bản buổi học</h4>
        
        <div className="form-group mb-3">
          <label>Môn học</label>
          <select className="form-select" disabled>
            <option>Giải tích 1</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Nội dung</label>
          <input type="text" className="form-control" value="Giải tích 1" readOnly />
        </div>

        <div className="form-group mb-3">
          <label>Nội dung chi tiết</label>
          <input type="text" className="form-control" value="Công thức Taylor" />
        </div>

        <div className="form-group mb-3">
          <label>Link tài liệu</label>
          <input type="text" className="form-control" value="https://drive.google.com/drive/u/0/folders/1o1neskKH1kJ" />
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary me-2" onClick={onClose}>Lưu</button>
          <button className="btn btn-secondary" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default MinutesCreateModal;
