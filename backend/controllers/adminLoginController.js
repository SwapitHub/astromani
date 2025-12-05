const Admin = require("../models/adminLoginModel");
const bcrypt = require("bcrypt");





const getAdminData = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Failed to get admins", error: err });
  }
}

const addAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ email, password }); // Will be hashed
    await newAdmin.save();

    res.status(201).json({ message: "New admin added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding admin", error: err.message });
  }
};


const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    // Hash new password before saving
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password", error: err.message });
  }
};

const updateAdminById = async (req, res) => {
  const { id } = req.params;   // or req.body.id
  const updates = req.body;    // incoming fields to update

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // If password is being updated → hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Apply updates
    Object.assign(admin, updates);

    // Save updated admin
    await admin.save();

    res.status(200).json({
      message: "Admin updated successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating admin",
      error: err.message,
    });
  }
};


const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
console.log(email, password,"======");

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful", admin });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};




module.exports = {
    getAdminData,
    changePassword,
    loginAdmin,
    addAdmin,
    updateAdminById
}