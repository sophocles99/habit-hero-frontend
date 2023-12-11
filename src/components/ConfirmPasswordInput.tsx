import { ChangeEvent, Dispatch } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/form.module.css";

type ConfirmPasswordInputProps = {
  confirmPassword: string;
  setConfirmPassword: Dispatch<string>;
  confirmPasswordValid: ValidState;
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
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordValid(newConfirmPassword === password);
  };

  return (
    <label htmlFor="confirm-password" className={styles["form-label"]}>
      <p>Confirm Password</p>
      <input
        type="password"
        id="confirm-password"
        className={styles["form-input"]}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <div className={confirmPasswordValid === null ? styles["hidden"] : ""}>
        {confirmPasswordValid ? (
          <p>
            <FontAwesomeIcon icon={faCheck} className={styles["valid"]} />{" "}
            Passwords match
          </p>
        ) : (
          <p className={styles["error"]}>Passwords do not match</p>
        )}
      </div>
    </label>
  );
};

export default ConfirmPasswordInput;
