import { useState } from "react";
import styles from "../styles/form.module.css";
import BackButton from "./BackButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <BackButton />
      <form className={styles["form-container"]}>
        <h1>Login</h1>
        <label htmlFor="email" className={styles["form-label"]}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className={styles["form-input"]}
          />
        </label>
        <label htmlFor="password" className={styles["form-label"]}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className={styles["form-input"]}
          />
        </label>
        <button className={styles["form-button"]}>Login</button>
      </form>
    </>
  );
};

export default Login;
