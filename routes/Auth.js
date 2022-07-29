const express = require("express");
const {registerController, loginController} = require("../controller/Auth");
const {getUserController, updateUserController} = require('../controller/Users')
const { verifyAccessToken } = require("../middleware/Auth");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/user",verifyAccessToken, getUserController);
router.post("/update_user",verifyAccessToken, updateUserController);

module.exports = router;