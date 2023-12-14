import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { registerUser } from "../api";
import styles from "../styles/form.module.css";

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState<ValidState>(null);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState<ValidState>(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] =
    useState<ValidState>(null);

  const [registerSuccess, setregisterSuccess] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { status, data, errorMessage } = await registerUser(
      email,
      name,
      password
    );
    console.log({ status, data, errorMessage });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <h1>Welcome to Habit Hero!</h1>
      <h2>
        Please register or <Link to="/login">login</Link>
      </h2>

      <label htmlFor="name" className={styles["form-label"]}>
        <p>Name</p>
        <input
          ref={nameRef}
          type="text"
          id="name"
          className={styles["form-input"]}
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <EmailInput
        email={email}
        setEmail={setEmail}
        emailValid={emailValid}
        setEmailValid={setEmailValid}
      />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        passwordValid={passwordValid}
        setPasswordValid={setPasswordValid}
      />
      <ConfirmPasswordInput
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        confirmPasswordValid={confirmPasswordValid}
        setConfirmPasswordValid={setConfirmPasswordValid}
        password={password}
      />
      <button className={styles["form-button"]}>Register</button>
    </form>
  );
};

export default Register;
