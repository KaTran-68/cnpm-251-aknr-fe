import React from 'react';
import styles from './Notification.module.scss';

const Notification = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.tag}>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          <button className="btn btn-primary" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
