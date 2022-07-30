const createHttpError = require('http-errors');
const {
  models: { User },
} = require("../service/db/sequelize");

const getUserController = async (req, res, next) => {
  try {

    userId = req.payload.dataValues.id;

    if (!userId) throw createHttpError.Unauthorized("Invalid user Id");

    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw createHttpError.NotFound("User not found");

    res.send({ status: 200, user: user });
  } catch (error) {
   
  }
};

const updateUserController = async (req, res, next) => {
  try {
    userId = req.payload.dataValues.id;
    if (!userId) throw createHttpError.Unauthorized("Invalid user Id");
    const user = await User.update(req.body, {
      where: { id: req.body.id }
    });
    if (!user) throw createHttpError.NotFound("User not found");
    res.send({ status: 200, user: user });
  } catch (error) {
    next(error);
  }
}




module.exports = { getUserController, updateUserController }