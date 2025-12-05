const express = require("express");
const { setSendRegistration, sendEmailAdminTansAmountAstro, getTransactionsByAstrologerId } = require("../controllers/emailController");
const emailRouter = express.Router();

emailRouter.post("/send-registration-email", setSendRegistration);

emailRouter.post("/send-email-sendEmail-admin-tans-amount-astro", sendEmailAdminTansAmountAstro);

emailRouter.get("/get-payment-transition-list-astro/:astrologer_id", getTransactionsByAstrologerId);

module.exports = emailRouter;
