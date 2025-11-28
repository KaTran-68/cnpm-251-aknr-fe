import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { IoPersonCircleOutline, IoChevronDown } from "react-icons/io5";
import logoTSS from "../../assets/images/logoTSS.png";
import { useParams } from "react-router-dom";



const Header = ({ onAvatarClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { role } = useParams();
  const actualRole = localStorage.getItem('role');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAccountInfo = () => {
    setIsDropdownOpen(false);
    navigate(`/${role}/account`);
    if (onAvatarClick) {
      onAvatarClick();
    }
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // Add logout logic here
    console.log("Logout clicked");
  };

  const handleLogoClick = () => {
    const role = localStorage.getItem('role') || 'tutor';
    navigate(`/${role}/home`);
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.brand} onClick={handleLogoClick}>
        <img src={logoTSS} alt="TSS logo" className={styles.logo} />
      </div>
      <div className={styles.userMenu} ref={dropdownRef}>
        <button 
          className={styles.avatar} 
          onClick={toggleDropdown} 
          aria-label="User menu"
          aria-expanded={isDropdownOpen}
        >
          <IoPersonCircleOutline size={44} />
        </button>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <button className={styles.dropdownItem} onClick={handleAccountInfo}>
              Quản lý tài khoản
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
