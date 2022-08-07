const {
  models: { Deposit, User },
  sequelize,
} = require("../service/db/sequelize");
const createHttpError =  require("http-errors")
const makeDeposite = async (req, res, next) => {
  const { id, account, amount } = req.body;

  try {
    const deposit = await Deposit.create({
      account: account,
      amount: amount,
      userId: id,
    });

    if (!deposit)
      throw createHttpError.InternalServerError("Unable to create deposit");

    res.send({
      status: 200,
      deposit: deposit,
    });
  } catch (error) {
    next(error);
  }
};

const getDeposits = async (req, res, next) => {
  try {
    const usersData = []
    const deposits = await Deposit.findAll();
    if (!deposits) throw createHttpError.InternalServerError();
    
    deposits.map(user => {
      const userDetail = {
        ...user.dataValues,
        createdAt: new Date(user.createdAt).toDateString()
      }
      usersData.push(userDetail)
    })

    res.send({
      status: 200,
      deposits: usersData,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDepsoits = async (req, res, next) => {
  const { id } = req.payload.dataValues;
  const usersData = []
  try {
    const user = await User.findByPk(id, { include: ["deposits"] });
    if (!user) throw createHttpError.InternalServerError();
    const { deposits } = user;
    const lastDeposit = Number(deposits[deposits.length - 1].amount);
    const allDeposits = [];
    let totalDeposits = 0;
    deposits.map(user => {
      const userDetail = {
        ...user.dataValues,
        createdAt: new Date(user.createdAt).toDateString()
      }
      usersData.push(userDetail)

    })

    await deposits.map((deposit) => {
      return allDeposits.push(Number(deposit.amount));
    });

    totalDeposits = allDeposits.reduce((a, b) => a + b, 0)

    res.send({
      status: 200,
      deposits:usersData,
      depositsAmount: allDeposits,
      lastDeposit:lastDeposit,
      totalDeposits:totalDeposits
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { makeDeposite, getDeposits, getUserDepsoits };
