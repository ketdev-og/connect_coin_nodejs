const {
    models: { Withdraw, User },
    sequelize,
  } = require("../service/db/sequelize");
  
  const makeWithdraw = async (req, res, next) => {
    const { id, account, amount } = req.body;
  
    try {
      const withdraw = await Withdraw.create({
        account: account,
        amount: amount,
        paymentmethod:paymentmethod,
        userId: id,
      });
  
      if (!deposit)
        throw createHttpError.InternalServerError("Unable to create deposit");
  
      res.send({
        status: 200,
        withdraw: withdraw,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const getWithdraws = async (req, res, next) => {
    try {
      const withdraw = await Withdraw.findAll();
      if (!deposits) throw createHttpError.InternalServerError();
      res.send({
        status: 200,
        withdraw: withdraw,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const getUserWithdraws = async (req, res, next) => {
    const { id } = req.body;
    try {
      const user = await User.findByPk(id, { include: ["withdraws"] });
      if (!user) throw createHttpError.InternalServerError();
      const { withdraws } = user;
      const lastWithdraw = Number(withdraws[withdraws.length - 1].amount);
      const allWithdraws = [];
      let totalWithdraws = 0;
  
      await deposits.map((deposit) => {
        return allWithdraws.push(Number(deposit.amount));
      });
  
      totalWithdraws = allWithdraws.reduce((a, b) => a + b, 0)
  
      res.send({
        status: 200,
        withdraws: allWithdraws,
        lastWithdraw:lastWithdraw,
        totalWithdraws:totalWithdraws
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { makeWithdraw, getWithdraws, getUserWithdraws };
  