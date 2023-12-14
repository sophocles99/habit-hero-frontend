export const passwordRules: PasswordRulesType = [
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
