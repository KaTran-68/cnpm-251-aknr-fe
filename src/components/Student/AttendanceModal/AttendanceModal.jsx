import React, { useEffect, useState } from 'react';
import styles from './AttendanceModal.module.scss';

const defaultForm = {
  studentName: 'Nguyễn Văn A1',
  studentId: '24101100',
  password: '123',
};

const AttendanceModal = ({ show, onClose, onConfirm, defaultUser }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!show) {
      setForm(defaultForm);
      return;
    }
    setForm({
      studentName: defaultUser?.name || '',
      studentId: defaultUser?.studentId || '',
      password: '',
    });
  }, [show, defaultUser]);

  if (!show) return null;

  const submit = () => {
    const resolvedName = defaultUser?.name || form.studentName.trim();
    const resolvedId = defaultUser?.studentId || form.studentId.trim();
    const resolvedPassword = form.password.trim();
    if (!resolvedName || !resolvedPassword) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    onConfirm({
      studentName: resolvedName,
      studentId: resolvedId,
      password: resolvedPassword,
    });
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalBox}>
        <h5>Điểm danh</h5>
        {!defaultUser && (
          <>
            <input
              className="form-control"
              placeholder="Họ và tên *"
              value={form.studentName}
              onChange={(e) => setForm((prev) => ({ ...prev, studentName: e.target.value }))}
              style={{ marginBottom: 8 }}
            />
            <input
              className="form-control"
              placeholder="Mã sinh viên"
              value={form.studentId}
              onChange={(e) => setForm((prev) => ({ ...prev, studentId: e.target.value }))}
              style={{ marginBottom: 8 }}
            />
          </>
        )}
        {defaultUser && (
          <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            Sử dụng thông tin tài khoản hiện tại.
          </div>
        )}
        <input
          className="form-control"
          placeholder="Mật khẩu điểm danh *"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button className="btn btn-dark" onClick={submit}>
            Xác nhận
          </button>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default AttendanceModal;
