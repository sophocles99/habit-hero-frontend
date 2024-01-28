import { FormEvent, useState } from "react";
import styles from "../styles/form.module.css";
import BackButton from "./BackButton";
import { login } from "../api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthState } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, errorMessage, data } = await login(email, password);
    if (status === 200) {
      if (data?.accessToken) {
        setEmail("");
        setPassword("");
        const name = data?.name ?? "";
        const accessToken = data.accessToken;
        setAuthState({ isLoggedIn: true, email, name, accessToken });
        return;
      } else {
        setErrorMessage("Unexpected error - please try again");
      }
    } else if (status >= 0 && errorMessage) {
      setErrorMessage(errorMessage);
    } else {
      setErrorMessage("Login unsuccessful");
      console.log(status, errorMessage);
    }
  };

  return (
    <>
      <BackButton />
      <form onSubmit={handleSubmit} className={styles["form-container"]}>
        <h1>Login</h1>
        <p className={errorMessage ? styles["error"] : styles["hidden"]}>
          {errorMessage}
        </p>
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
