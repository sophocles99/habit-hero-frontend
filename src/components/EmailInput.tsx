import { useState } from "react";
import { ChangeEvent, Dispatch } from "react";
import { checkEmail } from "../api";
import validateEmail from "../utils/validateEmail";
import styles from "../styles/form.module.css";

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

  const handleBlur = async (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (validateEmail(newEmail)) {
      const { status } = await checkEmail(email);
      if (status === 200) {
        setEmailValid(true);
        setEmailDuplicate(false);
      } else {
        setEmailValid(false);
        setEmailDuplicate(true);
      }
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
        onBlur={handleBlur}
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
          emailDuplicate ? "" : styles["hidden"]
        }`}
      >
        Email already in use. Please select another email address or login
      </p>
    </label>
  );
};

export default EmailInput;
