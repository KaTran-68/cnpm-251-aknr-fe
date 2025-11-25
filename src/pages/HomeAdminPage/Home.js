import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src="/logo.png" 
          alt="TSS Logo"
          className={styles.logo}
        />
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>HCMUT_TSS</h1>
        <p className={styles.subtitle}>Tutor Support System</p>

        <div className={styles.buttons}>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/tutor")}
          >
            Quản lý Tutor
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/class")}
          >
            Quản lý lớp học
          </button>
        </div>

        <img
          src="/rocket.png"
          alt="Rocket"
          className={styles.rocket}
        />
      </div>

      <footer className={styles.footer}>
        <p>Cơ sở 2: Khu phố Tân Lập, Đông Hòa, TP.HCM</p>
        <p>028 3865 4087 | spso@hcmut.edu.vn</p>
      </footer>
    </div>
  );
}
