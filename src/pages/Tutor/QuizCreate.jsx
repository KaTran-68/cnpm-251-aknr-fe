import React, { useState } from 'react';
import styles from './QuizCreate.module.scss';
import { FaPlus } from 'react-icons/fa';

const QuizCreate = () => {
  const [currentQuestion, setCurrentQuestion] = useState(2); // Index 2 = Câu 3

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentFrame}>
        
        {/* Left Sidebar */}
        <div className={styles.leftSidebar}>
          <div className={styles.sidebarItem}>
            <label>Câu hỏi 3:</label>
          </div>
          <div className={styles.sidebarItem}>
            <label>Số điểm:</label>
            <input type="text" className="form-control" placeholder="Nhập vào" />
          </div>
          <div className={styles.sidebarItem}>
            <label>Thời gian làm bài:</label>
            <div className="d-flex align-items-center gap-2">
              <input type="text" className="form-control" placeholder="Nhập vào" />
              <span>Phút</span>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className={styles.centerContent}>
          <div className="mb-3">
            <label className="form-label">Câu hỏi:</label>
            <input 
              type="text" 
              className="form-control" 
              value="Chọn phương án đúng. Số orbital trong phân lớp g (l = 4) là:" 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Loại câu hỏi</label>
            <select className="form-select mb-3">
              <option>Chọn một</option>
            </select>
          </div>

          <div className={styles.optionsList}>
            <div className={styles.optionRow}>
              <span className={styles.optionLabel}>A</span>
              <input type="text" className="form-control" value="5" />
            </div>
            <div className={styles.optionRow}>
              <span className={styles.optionLabel}>B</span>
              <input type="text" className="form-control" value="9" />
            </div>
            <div className={styles.optionRow}>
              <span className={styles.optionLabel}>C</span>
              <input type="text" className="form-control" placeholder="Nhập vào" />
            </div>
            <div className={styles.optionRow}>
              <span className={styles.optionLabel}>D</span>
              <input type="text" className="form-control" placeholder="Nhập vào" />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          <div className={styles.questionNav}>
            <button className="btn btn-light">Câu 1</button>
            <button className="btn btn-light">Câu 2</button>
            <button className="btn btn-primary">Câu 3</button>
            <button className="btn btn-outline-secondary"><FaPlus /></button>
          </div>

          <div className={styles.actionButtons}>
            <button className="btn btn-info text-white">Trang trước</button>
            <button className="btn btn-primary">Hoàn thành</button>
            <button className="btn btn-info text-white">Trang sau</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizCreate;
