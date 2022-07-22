const { RegisterSchema } = require("../service/validations/RegisterSchema");
const { LoginSchema } = require("../service/validations/LoginSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  models: { User },
} = require("../service/db/sequelize");
const createHttpError = require("http-errors");
const secret = process.env.JWT_SECRET;
const saltRounds = 10;
const options = {
  expiresIn: "1hr",
  issuer: "collectCoin.com",
};

const registerController =
  ("/register",
  async (req, res, next) => {
    try {
      const result = await RegisterSchema.validateAsync(req.body);
      const email = result.email;
      const verifyEmail = await User.findOne({ where: { email: email } });

      if (verifyEmail) throw createHttpError.Conflict("email already exist");
      const password = result.password;

      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({ ...result, password: hashPassword });
      if (!newUser)
        throw createHttpError.InternalServerError("unable to create new user");

      jwt.sign({ ...newUser }, secret, options, (err, userToken) => {
        res.send({ status:200,token: userToken });
      });
    } catch (error) {
      if (error.isJoi === true)
      return next(createHttpError.BadRequest({status:400,error:error.message}));
      next(error);
    }
  });

const loginController = async (req, res, next) => {
  try {
    const { email, password } = await LoginSchema.validateAsync(req.body);

    const user = await User.findOne({ where: { email: email } });
    if (!user) throw createHttpError.NotFound("invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw createHttpError.Unauthorized("invalid email or password");

    await jwt.sign({ ...user }, secret, options, (err, userToken) => {
      if (err) throw createHttpError.Conflict("unable to create token");
      res.send({ status:200,token: userToken });
    });
  } catch (error) {
    if (error.isJoi === true)
      return next(createHttpError.BadRequest({status:400,error:error.message}));
    next(error);
  }
};

module.exports = { registerController, loginController };
