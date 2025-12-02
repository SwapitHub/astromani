const express = require("express");
const { setSendRegistration } = require("../controllers/emailController");
const emailRouter = express.Router();

emailRouter.post("/send-registration-email", setSendRegistration);

// emailRouter.post("/send-email-sendEmail-admin-tans-amount-astro", sendEmailAdminTansAmountAstro);


module.exports = emailRouter;
