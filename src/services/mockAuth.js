// Mock authentication service - thay thế bằng service thật khi team auth hoàn thành
class MockAuthService {
  static getCurrentUser() {
    try {
      const user = localStorage.getItem('cnpm-user');
      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.warn('Không đọc được thông tin user:', err);
      return null;
    }
  }

  static setCurrentUser(userData) {
    try {
      localStorage.setItem('cnpm-user', JSON.stringify(userData));
      return true;
    } catch (err) {
      console.error('Không lưu được thông tin user:', err);
      return false;
    }
  }

  static logout() {
    localStorage.removeItem('cnpm-user');
  }

  // Mock login - tạm thời để test
  static mockLogin(name, studentId) {
    const userData = {
      name: name || 'Sinh viên demo',
      studentId: studentId || 'SV001',
      loginTime: new Date().toISOString()
    };
    return this.setCurrentUser(userData);
  }

  // Check if user is logged in
  static isLoggedIn() {
    return !!this.getCurrentUser();
  }
}

export default MockAuthService;