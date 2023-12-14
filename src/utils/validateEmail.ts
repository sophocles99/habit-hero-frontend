import Joi from "joi";

const validateEmail = (email: string) => {
  const { error } = Joi.string()
    .email({ tlds: { allow: false } })
    .validate(email);
  return !error;
};

export default validateEmail;
