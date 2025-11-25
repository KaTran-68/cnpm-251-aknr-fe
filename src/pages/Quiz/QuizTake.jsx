import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './QuizTake.module.scss';
import { getQuizById, submitQuiz } from '../../services/quizzes';

const QuizTake = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await getQuizById(quizId);
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Không tải được quiz');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const selectOption = (questionIdx, optionIdx) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIdx] = optionIdx;
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    if (!studentName.trim()) {
      alert('Vui lòng nhập họ tên trước khi nộp');
      return;
    }
    try {
      setSubmitting(true);
      const res = await submitQuiz(quiz._id, {
        studentName: studentName.trim(),
        answers,
      });
      alert(`Nộp bài thành công. Điểm của bạn: ${res.data.score}`);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Nộp bài thất bại, vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Đang tải quiz...</div>;
  if (error) return <div style={{ padding: 20 }} className="text-danger">{error}</div>;
  if (!quiz) return <div style={{ padding: 20 }}>Quiz không tồn tại</div>;
  if (!quiz.questions || quiz.questions.length === 0) {
    return <div style={{ padding: 20 }}>Quiz chưa có câu hỏi nào.</div>;
  }

  const currentQuestion = quiz.questions[current];

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentFrame}>
        <div className={styles.leftCol}>
          <div className={styles.sideCard}>
            <div className={styles.sideTitle}>Câu hỏi {currentQuestion.id || current + 1}:</div>
            <div className={styles.sideText}>
              {answers[current] !== null && answers[current] !== undefined
                ? `Đã chọn đáp án ${String.fromCharCode(65 + answers[current])}`
                : 'Chưa chọn đáp án'}
            </div>
            <div className={styles.sideScore}>Điểm mỗi câu: 1</div>
            <input
              className="form-control"
              placeholder="Họ và tên *"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={{ marginTop: 16 }}
            />
          </div>
        </div>

        <div className={styles.centerCol}>
          <div className={styles.timerBox}>Thời gian còn lại: 00:08:49</div>
          <div className={styles.questionBox}>
            <div className={styles.questionText}>{currentQuestion.text}</div>
            <div className={styles.options}>
              {currentQuestion.options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`btn btn-light ${answers[current] === idx ? 'active' : ''}`}
                  onClick={() => selectOption(current, idx)}
                  style={{ margin: '6px 0' }}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.navBox}>
            <div className={styles.grid}>
              {quiz.questions.map((question, idx) => (
                <button
                  key={question.id || idx}
                  className={`btn ${idx === current ? 'btn-primary' : answers[idx] !== null && answers[idx] !== undefined ? 'btn-success' : 'btn-light'}`}
                  onClick={() => setCurrent(idx)}
                  style={{ margin: 6 }}
                >
                  {`Câu ${question.id || idx + 1}`}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <button className="btn btn-outline-primary" onClick={() => setCurrent(Math.max(0, current - 1))}>
                Trang trước
              </button>
              <button
                className="btn btn-primary"
                style={{ margin: '0 12px' }}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Đang nộp...' : 'Nộp bài'}
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => setCurrent(Math.min(quiz.questions.length - 1, current + 1))}
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTake;
