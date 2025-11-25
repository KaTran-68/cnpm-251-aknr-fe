import React from "react";
import styles from "./ActionButton.module.scss";

const ActionButton = ({ children, className, ...rest }) => {
  return (
    <button
      type="button"
      className={[styles.action, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ActionButton;
