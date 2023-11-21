import { FormEvent, useState } from "react";
import { register } from "../httpRequests";
import styles from "../styles/Register.module.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(username, password);
  };

  return (
    <form className={styles.register} onSubmit={handleSubmit}>
      <h1>Register</h1>
      <label htmlFor="username" className={styles["register-label"]}>
        <p>Username</p>
        <input
          type="text"
          id="username"
          className={styles["register-input"]}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="password" className={styles["register-label"]}>
        <p>Password</p>
        <input
          type="password"
          id="password"
          className={styles["register-input"]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="confirm-password" className={styles["register-label"]}>
        <p>Confirm Password</p>
        <input
          type="password"
          id="confirm-password"
          className={styles["register-input"]}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button className={styles["register-button"]}>Register</button>
    </form>
  );
};
