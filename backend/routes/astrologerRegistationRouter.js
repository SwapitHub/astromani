const express = require("express");

const astrologerRoutes = express.Router();

const {
  getAstrologerList,
  updateAstroStatus,
  getAstrologerDetail,
  registerAstrologer,
  deleteAstrologerList,
  updateAstroAnyField,
  getAllAstrologersWithWallet,
  getAllAstrologersWithWalletDetail,
  resetPassword,
  requestPasswordReset,
  postAstrologerLogin,
} = require("../controllers/astrologerController");

const upload = require("../middlewares/multerConfig");

astrologerRoutes.get(
  "/get-all-astrologer-with-wallet-detail/:mobileNumber",
  getAllAstrologersWithWalletDetail
);

astrologerRoutes.get(
  "/get-all-astrologer-with-wallet",
  getAllAstrologersWithWallet
);

astrologerRoutes.get("/astrologer-list", getAstrologerList);

astrologerRoutes.delete(
  "/delete-astrologer-list/:mobileNumber",
  deleteAstrologerList
);

astrologerRoutes.get("/astrologer-detail/:mobileNumber", getAstrologerDetail);

astrologerRoutes.post("/astrologer-email-login", postAstrologerLogin);
astrologerRoutes.post(
  "/astrologer-request-Password-Reset",
  requestPasswordReset
);
astrologerRoutes.post("/astrologer-reset-password", resetPassword);

astrologerRoutes.post(
  "/astrologer-registration",
  upload.fields([
    { name: "aadhaarCard", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  registerAstrologer
);

astrologerRoutes.put("/update-astro-status/:id", updateAstroStatus);
astrologerRoutes.put(
  "/put-any-field-astrologer-registration/:mobileNumber",
  upload.fields([
    { name: "aadhaarCard", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  updateAstroAnyField
);

module.exports = { astrologerRoutes };
