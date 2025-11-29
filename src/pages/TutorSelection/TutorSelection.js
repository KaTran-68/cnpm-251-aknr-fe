import React, { useEffect, useState} from "react";
import styles from "./TutorSelection.module.scss";
import TutorDetailModal from "../../components/Tutor/TutorDetailModal/TutorDetailModal";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getTutorData } from "../../services/api";
import { useNavigate } from "react-router-dom";
/**
 * Updated TutorSelection: click card -> open TutorDetailModal
 * Make sure path ../../components/... matches repo layout
 */

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
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTutorData();
      if (response.success) {
        setTutors(response.data);
      }
    };
    fetchData();
  }, []);

  const filtered = tutors.filter((t) =>
    (t.name + " " + (t.subjects || "")).toLowerCase().includes(q.toLowerCase())
  );

  function openDetail(tutor) {
    setSelectedTutor(tutor);
    setModalOpen(true);
  }

  function closeDetail() {
    setModalOpen(false);
    // setSelectedTutor(null); // optional
  }

  async function handleRegister(tutor) {
    setRegistering(true);
    try {
      // mock API call
      await new Promise((res) => setTimeout(res, 800));
      setModalOpen(false);
      alert(`Đăng ký thành công tutor: ${tutor.name}`);
      localStorage.setItem('RegisterTutor', tutor.id);
      navigate(`/${role}/home`, { replace: true });
    } catch (err) {
      alert("Đăng ký thất bại");
    } finally {
      setRegistering(false);
    }
  }
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.frameBg}>
        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm kiếm môn học hoặc tên tutor..."
            aria-label="Tìm kiếm môn học hoặc tên tutor"
          />
        </div>

        <div className={styles.listWrap}>
          <div className={styles.grid}>
            {filtered.map((t) => {
              const selected = selectedTutor && selectedTutor.id === t.id;
              return (
                <div
                  key={t.id}
                  className={`${styles.cardShell} ${selected ? styles.selectedWrapper : ""
                    }`}
                  onClick={() => openDetail(t)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" ? openDetail(t) : null)}
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
      <div className={styles.footer}>
        <Footer />
      </div>

      <TutorDetailModal
        open={modalOpen}
        tutor={selectedTutor}
        onClose={closeDetail}
        onRegister={handleRegister}
        registering={registering}
      />
    </div>
  );
}
