import React from "react";
import clsx from "clsx";
import styles from "./ActionButton.module.scss";

const ActionButton = ({ className, children, ...props }) => {
  return (
    <button className={clsx(styles.actionButton, className)} {...props}>
      {children}
    </button>
  );
};

export default ActionButton;
