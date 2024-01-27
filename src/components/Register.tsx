import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { registerUser } from "../api";
import styles from "../styles/form.module.css";
import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";

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

  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValidCheck = validateEmail(email);
    const passwordValidCheck = validatePassword(password);
    if (!emailValidCheck || !passwordValidCheck) {
      setRegisterError("Registration unsuccessful");
      return;
    }
    const { status, errorMessage } = await registerUser(email, name, password);
    if (status === 201) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRegisterSuccess(true);
      return;
    } else if (status >= 0 && errorMessage) {
      setRegisterError(errorMessage);
    } else {
      setRegisterError("Registration unsuccessful");
      console.log(status, errorMessage);
    }
  };

  return (
    <>
      {registerSuccess ? (
        <>
          <h1>You have successfully registered!</h1>
          <h2>
            Please <Link to="/login">login</Link>
          </h2>
        </>
      ) : (
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
          <h1>Welcome to Habit Hero!</h1>
          <h2>
            Please register or <Link to="/login">login</Link>
          </h2>
          <p className={registerError ? styles["error"] : styles["hidden"]}>
            {registerError}
          </p>
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
          <button
            className={styles["form-button"]}
            disabled={
              emailValid && passwordValid && confirmPasswordValid ? false : true
            }
          >
            Register
          </button>
        </form>
      )}
    </>
  );
};

export default Register;
