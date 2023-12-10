import Joi from "joi";
import styles from "../styles/form.module.css";
import { ChangeEvent, Dispatch } from "react";

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<string>;
  emailValid: boolean;
  setEmailValid: Dispatch<boolean>;
};

const EmailInput = ({
  email,
  setEmail,
  emailValid,
  setEmailValid,
}: EmailInputProps) => {
  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { error } = Joi.string()
      .email({ tlds: { allow: false } })
      .validate(e.target.value);
    setEmailValid(!error);
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
        onBlur={validateEmail}
      />
      <p className={`${styles["error"]} ${emailValid ? styles["hidden"] : ""}`}>
        Please enter a valid email address
      </p>
    </label>
  );
};

export default EmailInput;
