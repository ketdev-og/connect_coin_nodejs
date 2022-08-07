const createHttpError = require('http-errors');

const {
  models: {
    User,
    Deposit,
    Withdraw
  },
} = require("../service/db/sequelize");

const getUserController = async (req, res, next) => {
  try {

    userId = req.payload.dataValues.id;

    if (!userId) throw createHttpError.Unauthorized("Invalid user Id");

    const user = await User.findOne({
      where: {
        id: userId
      }
    });
    if (!user) throw createHttpError.NotFound("User not found");

    res.send({
      status: 200,
      user: user
    });
  } catch (error) {
    next(error)
  }
};

const getUserById = async (req, res, next) => {
  try {
    userId = req.body.id;

    if (!userId) throw createHttpError.BadRequest("Invalid user Id");

    const user = await User.findOne({
      where: {
        id: userId
      }
    });
    if (!user) throw createHttpError.NotFound("User not found");

    res.send({
      status: 200,
      user: user
    });
  } catch (error) {
    next(error)
  }
};

const updateUserController = async (req, res, next) => {
  try {
    userId = req.payload.dataValues.id;
    if (!userId) throw createHttpError.Unauthorized("Invalid user Id");
    const user = await User.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    if (!user) throw createHttpError.NotFound("User not found");
    res.send({
      status: 200,
      user: user
    });
  } catch (error) {
    next(error);
  }
}

const getAllUsersController = async (req, res, next) => {
  try {
    const usersData = []
    const users = await User.findAll();
    if (!users) throw createHttpError.InternalServerError();
    users.map(user => {
      const userDetail = {
        ...user.dataValues,
        createdAt: new Date(user.createdAt).toDateString()
      }
      usersData.push(userDetail)

    })
    res.send({
      status: 200,
      user: usersData
    });
  } catch (error) {
    next(error);
  }
}

const getCounts = async (req, res, next) => {
  try {
    const userCount = await User.count();
    const depositCount = await Deposit.count()
    const withCount = await Withdraw.count()
    if (!userCount) throw createHttpError.InternalServerError();
    res.send({
      status: 200,
      counts: {
        userCount: userCount,
        withdrawalCount: withCount,
        depositCount: depositCount
      }
    });
  } catch (error) {
    next(error)
  }

}

const deleteUser = async (req, res, next) => {
  try {
    userId = req.body.id;

    if (!userId) throw createHttpError.BadRequest("Invalid user Id");

    const user = await User.destroy({
      where: {
        id: userId
      }
    });
    if (!user) throw createHttpError.NotFound("User not found");

    res.send({
      status: 200,
      user: "user deleted"
    });
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getUserController,
  updateUserController,
  getAllUsersController,
  getCounts,
  getUserById,
  deleteUser
}