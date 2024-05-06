import { ChangeEvent, Dispatch, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/form.module.css";
import validatePassword from "../utils/validatePassword";
import { passwordRules } from "../utils/passwordRules";

type PasswordInputProps = {
  password: string;
  setPassword: Dispatch<string>;
  passwordValid: ValidState;
  setPasswordValid: Dispatch<boolean>;
};

const PasswordInput = ({
  password,
  setPassword,
  passwordValid,
  setPasswordValid,
}: PasswordInputProps) => {
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordRulesSatisfied, setPasswordRulesSatisfied] = useState(
    Array(passwordRules.length).fill(false)
  );

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const { passwordValid, rulesSatisfied } = validatePassword(newPassword);
    setPasswordValid(passwordValid);
    setPasswordRulesSatisfied(rulesSatisfied);
  };

  const passwordRulesDisplay = (
    <>
      {passwordRules.map((rule, index) => (
        <p key={index}>
          <FontAwesomeIcon
            icon={faCheck}
            className={
              passwordRulesSatisfied[index] ? styles["valid"] : styles["hidden"]
            }
          />{" "}
          {rule.description}
        </p>
      ))}
    </>
  );

  return (
    <label
      htmlFor="password"
      className={styles["form-label"]}
      onFocus={() => setPasswordFocus(true)}
      onBlur={() => setPasswordFocus(false)}
    >
      <p>Password {passwordFocus}</p>
      <input
        type="password"
        id="password"
        className={styles["form-input"]}
        value={password}
        onChange={handlePasswordChange}
        onBlur={handlePasswordChange}
      />
      <div
        className={
          passwordValid === null && !passwordFocus ? styles["hidden"] : ""
        }
      >
        {passwordFocus ? (
          passwordRulesDisplay
        ) : passwordValid ? (
          <p>
            <FontAwesomeIcon icon={faCheck} className={styles["valid"]} />{" "}
            Password valid
          </p>
        ) : (
          <p className={styles["error"]}>Please enter a valid password</p>
        )}
      </div>
    </label>
  );
};

export default PasswordInput;
