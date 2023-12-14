import { passwordRules } from "./passwordRules";

const validatePassword = (password: string) => {
  let passwordValid = true;
  const rulesSatisfied = passwordRules.map((rule) => {
    const isRuleSatisfied = rule.regex.test(password);
    if (!isRuleSatisfied) passwordValid = false;
    return isRuleSatisfied;
  });
  return { passwordValid, rulesSatisfied };
};

export default validatePassword;
