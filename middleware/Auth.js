const jsonwebtoken = require('jsonwebtoken')
const createError = require('http-errors')
const verifyAccessToken = (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized);
    const authHeader = req.headers["authorization"];
    const token = authHeader;
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        if (err.name == "JsonWebTokenError") {
          return next(createError.Unauthorized());
        } else {
          return next(createError.Unauthorized(err.message));
        }
      }
      req.payload = payload;
      console.log(req.payload.dataValues.id);
      
      next();
    });
  }

  module.exports = {verifyAccessToken}