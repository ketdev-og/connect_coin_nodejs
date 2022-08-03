const {
    models: { Deposit },
  } = require("../service/db/sequelize");

  const makeDeposite = async (req,res,next) =>{
    const {id,account, amount} = req.body;
    const user = await Deposit.create({
        account:account,
        amount:amount
    })

    if (!user)
    throw createHttpError.InternalServerError("Unable to create new deposit");
}

module.exports = {makeDeposite}