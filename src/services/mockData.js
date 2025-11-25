// Mock data provider - thay thế bằng API calls thật khi backend hoàn thành
import api from './api';

class MockDataProvider {
  static async getSessions() {
    // Force mock data for now to ensure UI matches requirements
    return this.getMockSessions();
    /*
    try {
      // Thử gọi API thật trước
      const response = await api.get('/sessions');
      return response.data;
    } catch (error) {
      console.warn('API không khả dụng, dùng mock data:', error.message);
      // Fallback to mock data
      return this.getMockSessions();
    }
    */
  }

  static getMockSessions() {
    return [
      {
        _id: 'mock-1',
        title: 'Giải tích 1',
        date: new Date('2025-11-19T07:00:00').toISOString(),
        location: 'Phòng 101 - H1',
        description: 'Giới thiệu về đạo hàm và tích phân'
      },
      {
        _id: 'mock-2', 
        title: 'Giải tích 1 - Buổi 2',
        date: new Date('2025-11-25T14:00:00').toISOString(),
        location: 'Phòng 101 - H1',
        description: 'Ứng dụng tích phân trong thực tế'
      }
    ];
  }

  static async getQuizzesBySession(sessionId) {
    // Force mock data for now
    return this.getMockQuizzes(sessionId);
    /*
    try {
      const response = await api.get(`/sessions/${sessionId}/quizzes`);
      return response.data;
    } catch (error) {
      console.warn('API không khả dụng, dùng mock quiz:', error.message);
      return this.getMockQuizzes(sessionId);
    }
    */
  }

  static getMockQuizzes(sessionId) {
    // Hardcode specific quizzes as requested by UI
    return [
      {
        _id: 'quiz-old-lesson',
        session: sessionId,
        title: 'Quizz kiểm tra bài cũ',
        questions: [
          {
            id: 1,
            text: 'Đạo hàm của hàm số f(x) = x² là:',
            options: ['2x', 'x', '2', '0'],
            correctIndex: 0
          },
          {
            id: 2,
            text: 'Đạo hàm của hàm số f(x) = 3x + 5 là:',
            options: ['3', '5', '3x', '8'],
            correctIndex: 0
          }
        ]
      },
      {
        _id: 'quiz-end-session',
        session: sessionId,
        title: 'Quizz cuối buổi',
        questions: [
          {
            id: 1,
            text: 'Tích phân của hàm số f(x) = 2x là:',
            options: ['x² + C', '2x + C', '2', 'x²'],
            correctIndex: 0
          },
          {
            id: 2,
            text: 'Diện tích hình phẳng giới hạn bởi y = x², y = 0, x = 0, x = 2 là:',
            options: ['8/3', '4', '2', '8'],
            correctIndex: 0
          }
        ]
      }
    ];
  }

  static getMockQuizById(quizId) {
    const allQuizzes = this.getMockQuizzes('any-session');
    return allQuizzes.find(q => q._id === quizId) || allQuizzes[0];
  }

  static async createSession(sessionData) {
    try {
      const response = await api.post('/sessions', sessionData);
      return response.data;
    } catch (error) {
      console.warn('Không thể tạo session qua API, tạo mock:', error.message);
      // Tạo mock session với ID ngẫu nhiên
      const mockSession = {
        _id: 'mock-' + Date.now(),
        ...sessionData,
        createdAt: new Date().toISOString()
      };
      return mockSession;
    }
  }
}

export default MockDataProvider;