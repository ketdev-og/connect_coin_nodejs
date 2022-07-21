const express = require("express");
const {registerController} = require("../controller/Auth");
const { verifyAccessToken } = require("../middleware/Auth");
const router = express.Router();

router.post("/register", registerController);
router.get("/login", verifyAccessToken, (req,res)=>{
   res.send(req.payload.dataValues.email);
})


module.exports = router;