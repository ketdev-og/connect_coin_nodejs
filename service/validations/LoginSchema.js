const joi = require("@hapi/joi");

const LoginSchema = joi.object({
  email: joi.string().required().email().message({
    "string.required":"No Email provided",
    "string.email":"Provide a valid email address"
  }),
  password: joi.string()
  .min(8)
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/)
  .required()
  .messages({
    "string.min": "Must have at least 8 characters",
    "object.regex": "Must have at least 8 characters",
    "string.pattern.base": "should conatin a upper and lower case letters and a number"
  }),
});

module.exports = {LoginSchema}
