import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import TopBar from "../../components/layout/TopBar/TopBar";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./RegisterSchedule.module.scss";

const sampleRows = [
  { id: 1, thu: "Thứ hai", time: "17:00 - 19:00", place: "Khu tự học KMS tòa H6, cơ sở 2" },
  { id: 2, thu: "Chủ nhật", time: "7:00 - 10:00", place: "Online" },
];

const days = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];

const RegisterSchedule = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [duration, setDuration] = useState("");
  const [shift, setShift] = useState("");
  const [startTime, setStartTime] = useState("");
  const [place, setPlace] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // TODO: integrate API
    // eslint-disable-next-line no-console
    console.log({ day, duration, shift, startTime, place });
  };
  const role = localStorage.getItem('role') || 'tutor';
  if (role !== 'tutor') {
    navigate(`/${role}/home`);
  };
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <button className={styles.btnBack} onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h2 className={styles.pageHeading}>ĐĂNG KÝ LỊCH DẠY</h2>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.card}>
            <div className={styles.tableTitle}>Ca Dạy Khả Thi Đã Nhập</div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Thứ</th>
                    <th>Thời gian</th>
                    <th>Địa điểm</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRows.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.thu}</td>
                      <td>{r.time}</td>
                      <td>{r.place}</td>
                      <td>
                        <button className={styles.btnDanger}>XÓA CA</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <form className={styles.formArea} onSubmit={submit}>
          <div className={styles.formLabel}>NHẬP CA DẠY</div>
          
          <div className={styles.formRow}>
            <select
              className={styles.daySelect}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Chọn ngày trong tuần</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="">Chọn thời gian ca học</option>
              <option>1 tiếng</option>
              <option>2 tiếng</option>
              <option>3 tiếng</option>
            </select>
          </div>

          <div className={styles.formRow}>
            <input
              className={styles.input}
              placeholder="Nhập thời gian bắt đầu (Ví dụ: 13:00)"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Nhập địa điểm (Ví dụ: Khu tự học KMS H6)"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <button type="submit" className={styles.btnPrimary}>
              Nhập
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterSchedule;
