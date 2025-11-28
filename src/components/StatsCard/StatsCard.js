import React from "react";
import styles from "./StatsCard.module.scss";

/**
 * Small stats tile (title, big number, optional tone)
 */
export default function StatsCard({ title, value, tone = "default" }) {
  return (
    <div className={`${styles.tile} ${styles[`tone_${tone}`] || ""}`}>
      <div className={styles.value}>{value}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}
