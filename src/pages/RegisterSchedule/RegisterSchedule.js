import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import TopBar from "../../components/layout/TopBar/TopBar";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./RegisterSchedule.module.scss";
import { getClassData } from "../../services/api";
import { useEffect } from "react";

const days = [
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
  "Chủ nhật",
];

// Convert date string (dd/mm/yyyy) to day of week
const convertDateToDayOfWeek = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  const dayIndex = date.getDay();
  const daysMap = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  return daysMap[dayIndex];
};

const RegisterSchedule = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [duration, setDuration] = useState("");
  const [shift, setShift] = useState("");
  const [startTime, setStartTime] = useState("");
  const [place, setPlace] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeError, setTimeError] = useState("");

  const validateTime = (time) => {
    // Check if time matches HH:MM format
    const timeRegex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])$/;
    
    if (!time) {
      return "Vui lòng nhập thời gian bắt đầu";
    }
    
    if (!timeRegex.test(time)) {
      return "Định dạng thời gian không hợp lệ. Vui lòng nhập theo định dạng HH:MM (Ví dụ: 13:00)";
    }
    
    const [hours, minutes] = time.split(':').map(Number);
    
    if (hours < 0 || hours > 24) {
      return "Giờ phải từ 00 đến 24";
    }
    
    if (hours === 24 && minutes > 0) {
      return "Thời gian 24:00 không được có phút";
    }
    
    if (minutes < 0 || minutes > 59) {
      return "Phút phải từ 00 đến 59";
    }
    
    return "";
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setStartTime(value);
    
    if (value) {
      const error = validateTime(value);
      setTimeError(error);
    } else {
      setTimeError("");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    
    // Validate time before submission
    const error = validateTime(startTime);
    if (error) {
      setTimeError(error);
      return;
    }
    
    // TODO: integrate API
    // eslint-disable-next-line no-console
    console.log({ day, duration, shift, startTime, place });
  };
  
  const role = localStorage.getItem('role') || 'tutor';
  if (role !== 'tutor') {
    navigate(`/${role}/home`);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getClassData();
        if (response.success) {
          console.log(response.data);
          // Filter only "Available" status and transform data
          const available = response.data
            .filter(item => item.status === "Available")
            .map((item, index) => ({
              id: index + 1,
              thu: convertDateToDayOfWeek(item.date),
              time: item.time,
              place: item.location,
              date: item.date,
            }));
          setAvailableClasses(available);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
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
              {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</div>
              ) : (
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
                    {availableClasses.length > 0 ? (
                      availableClasses.map((r) => (
                        <tr key={r.id}>
                          <td>{r.id}</td>
                          <td>{r.thu}</td>
                          <td>{r.time}</td>
                          <td>{r.place}</td>
                          <td>
                            <button className={styles.btnDanger}>XÓA CA</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>Không có ca dạy khả thi</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
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
              onChange={handleTimeChange}
            />
            <input
              className={styles.input}
              placeholder="Nhập địa điểm (Ví dụ: Khu tự học KMS H6)"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          {timeError && (
            <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '12px' }}>
              {timeError}
            </div>
          )}
          <button type="submit" className={styles.btnSubmit}>
            Nhập
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterSchedule;
