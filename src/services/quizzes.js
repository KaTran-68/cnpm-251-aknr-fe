import api from "./api";
import MockDataProvider from "./mockData";

export const listQuizzesBySession = (sessionId) =>
  // api.get(`/sessions/${sessionId}/quizzes`);
  Promise.resolve({ data: MockDataProvider.getMockQuizzes(sessionId) });

export const getQuizById = (quizId) => {
  // api.get(`/sessions/quizzes/${quizId}`);
  const quiz = MockDataProvider.getMockQuizById(quizId);
  if (quiz) {
    return Promise.resolve({ data: quiz });
  }
  return Promise.reject(new Error("Quiz not found"));
};

export const submitQuiz = (quizId, payload) => {
  // api.post(`/sessions/quizzes/${quizId}/submit`, payload);
  return Promise.resolve({
    data: {
      score: Math.floor(Math.random() * 10) + "/10",
      message: "Nộp bài thành công (Mock)"
    }
  });
};
