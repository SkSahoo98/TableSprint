import React, { useState } from "react";
import styles from "./loginform.module.css";
import logo from "../../assets/Form/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const formHandle = (e) => {
    e.preventDefault();
    if (email === "user@gmail.com" && password === "password") {
      let payload = {
        Email: email,
        Password: password,
      };
      console.log(payload);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password. Please try again.");
      setEmail("")
      setPassword("")
    }
  };

  const handleRecovery = (e) => {
    e.preventDefault();
    console.log("Recovery email:", recoveryEmail);
    setRecoveryEmail("");
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.form}>
          <form action="">
            <div className={styles.header}>
              <img src={logo} alt="" className={styles.logo} />
              <p>Welcome To TableSprint admin</p>
            </div>

            <div className="field">
              <div className={styles.entryarea}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.label}>Email-Id</div>
              </div>
              <div className={styles.entryarea}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.label}>Password</div>
                <span
                  className={styles.passwordToggle}
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className={styles.forgot}>
                <span onClick={() => setShowModal(true)}>
                  {" "}
                  Forgot Password?
                </span>
              </div>
            </div>

            <div className={styles.btn}>
              <button
                className={styles.button}
                type="submit"
                onClick={formHandle}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h2>Did you forget password?</h2>
              <p>
                Enter your email address and we'll send you a link to restore
                password
              </p>
            </div>
            <form action="">
              <div className={styles.entryarea}>
                <input
                  type="email"
                  required
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                />
                <div className={styles.label}>Email-Id</div>
              </div>
              <div className={styles.btn}>
                <button
                  className={styles.button}
                  type="submit"
                  onClick={handleRecovery}
                >
                  Request reset link
                </button>
              </div>
            </form>
            <div
              className={styles.closeModal}
              onClick={() => setShowModal(false)}
            >
              Back to log in
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginForm;
