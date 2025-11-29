import React, { useEffect, useRef } from "react";
import styles from "./TutorDetailModal.module.scss";

export default function TutorDetailModal({
  open,
  tutor,
  onClose,
  onRegister,
  registering,
}) {
  const closeBtnRef = useRef(null);
  const lastActiveRef = useRef(null);
  useEffect(() => {
    if (!open) return;

    // lưu element focus trước khi mở, rồi focus vào nút đóng
    lastActiveRef.current = document.activeElement;
    if (closeBtnRef.current) closeBtnRef.current.focus();

    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      // trả focus về element trước đó
      try {
        lastActiveRef.current && lastActiveRef.current.focus();
      } catch (err) {}
    };
  }, [open, onClose]);

  if (!open || !tutor) return null;
  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Thông tin chi tiết Tutor"
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Đóng"
          ref={closeBtnRef}
        >
          ✕
        </button>

        <h2 className={styles.title}>THÔNG TIN CHI TIẾT TUTOR</h2>

        <div className={styles.separator} />

        <div className={styles.content}>
          <div className={styles.left}>
            <div
              className={styles.avatar}
              style={{
                backgroundImage: `url(${tutor.avatar || "no-avatar.png"})`,
              }}
              aria-hidden="true"
            />
          </div>

          <div className={styles.right} style={{ textAlign: "left" }}>
            <p>
              <strong>Họ và tên:</strong> {tutor.name || "-"}
            </p>
            <p>
              <strong>Giới tính:</strong> {tutor.sex || "-"}
            </p>
            <p>
              <strong>MSCB/MSSV:</strong> {tutor.id || "-"}
            </p>
            <p>
              <strong>Trình độ:</strong> {tutor.level || "Sinh viên"}
            </p>
            <p>
              <strong>Khoa:</strong> {tutor.faculty || "-"}
            </p>
            <p>
              <strong>Ngành:</strong> {tutor.major || "-"}
            </p>
            <p>
              <strong>Email:</strong> {tutor.email || "-"}
            </p>
            <p>
              <strong>Điểm TBTL:</strong> {tutor.gpa || "-"}
            </p>
            <p>
              <strong>Mô tả:</strong> {tutor.description || "-"}
            </p>
          </div>
        </div>

        <div className={styles.separator} />

        <div className={styles.footer}>
          <button
            className={styles.register}
            onClick={() => onRegister && onRegister(tutor)}
            disabled={registering}
            aria-disabled={registering}
          >
            {registering ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
}
