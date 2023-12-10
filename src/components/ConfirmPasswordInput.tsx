import { ChangeEvent, Dispatch, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/form.module.css";

type ConfirmPasswordInputProps = {
  confirmPassword: string;
  setConfirmPassword: Dispatch<string>;
  confirmPasswordValid: boolean;
  setConfirmPasswordValid: Dispatch<boolean>;
  password: string;
};

const ConfirmPasswordInput = ({
  confirmPassword,
  setConfirmPassword,
  confirmPasswordValid,
  setConfirmPasswordValid,
  password,
}: ConfirmPasswordInputProps) => {
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordValid(newConfirmPassword === password);
  };

  return (
    <label
      htmlFor="confirm-password"
      className={styles["form-label"]}
      onFocus={() => setConfirmPasswordFocus(true)}
      onBlur={() => setConfirmPasswordFocus(false)}
    >
      <p>Confirm Password</p>
      <input
        type="password"
        id="confirm-password"
        className={styles["form-input"]}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <div
        className={`${styles["password-feedback"]} ${
          confirmPasswordFocus ? "" : styles["hidden"]
        }`}
      >
        {confirmPasswordValid && confirmPasswordFocus ? (
          <p>
            <FontAwesomeIcon icon={faCheck} className={styles["valid"]} /> Match
          </p>
        ) : (
          <p className={styles["error"]}>Passwords do not match</p>
        )}
      </div>
    </label>
  );
};

export default ConfirmPasswordInput;
