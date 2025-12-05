const express = require("express");
const { getAdminData, changePassword, addAdmin, updateAdminById } = require("../controllers/adminLoginController");

const adminRoutes = express.Router();

// Get all admins
adminRoutes.get("/admin", getAdminData);
adminRoutes.post("/admin/change-password", changePassword);
adminRoutes.post("/admin/store-email-password", addAdmin);
adminRoutes.put("/admin/update-email-password/:id", updateAdminById);

module.exports = adminRoutes;
