# Mock Integration Solution

Giải pháp tạm thời để các team làm việc song song mà không phụ thuộc vào nhau.

## 📁 Files đã tạo

### 1. `src/services/mockAuth.js`
- Mock service cho authentication
- Lưu/đọc user info từ localStorage
- Thay thế bằng auth service thật khi team auth hoàn thành

### 2. `src/services/mockData.js` 
- Mock data provider
- Tự động fallback từ API thật sang mock data khi backend chưa sẵn sàng
- Dữ liệu sessions và quizzes mẫu

### 3. `src/components/MockLoginModal/`
- Modal đăng nhập tạm thời
- Chỉ thu thập tên + MSSV, lưu vào localStorage
- Sẽ thay thế bằng login component thật

## 🔄 Cách hoạt động

### Authentication Flow:
1. User chưa đăng nhập → hiển thị nút "Đăng nhập"
2. Click nút → mở MockLoginModal
3. Nhập tên + MSSV → lưu vào localStorage
4. UI update hiển thị thông tin user + nút "Đăng xuất"

### Data Flow:
1. MockDataProvider tự động thử gọi API thật trước
2. Nếu API fail → fallback sang mock data
3. Không cần thay đổi component logic

## 🔧 Integration với code thật

### Khi team Auth hoàn thành:
```javascript
// Thay thế MockAuthService
import AuthService from '../services/realAuth'; // thay vì mockAuth

// Thay đổi các calls:
MockAuthService.getCurrentUser() → AuthService.getCurrentUser()
MockAuthService.mockLogin() → AuthService.login()
```

### Khi team Backend hoàn thành:
- MockDataProvider sẽ tự động dùng API thật
- Không cần thay đổi gì thêm

### Khi team Session Management hoàn thành:
```javascript
// Xóa nút "Tạo buổi demo", thay bằng:
import SessionManager from '../components/SessionManager';

// Trong component:
<SessionManager onSessionCreated={(session) => {
  setSessions(prev => [session, ...prev]);
}} />
```

## ⚠️ Lưu ý

1. **Mock data sẽ mất khi reload** - đây là bình thường
2. **LocalStorage user info** - production cần JWT/session thật
3. **Demo session tạo offline** - chỉ tồn tại trong frontend
4. **Attendance vẫn gọi API thật** - cần backend chạy để test

## 🚀 Cách test

1. Mở app → click "Đăng nhập"
2. Nhập tên + MSSV → thấy info hiển thị
3. Click "Tạo buổi demo" → session mới xuất hiện  
4. Các tính năng khác hoạt động bình thường với mock data

## 🔄 Cleanup sau khi integration

Sau khi tất cả teams hoàn thành, xóa các files:
- `src/services/mockAuth.js`
- `src/services/mockData.js` 
- `src/components/MockLoginModal/`

Và remove imports trong `ManageClass.jsx`.