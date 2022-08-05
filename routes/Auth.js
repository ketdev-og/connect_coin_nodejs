const express = require("express");
const {registerController, loginController} = require("../controller/Auth");
const { makeDeposite, getDeposits, getUserDepsoits } = require("../controller/Deposite");
const {getUserController, updateUserController, getAllUsersController, getCounts, getUserById, deleteUser} = require('../controller/Users')
const { verifyAccessToken } = require("../middleware/Auth");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/users", getAllUsersController);
router.get("/counts", getCounts);
router.get("/user",verifyAccessToken, getUserController);
router.post("/update_user",verifyAccessToken, updateUserController);
router.post("/userbyid", getUserById);
router.post("/deleteuser", deleteUser);

router.post("/add/deposit", makeDeposite);
router.get("/deposits", getDeposits);
router.post("/user/deposit", getUserDepsoits)



module.exports = router;