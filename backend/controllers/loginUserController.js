const { default: mongoose } = require("mongoose");
const UserLogin = require("../models/userLoginModel");
const WalletTransaction = require("../models/transactionsUserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


const JWT_SECRET = process.env.JWT_SECRET;

const getAllUsersWithWallet = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const matchConditions = [];

    matchConditions.push({
      "walletTransactions.0": { $exists: true },
    });
    matchConditions.push({ deleteUser: false });

    if (search) {
      matchConditions.push({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { mobileNumber: { $regex: search, $options: "i" } },
        ],
      });
    }

    // Aggregation pipeline
    const aggregatePipeline = [
      {
        $lookup: {
          from: "wallettransactions",
          localField: "_id",
          foreignField: "user_id",
          as: "walletTransactions",
        },
      },
      {
        $match: {
          $and: matchConditions,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    // Clone pipeline for count
    const countPipeline = [...aggregatePipeline, { $count: "total" }];
    const totalCountResult = await UserLogin.aggregate(countPipeline);
    const totalUsers = totalCountResult[0]?.total || 0;
    const totalPages = Math.ceil(totalUsers / limit);

    // Add pagination
    aggregatePipeline.push({ $skip: skip }, { $limit: limit });

    // Execute paginated query
    const users = await UserLogin.aggregate(aggregatePipeline);

    return res.status(200).json({
      message: "success",
      currentPage: page,
      totalPages,
      totalUsers,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users with wallet:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllUsersWithWalletDetail = async (req, res) => {
  try {
    const phone = req.params.phone;
    const { page = 1, limit = 10, search = "" } = req.query;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const user = await UserLogin.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Build search filter for transactions
    let filter = { user_id: user._id };
    if (search) {
      filter.$or = [
        { transactionId: { $regex: search, $options: "i" } }, // if transactionId field exists
        { type: { $regex: search, $options: "i" } }, // search by type (credit/debit/astro_product etc.)
        { status: { $regex: search, $options: "i" } }, // search by status (success/pending/failed)
      ];
    }

    // Pagination calculation
    const skip = (page - 1) * limit;

    const [transactions, totalCount] = await Promise.all([
      WalletTransaction.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      WalletTransaction.countDocuments(filter),
    ]);

    return res.status(200).json({
      message: "success",
      user,
      transactions,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page * limit < totalCount,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching user wallet details:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getUserLogin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || ""; // search query from client

    const skip = (page - 1) * limit;

    // Base filter: only users not marked as deleted
    const filter = { deleteUser: false };

    // If search query exists, add name regex condition
    if (search.trim() !== "") {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    // Count total users matching filter
    const totalUsers = await UserLogin.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    // Fetch paginated users
    const users = await UserLogin.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest first

    res.json({
      users,
      page,
      limit,
      totalUsers,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("Pagination error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch paginated user login data" });
  }
};

const getUserLoginDetail = async (req, res) => {
  try {
    const { query } = req.params;

    let searchCondition = { phone: query };

    if (mongoose.Types.ObjectId.isValid(query)) {
      searchCondition = { _id: new mongoose.Types.ObjectId(query) };
    }

    const loginUser = await UserLogin.findOne(searchCondition);

    if (!loginUser) {
      return res.status(404).json({ error: "Login detail not found" });
    }

    res.status(200).json({
      message: "success",
      data: loginUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user-login" });
  }
};

// 🟦 Update User by ID, Phone, or Email
const updateUser = async (req, res) => {
  try {
    const { phoneOrIdOrEmail } = req.params;
    const updateFields = req.body;

    if (!Object.keys(updateFields).length) {
      return res.status(400).json({
        error: "At least one field is required to update.",
      });
    }

    // ✅ Identify the type of identifier
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(phoneOrIdOrEmail);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrIdOrEmail);

    let query = {};

    if (isObjectId) {
      // Case 1: Update by MongoDB _id
      query = { _id: phoneOrIdOrEmail };
    } else if (isEmail) {
      // Case 2: Update by email
      query = { userEmail: phoneOrIdOrEmail };
    } else {
      // Case 3: Update by phone number
      query = { phone: phoneOrIdOrEmail };
    }

    // ✅ Try to find by the first method
    let updatedUser = await UserLogin.findOneAndUpdate(
      query,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    // ✅ If not found and it wasn’t ObjectId, try both email and phone as fallback
    if (!updatedUser && !isObjectId) {
      updatedUser = await UserLogin.findOneAndUpdate(
        {
          $or: [{ phone: phoneOrIdOrEmail }, { userEmail: phoneOrIdOrEmail }],
        },
        { $set: updateFields },
        { new: true, runValidators: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      message: "success",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      error: "Failed to update user",
      details: error.message,
    });
  }
};

// Step 1: Request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // ✅ Check if email exists
    const user = await UserLogin.findOne({ userEmail });
    if (!user) return res.status(404).json({ message: "Email not registered" });

    // ✅ Generate reset token valid for 15 minutes
    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // ✅ Send reset email
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@demoprojectwork.com",
        pass: "bQ|4TcE+Py1",
      },
    });

    const mailOptions = {
      from: `"Astromani App" <info@demoprojectwork.com>`,
      to: userEmail,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="http://localhost:3000/reset-password?token=${resetToken}">Reset Password</a>
        <p>This link is valid for 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to email." });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Ensure the new password is at least 6 characters
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserLogin.findById(decoded.id);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.userPassword = hashedPassword;

    // Save the new password
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};


const postUserEmailLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    console.log("Looking for user:", userEmail);

    const user = await UserLogin.findOne({ userEmail });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found, comparing password");

    const isMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("Password matched, generating JWT");

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is undefined!");
      return res.status(500).json({ message: "JWT secret is not defined" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    console.log("JWT generated successfully");

    res.json({
      message: "success",
      token,
      user: {
        id: user._id,
        email: user.userEmail,
        name: user.name,
        userMobile: user.phone,
      },
    });
  } catch (error) {
    console.error("Error in postUserEmailLogin:", error);
    res.status(500).json({ message: error.message });
  }
};

const setUserLogin = async (req, res) => {
  try {
    const {
      name,
      gender,
      dateOfBirth,
      reUseDateOfBirth,
      placeOfBorn,
      language,
      phone,
      totalAmount,
      freeChatStatus,
      userEmail,
      userPassword,
    } = req.body;

    if (!phone || !userEmail || !userPassword) {
      return res.status(400).json({
        error: "userEmail, userPassword, and phone are required fields.",
      });
    }

    // ✅ Check if email or phone already exists
    const existingUser = await UserLogin.findOne({
      $or: [{ userEmail }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email or phone number already registered.",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    const newUser = new UserLogin({
      name,
      gender,
      dateOfBirth,
      reUseDateOfBirth,
      placeOfBorn,
      language,
      phone,
      totalAmount,
      userEmail,
      userPassword: hashedPassword,
      freeChatStatus: freeChatStatus ? freeChatStatus : true,
      chatStatus: false,
      deleteUser: false,
      blockUser: false,
    });

    await newUser.save();

    res.status(201).json({
      message: "success",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during user login:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation Error", details: error.message });
    } else if (error.name === "MongoError") {
      return res
        .status(500)
        .json({ error: "Database Error", details: error.message });
    } else {
      return res
        .status(500)
        .json({ error: "Failed to process request", details: error.message });
    }
  }
};

module.exports = {
  getUserLogin,
  getUserLoginDetail,
  updateUser,
  setUserLogin,
  getAllUsersWithWallet,
  getAllUsersWithWalletDetail,
  postUserEmailLogin,
  requestPasswordReset,
  resetPassword,
};
