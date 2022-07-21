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
  state: joi.string().required(),
  city: joi.string().required(),

  phone: joi.string().max(12).messages({
    "string.max": "Max Phone number should be 11 digits",
  }),
  account: joi.string().required(),
  password: joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .messages({
      "string.empty": "No Password provided",
      "string.pattern.base":
        "minmum of 3 characters must contain lowercase, uppercase and number",
    }),
});

module.exports = {
  RegisterSchema,
};
