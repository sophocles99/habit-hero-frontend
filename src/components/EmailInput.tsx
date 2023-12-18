import { useState } from "react";
import { ChangeEvent, Dispatch } from "react";
import { checkEmail } from "../api";
import validateEmail from "../utils/validateEmail";
import styles from "../styles/form.module.css";

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<string>;
  setEmailValid: Dispatch<boolean>;
};

const EmailInput = ({ email, setEmail, setEmailValid }: EmailInputProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = async (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (validateEmail(newEmail)) {
      const { status } = await checkEmail(email);
      if (status === 200) {
        setEmailValid(true);
        setErrorMessage("");
      } else {
        setEmailValid(false);
        setErrorMessage(
          "Email already in use. Please select another email address or login"
        );
      }
    } else {
      setEmailValid(false);
      setErrorMessage("Please enter a valid email address");
    }
  };

  return (
    <label htmlFor="email" className={styles["form-label"]}>
      <p>Email Address</p>
      <input
        type="email"
        id="email"
        className={styles["form-input"]}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
      />
      {errorMessage ? <p className={styles["error"]}>{errorMessage}</p> : ""}
    </label>
  );
};

export default EmailInput;
