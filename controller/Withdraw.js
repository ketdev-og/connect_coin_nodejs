const {
    models: { Withdraw, User },
    sequelize,
  } = require("../service/db/sequelize");
  
  const makeWithdraw = async (req, res, next) => {
    const { account, amount, paymentmethod } = req.body;
    const { id } = req.payload.dataValues;
    try {
      const withdraw = await Withdraw.create({
        account: account,
        amount: amount,
        paymentmethod:paymentmethod,
        userId: id,
      });
  
      if (!withdraw)
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
      const usersData = []
      const withdraw = await Withdraw.findAll();
      
      if (!withdraw) throw createHttpError.InternalServerError();
     
      withdraw.map(user => {
        const userDetail = {
          ...user.dataValues,
          createdAt: new Date(user.createdAt).toDateString()
        }
        usersData.push(userDetail)
  
      })
      res.send({
        status: 200,
        withdraw: usersData,
      });
    } catch (error) {
      next(error);
    }
  };
  
  const getUserWithdraws = async (req, res, next) => {
    const { id } = req.payload.dataValues;
    const usersData = []
    
    try {
      const user = await User.findByPk(id, { include: ["withdraws"] });
      
      if (!user) throw createHttpError.InternalServerError();
      const { withdraws } = user;
      
      const lastWithdraw = Number(withdraws[withdraws.length - 1].amount);
      const allWithdraws = [];
      let totalWithdraws = 0;
  
      await withdraws.map((withdraw) => {
         allWithdraws.push(Number(withdraw.amount));
         const userDetail = {
          ...withdraw.dataValues,
          createdAt: new Date(user.createdAt).toDateString()
        }
        usersData.push(userDetail)
      });
  
      totalWithdraws = allWithdraws.reduce((a, b) => a + b, 0)
  
      res.send({
        status: 200,
        userWithdraws:usersData,
        withdraws: allWithdraws,
        lastWithdraw:lastWithdraw,
        totalWithdraws:totalWithdraws
      });
    } catch (error) {
      next(error);
    }
  };
  
  const approveWithDraw = async(req, res, next) => {
    console.log(req.body);
    const {id}  = req.body;
    const withdraw = await Withdraw.update(
      {
          status:"successfull"
      },
      {
      where:{
        id:id
      }
    }
    
    );

  }
  module.exports = { makeWithdraw, getWithdraws, getUserWithdraws, approveWithDraw };
  