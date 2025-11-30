// Centralized status definitions for classes and applications
export const CLASS_STATUSES = {
  DONE: { key: "done", label: "Đã kết thúc" },
  UPCOMING: { key: "upcoming", label: "Sắp diễn ra" },
  AVAILABLE: { key: "available", label: "Có sẵn" },
  CANCEL: { key: "cancel", label: "Đã bị hủy" },
  PENDING: { key: "pending", label: "Chờ xác nhận" },
};

export const APP_STATUSES = {
  PENDING: { key: "pending", label: "Chờ duyệt" },
  APPROVED: { key: "approved", label: "Đã duyệt" },
  REJECTED: { key: "rejected", label: "Từ chối" },
};
