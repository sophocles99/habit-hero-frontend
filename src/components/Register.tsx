import { ChangeEvent, FormEvent, useState } from "react";
import Joi from "joi";
import { registerUser } from "../api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/form.module.css";

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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordRulesSatisfied, setPasswordRulesSatisfied] = useState(
    Array(passwordRules.length).fill(false)
  );
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(email, name, password);
  };

  const validateEmail = () => {
    const { error } = Joi.string()
      .email({ tlds: { allow: false } })
      .validate(email);
    const isEmailValid = !error;
    setEmailValid(isEmailValid);
  };

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

  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <h1>Welcome to Habit Hero!</h1>
      <h2>
        Please register or <Link to="/login">login</Link>
      </h2>
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
          className={`${styles["email-error"]} ${
            emailValid ? styles["hidden"] : ""
          }`}
        >
          Please enter a valid email address
        </p>
      </label>
      <label htmlFor="name" className={styles["form-label"]}>
        <p>Name</p>
        <input
          type="text"
          id="name"
          className={styles["form-input"]}
          maxLength={20}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
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
        <p
          className={`${styles["error"]} ${
            !passwordValid && !passwordFocus ? "" : styles["hidden"]
          }`}
        >
          Please enter a valid password
        </p>
        <div
          className={`${styles["password-feedback"]} ${
            passwordFocus ? "" : styles["hidden"]
          }`}
        >
          {passwordRules.map((rule, index) => (
            <p key={index}>
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  passwordRulesSatisfied[index]
                    ? styles["valid"]
                    : styles["hidden"]
                }
              />{" "}
              {rule.description}
            </p>
          ))}
        </div>
      </label>
      <label htmlFor="confirm-password" className={styles["form-label"]}>
        <p>Confirm Password</p>
        <input
          type="password"
          id="confirm-password"
          className={styles["form-input"]}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button className={styles["form-button"]}>Register</button>
    </form>
  );
};

export default Register;
