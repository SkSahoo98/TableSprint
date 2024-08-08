import React from "react";
import styles from "./dashboard.module.css";
import logo from "../../assets/Form/logo.png";

const Dashboard = () => {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <img src={logo} alt="" />
        <h2>Welcome to TableSprint admin</h2>
      </div>
    </section>
  );
};

export default Dashboard;
