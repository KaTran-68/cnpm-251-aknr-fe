import React from "react";
import styles from "./SegmentedControl.module.scss";

// Accessible segmented control for choosing among string options.
// Props: options[] string, value string, onChange(option), direction 'horizontal' | 'vertical'
const SegmentedControl = ({ options = [], value, onChange, direction = "horizontal" }) => {
  return (
    <div
      className={[styles.root, direction === "vertical" ? styles.vertical : styles.horizontal].join(" ")}
      role="radiogroup"
      aria-orientation={direction === "vertical" ? "vertical" : "horizontal"}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            className={[styles.segment, active ? styles.active : ""].join(" ")}
            onClick={() => onChange && onChange(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
