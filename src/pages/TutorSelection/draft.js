import React, { useEffect, useState } from "react";
import styles from "./TutorSelection.module.scss";

const MOCK = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    subjects: "Giải tích 1, Vật lý 1",
    avatar: "",
  },
  { id: "2", name: "Kakashi", subjects: "Toán rời rạc", avatar: "kakashi.png" },
  {
    id: "3",
    name: "Nguyễn Văn B",
    subjects: "Giải tích 1, Đại số",
    avatar: "",
  },
  { id: "4", name: "Nguyễn Văn C", subjects: "Cấu trúc rời rạc", avatar: "" },
  {
    id: "5",
    name: "Nguyễn Thị A",
    subjects: "Giải tích 1, Vật lý 1",
    avatar: "",
  },
  {
    id: "6",
    name: "Nguyễn Văn E",
    subjects: "Giải tích 1, Vật lý 2",
    avatar: "",
  },
  { id: "7", name: "Võ Thị A", subjects: "Giải tích 2, Vật lý 2", avatar: "" },
  { id: "8", name: "Trần Thị A", subjects: "Kỹ thuật lập trình", avatar: "" },
  {
    id: "9",
    name: "Nguyễn Văn Z",
    subjects: "Giải tích 1, Vật lý 1",
    avatar: "",
  },
  {
    id: "10",
    name: "Nguyễn Văn Y",
    subjects: "Giải tích 1, Vật lý 1",
    avatar: "",
  },
];

export default function TutorSelection() {
  const [tutors, setTutors] = useState([]);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setTutors(MOCK);
  }, []);

  const filtered = tutors.filter((t) =>
    (t.name + " " + (t.subjects || "")).toLowerCase().includes(q.toLowerCase())
  );

  function toggleSelect(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function onConfirm() {
    if (!selectedId) {
      alert("Vui lòng chọn 1 tutor trước khi xác nhận");
      return;
    }
    alert(`Demo: đã chọn tutor id=${selectedId}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.frameBg}>
        {/* Search bar with button inside */}
        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm kiếm môn học hoặc tên tutor..."
            aria-label="Tìm kiếm môn học hoặc tên tutor"
          />
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            aria-label="Xác nhận"
          >
            Xác nhận
          </button>
        </div>

        {/* Grid list */}
        <div className={styles.listWrap}>
          <div className={styles.grid}>
            {filtered.map((t) => {
              const selected = t.id === selectedId;
              return (
                <div
                  key={t.id}
                  className={`${styles.cardShell} ${
                    selected ? styles.selectedWrapper : ""
                  }`}
                  onClick={() => toggleSelect(t.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? toggleSelect(t.id) : null
                  }
                >
                  <div className={styles.avatarBox}>
                    <div
                      className={styles.avatar}
                      style={{
                        backgroundImage: `url(${t.avatar || "no-avatar.png"})`,
                      }}
                    />
                  </div>

                  <div className={styles.cardInfo}>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.subjects}>{t.subjects}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
