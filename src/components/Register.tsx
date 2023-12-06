import { FormEvent, useState } from "react";
import { registerUser } from "../api";
import styles from "../styles/form.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, name, password);
    const { data, error } = await registerUser(email, name, password);
    console.log(data);
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <h1>Welcome to Habit Hero!</h1>
      <h2>
        Please register or <Link to="/login">login</Link>
      </h2>
      <label htmlFor="email" className={styles["form-label"]}>
        <p>Email Address</p>
        <input
          type="email"
          id="email"
          className={styles["form-input"]}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="name" className={styles["form-label"]}>
        <p>Name</p>
        <input
          type="text"
          id="name"
          className={styles["form-input"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="password" className={styles["form-label"]}>
        <p>Password</p>
        <input
          type="password"
          id="password"
          className={styles["form-input"]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="confirm-password" className={styles["form-label"]}>
        <p>Confirm Password</p>
        <input
          type="password"
          id="confirm-password"
          className={styles["form-input"]}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button className={styles["form-button"]}>Register</button>
    </form>
  );
};

export default Register;
