import React, { useState } from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/Navbar/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  let navigate = useNavigate();

  const handleUserIconClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const confirmHandle = () => {
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <header className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logoimg} src={logo} alt="" />
        </div>
        <div onClick={handleUserIconClick}>
          <FaRegUserCircle className={styles.user} />
          {isUserMenuOpen && (
            <div className={styles.userMenu}>
              <div className={styles.message}>
                <h3>
                  {" "}
                  <IoIosWarning className={styles.warn} /> Log Out
                </h3>
                <p>Are you sure want to log out?</p>
              </div>
              <div className={styles.btn}>
                <button>Delete</button>
                <button onClick={confirmHandle}>Confirm</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
