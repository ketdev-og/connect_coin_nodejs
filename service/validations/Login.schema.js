const joi = require("@hapi/joi");

const LoginSchema = joi.object({
  Email: joi.string().required().email().message({
    "string.required":"No Email provided",
    "string.email":"Provide a valid email address"
  }),
  Password: Joi.string().min(6).required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).message({
    "string.required":"No Password provided",
    "string.pattern.base":"minmum of 3 characters must contain lowercase, uppercase and number"
  }),
});
