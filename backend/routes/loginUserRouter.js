const express = require("express");
const {
  getUserLogin,
  getUserLoginDetail,
  updateUser,
  setUserLogin,
  getAllUsersWithWallet,
  getAllUsersWithWalletDetail,
  postUserEmailLogin,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/loginUserController");

const AuthRoutes = express.Router();

// AuthRoutes.use(verifyCommonToken);
AuthRoutes.get("/get-all-users-with-wallet-detail/:phone", getAllUsersWithWalletDetail);

AuthRoutes.get("/get-all-users-with-wallet", getAllUsersWithWallet);
AuthRoutes.get("/user-login", getUserLogin);
AuthRoutes.get("/user-login-detail/:query", getUserLoginDetail);
AuthRoutes.put("/update-user/:phoneOrId", updateUser);
AuthRoutes.post("/user-email-login", postUserEmailLogin);
AuthRoutes.post("/user-request-Password-Reset", requestPasswordReset);
AuthRoutes.post("/user-reset-password", resetPassword);
AuthRoutes.post("/user-login", setUserLogin);

module.exports = { AuthRoutes };
