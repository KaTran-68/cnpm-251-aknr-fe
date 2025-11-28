import React from "react";
import { useNavigate } from "react-router-dom";
// import TopBar from "../../components/layout/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./ViewSchedule.module.scss";

const sampleSchedules = [
  { id: 1, day: "Chủ nhật", startTime: "8:00", duration: 2, subject: "CTRR - Chương 3", color: "cyan" },
  { id: 2, day: "Chủ nhật", startTime: "14:00", duration: 2, subject: "Vật lý 1 - Chương 2", color: "red" },
  { id: 3, day: "Thứ tư", startTime: "11:00", duration: 2, subject: "Vật lý 1 - Chương 3", color: "green" },
  { id: 4, day: "Thứ bảy", startTime: "17:00", duration: 3, subject: "Giải tích 1 - Chương 4", color: "yellow" },
];

const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
const hours = Array.from({ length: 14 }, (_, i) => i + 6); // 6:00 AM to 19:00 PM

const ViewSchedule = () => {
  const navigate = useNavigate();

  const getScheduleForDayAndHour = (day, hour) => {
    return sampleSchedules.find((s) => {
      const scheduleHour = parseInt(s.startTime.split(":")[0]);
      return s.day === day && hour >= scheduleHour && hour < scheduleHour + s.duration;
    });
  };

  const getSchedulePosition = (schedule, hour) => {
    const scheduleHour = parseInt(schedule.startTime.split(":")[0]);
    if (hour === scheduleHour) return "start";
    return "continue";
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      <div className={styles.container}>
        <div className={styles.headerSection}>
          <button className={styles.btnBack} onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h1 className={styles.title}>HCMUT_TSS</h1>
          <div className={styles.subtitle}>Tutor Support System</div>
        </div>

        <div className={styles.scheduleCard}>
          <div className={styles.scheduleHeader}>
            <h2 className={styles.scheduleTitle}>LỊCH DẠY</h2>
            <button 
              className={styles.btnEdit}
              onClick={() => navigate("/confirm")}
            >
              Xác nhận lịch dạy
            </button>
          </div>

          <div className={styles.calendarWrap}>
            <table className={styles.calendar}>
              <thead>
                <tr>
                  <th className={styles.timeColumn}></th>
                  {days.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((hour) => (
                  <tr key={hour}>
                    <td className={styles.timeCell}>
                      {hour}:00 {hour < 12 ? "AM" : "PM"}
                    </td>
                    {days.map((day) => {
                      const schedule = getScheduleForDayAndHour(day, hour);
                      const position = schedule ? getSchedulePosition(schedule, hour) : null;

                      if (schedule && position === "start") {
                        return (
                          <td
                            key={day}
                            className={`${styles.scheduleCell} ${styles[schedule.color]}`}
                            rowSpan={schedule.duration}
                          >
                            <div className={styles.scheduleContent}>
                              {schedule.subject}
                            </div>
                          </td>
                        );
                      } else if (!schedule) {
                        return <td key={day} className={styles.emptyCell}></td>;
                      }
                      return null;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewSchedule;
