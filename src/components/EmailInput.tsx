import { useState } from "react";
import Joi from "joi";
import styles from "../styles/form.module.css";
import { ChangeEvent, Dispatch } from "react";
import { checkEmail } from "../api";

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<string>;
  emailValid: ValidState;
  setEmailValid: Dispatch<boolean>;
};

const EmailInput = ({
  email,
  setEmail,
  emailValid,
  setEmailValid,
}: EmailInputProps) => {
  const [emailDuplicate, setEmailDuplicate] = useState<ValidState>(null);

  const validateEmail = async (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const { error } = Joi.string()
      .email({ tlds: { allow: false } })
      .validate(email);
    if (!error) {
      setEmailValid(true);
      const { status } = await checkEmail(email);
      console.log(status === 200);
      setEmailDuplicate(status === 200);
    } else {
      setEmailValid(false);
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
        onBlur={validateEmail}
      />
      <p
        className={`${styles["error"]} ${
          emailValid !== false ? styles["hidden"] : ""
        }`}
      >
        Please enter a valid email address
      </p>
      <p
        className={`${styles["error"]} ${
          emailDuplicate !== false ? styles["hidden"] : ""
        }`}
      >
        Email already in use. Please select another email address or login
      </p>
    </label>
  );
};

export default EmailInput;
