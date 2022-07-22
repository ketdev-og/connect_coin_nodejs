const joi = require("@hapi/joi");

const RegisterSchema = joi.object({
  first_name: joi.string().required().messages({
    'string.empty': "No FirstName provided",
  }),
  last_name: joi.string().required().messages({
    "string.required": "No LastName provided",
  }),
  email: joi.string().required().email().messages({
    "string.required": "No Email provided",
    "string.email": "Provide a valid email address",
  }),
  country: joi.string().required(),
  username: joi.string().required(),
  state: joi.string().required(),
  city: joi.string().required(),

  phone: joi.string().max(12).messages({
    "string.max": "Max Phone number should be 11 digits",
  }),
  account: joi.string().required(),
  password: joi.string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/)
    .required()
    .messages({
      "string.min": "Must have at least 8 characters",
      "object.regex": "Must have at least 8 characters",
      "string.pattern.base": "Should conatin a upper and lower case letters and a number"
    }),
    confirm_password:joi.any().valid(joi.ref('password'))
});

module.exports = {
  RegisterSchema,
};
