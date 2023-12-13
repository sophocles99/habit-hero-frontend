import { ChangeEvent, Dispatch, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/form.module.css";

type PasswordInputProps = {
  password: string;
  setPassword: Dispatch<string>;
  passwordValid: ValidState;
  setPasswordValid: Dispatch<boolean>;
};

const passwordRules = [
  {
    description: "At least one lowercase letter",
    regex: /.*[a-z]/,
  },
  {
    description: "At least one uppercase letter",
    regex: /.*[A-Z]/,
  },
  { description: "At least one number", regex: /.*\d/ },
  {
    description: "At least eight characters long",
    regex: /.{8,}/,
  },
];

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
    const newValue = e.target.value;
    setPassword(newValue);
    let allRulesSatisfied = true;
    setPasswordRulesSatisfied(
      passwordRules.map((rule) => {
        const isRuleSatisfied = rule.regex.test(newValue);
        if (!isRuleSatisfied) allRulesSatisfied = false;
        return isRuleSatisfied;
      })
    );
    setPasswordValid(allRulesSatisfied);
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
