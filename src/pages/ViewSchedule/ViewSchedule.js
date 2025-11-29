import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import TopBar from "../../components/layout/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/layout/Footer/Footer";
import styles from "./ViewSchedule.module.scss";
import { getClassData } from "../../services/api";

const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
const hours = Array.from({ length: 14 }, (_, i) => i + 6); // 6:00 AM to 19:00 PM

// Convert date string (dd/mm/yyyy) to day of week
const convertDateToDayOfWeek = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);
  const dayIndex = date.getDay();
  const daysMap = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  return daysMap[dayIndex];
};

// Get week range for display
const getWeekRange = (weekOffset = 0) => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate Monday of the current week
  const daysFromMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + daysFromMonday + (weekOffset * 7));
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return {
    start: monday,
    end: sunday,
    label: `${monday.getDate()}/${monday.getMonth() + 1} - ${sunday.getDate()}/${sunday.getMonth() + 1}`
  };
};

const ViewSchedule = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const weekRange = getWeekRange(weekOffset);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getClassData();
        if (response.success) {
          console.log(response.data);
          // Transform data to schedule format
          const scheduleData = response.data
            .filter(item => item.status !== "Available" && item.subject) // Exclude empty slots
            .map((item, index) => {
              // const [startHour] = item.time.split(':');
              const [startTime, endTime] = item.time.split('-');
              const duration = parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]);
              
              return {
                id: index + 1,
                day: convertDateToDayOfWeek(item.date),
                startTime: startTime,
                duration: duration,
                subject: item.subject,
                color: ["cyan", "red", "green", "yellow", "purple"][index % 5], // Cycle through colors
                date: item.date,
                location: item.location,
              };
            });
          setSchedules(scheduleData);
        }
      } catch (error) {
        console.error("Failed to fetch class data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const getScheduleForDayAndHour = (day, hour) => {
    return schedules.find((s) => {
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
          <h1 className={styles.title}>LỊCH DẠY</h1>
          {/* <div className={styles.subtitle}>Tutor Support System</div> */}
        </div>

        <div className={styles.scheduleCard}>
          <div className={styles.scheduleHeader}>
            {/* <h2 className={styles.scheduleTitle}>LỊCH DẠY</h2> */}
            <div className={styles.weekNavigation}>
              <button 
                className={styles.weekButton}
                onClick={() => setWeekOffset(weekOffset - 1)}
              >
                ←
              </button>
              <span className={styles.weekLabel}>Tuần: {weekRange.label}</span>
              <button 
                className={styles.weekButton}
                onClick={() => setWeekOffset(weekOffset + 1)}
              >
                →
              </button>
            </div>
            <button 
              className={styles.btnEdit}
              onClick={() => navigate("/tutor/confirm")}
            >Xác nhận lịch dạy
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
              Đang tải lịch dạy...
            </div>
          ) : (
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
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewSchedule;
