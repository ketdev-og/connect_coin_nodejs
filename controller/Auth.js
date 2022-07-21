const {RegisterSchema} = require('../service/validations/RegisterSchema');
const jwt = require('jsonwebtoken')
const {
  models: { User },
} = require("../service/db/sequelize");
const createHttpError = require('http-errors');
const { token } = require('morgan');

const registerController = ("/register", async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1hr",
    issuer: "collectCoin.com",
  };
    const result = await RegisterSchema.validateAsync(req.body);
    const email = result.email
    const verifyEmail = await User.findOne({ where: { email: email } })

    if(verifyEmail) throw createHttpError("email already exist")

    const newUser =  await User.create({...result});
   
    if(newUser){
     jwt.sign({...newUser}, secret, options,(err, userToken) => {
        res.send({token:userToken});
      })
    }else{
      res.status(404).json({ error : "User does not exist" });
    }
    
    
 
});

module.exports = {registerController}