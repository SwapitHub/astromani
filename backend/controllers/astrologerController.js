const AstrologerRegistration = require("../models/astrologerRegistrationModel");
const fs = require("fs");
const path = require("path");
const businessProfileAstrologer = require("../models/businessProfileAstrologerModel");
const WalletTransaction = require("../models/transactionsUserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET;

const getAllAstrologersWithWallet = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const matchConditions = [];

    matchConditions.push({
      "walletTransactions.0": { $exists: true },
    });

    matchConditions.push({ deleteAstroLoger: false });

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
          foreignField: "astrologer_id",
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
    const totalCountResult = await businessProfileAstrologer.aggregate(
      countPipeline
    );
    const totalUsers = totalCountResult[0]?.total || 0;
    const totalPages = Math.ceil(totalUsers / limit);

    // Add pagination
    aggregatePipeline.push({ $skip: skip }, { $limit: limit });

    // Execute paginated query
    const users = await businessProfileAstrologer.aggregate(aggregatePipeline);

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

const getAllAstrologersWithWalletDetail = async (req, res) => {
  try {
    const mobileNumber = req.params.mobileNumber;
    const { page = 1, limit = 10, search = "" } = req.query;

    if (!mobileNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const astrologer = await businessProfileAstrologer.findOne({
      mobileNumber,
    });

    if (!astrologer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Build search filter for transactions
    let filter = { astrologer_id: astrologer._id };
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
      astrologer,
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

const getAstrologerList = async (req, res, next) => {
  try {
    const { astroStatus, page = 1, limit = 10, search = "" } = req.query;

    if (astroStatus === undefined) {
      return res
        .status(400)
        .json({ error: "astroStatus query parameter is required" });
    }

    const statusFilter = astroStatus === "true";
    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);

    // Base filter
    const filter = {
      astroStatus: statusFilter,
      deleteAstroLoger: false,
    };

    // If search query is present, add regex condition
    if (search.trim() !== "") {
      filter.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { mobileNumber: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const totalAstrologers = await AstrologerRegistration.countDocuments(
      filter
    );

    const astrologers = await AstrologerRegistration.find(filter)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalPages = Math.ceil(totalAstrologers / itemsPerPage);

    res.status(200).json({
      astrologers,
      totalAstrologers,
      page: currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAstrologerList = async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const astrologer = await AstrologerRegistration.findOne({ mobileNumber });

    if (!astrologer) {
      return res.status(404).json({ error: "Astrologer not found" });
    }

    await AstrologerRegistration.deleteOne({ mobileNumber });

    res.status(200).json({
      success: true,
      message: "Astrologer deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Astrologer by ID
const getAstrologerDetail = async (req, res, next) => {
  try {
    const { mobileNumber } = req.params;

    const astrologer = await AstrologerRegistration.findOne({
      mobileNumber,
      // astroStatus: true,
    });

    if (!astrologer) {
      return res.status(404).json({ error: "Astrologer not found" });
    }
    res.status(200).json({
      success: true,
      message: "success",
      data: astrologer,
    });
  } catch (error) {
    next(error);
  }
};






// ===========
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const astrologer = await AstrologerRegistration.findOne({ email });

    if (!astrologer)
      return res.status(404).json({ message: "Email not registered" });

    const resetToken = jwt.sign({ id: astrologer._id }, JWT_SECRET, {
      expiresIn: "15m",
    });

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
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${astrologer.name},</p>
        <p>Click the link below to reset your password (valid for 15 minutes):</p>
        <a href="http://localhost:3000/astro-reset-password?token=${resetToken}">Reset Password</a>
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
  try {
    const { token, newPassword } = req.body;

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const astrologer = await AstrologerRegistration.findById(decoded.id);

    if (!astrologer)
      return res.status(404).json({ message: "Astrologer not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    astrologer.Password = hashedPassword;

    await astrologer.save();
    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token." });
  }
};



const postAstrologerLogin = async (req, res) => {
  try {
    const { email, Password } = req.body;

    if (!email || !Password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const astrologer = await AstrologerRegistration.findOne({ email });
    if (!astrologer) {
      return res.status(404).json({ message: "Astrologer not found" });
    }

    // Check approval, block, or delete status
    if (astrologer.deleteAstroLoger === true) {
      return res.status(403).json({ message: "Your account has been deleted." });
    }
    if (astrologer.blockUnblockAstro === true) {
      return res.status(403).json({ message: "Your account is blocked by admin." });
    }
    if (astrologer.astroStatus === false) {
      return res.status(403).json({
        message: "You can log in after your registration is approved by the admin.",
      });
    }

    const isMatch = await bcrypt.compare(Password, astrologer.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: astrologer._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      astrologer: {
        id: astrologer._id,
        name: astrologer.name,
        email: astrologer.email,
        mobileNumber: astrologer.mobileNumber,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// =============
// ✅ Register New Astrologer


const registerAstrologer = async (req, res, next) => {
  try {
    const {
      name,
      dateOfBirth,
      gender,
      languages,
      professions,
      deviceUse,
      email,
      Password,
      astroStatus,
      mobileNumber,
      experience,
      charges
    } = req.body;



    if (
      !name ||
      !dateOfBirth ||
      !gender ||
      !languages ||
      !professions ||
      !deviceUse ||
      !email ||
      !Password ||
      astroStatus === undefined ||
      !mobileNumber ||
      !experience ||
      !charges 
    ) {
      return res
        .status(400)
        .json({ error: "All astrologer data are required" });
    }

    const existingAstrologer = await AstrologerRegistration.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (existingAstrologer) {
      return res
        .status(400)
        .json({ error: "Email or mobile number already registered" });
    }

    const aadhaarCard = req.files?.aadhaarCard?.[0]?.filename
      ? `/public/uploads/${req.files.aadhaarCard[0].filename}`
      : null;

    const certificate = req.files?.certificate?.[0]?.filename
      ? `/public/uploads/${req.files.certificate[0].filename}`
      : null;

       const profileImage = req.files?.profileImage?.[0]?.filename
      ? `/public/uploads/${req.files.profileImage[0].filename}`
      : null;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newAstrologer = new AstrologerRegistration({
      name,
      dateOfBirth,
      gender,
      languages,
      professions,
      deviceUse,
      email,
      Password: hashedPassword,
      astroStatus,
      mobileNumber,
      blockUnblockAstro: false,
      deleteAstroLoger: false,
      completeProfile: false,
      aadhaarCard,
      certificate,
      experience,
      profileImage,
      charges
    });

    await newAstrologer.save();

       // 2️⃣ Save astrologer_id to businessProfileAstrologer
    await businessProfileAstrologer.create({
      astrologer_id: newAstrologer._id,   // important
      profileStatus: false,
      chatStatus: false,
      freeChatStatus: false,
      requestStatus: false,
    });

    res.status(201).json({
      message: "success",
      astrologer: newAstrologer,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Update Astrologer Status
const updateAstroStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Optional: Validate that `updateFields` is not empty
    if (!updateFields || Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field is required to update" });
    }

    // Convert "true"/"false" strings to boolean if necessary
    if (updateFields.astroStatus !== undefined) {
      updateFields.astroStatus =
        updateFields.astroStatus === true ||
        updateFields.astroStatus === "true";
    }

    const updatedAstrologer = await AstrologerRegistration.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedAstrologer) {
      return res.status(404).json({ error: "Astrologer not found" });
    }

    res.status(200).json({
      message: "Astrologer updated successfully",
      astrologer: updatedAstrologer,
    });
  } catch (error) {
    next(error);
  }
};

const updateAstroAnyField = async (req, res) => {
  const mobileNumber = req.params.mobileNumber;

  try {
    const files = req.files;
    let updateData = { ...req.body };

    // Handle languages (parse if stringified)
    if (updateData.languages) {
      try {
        updateData.languages = JSON.parse(updateData.languages);
      } catch {
        updateData.languages = Array.isArray(updateData.languages)
          ? updateData.languages
          : [updateData.languages];
      }
    }

    // Fetch current astrologer
    const existingProfile = await AstrologerRegistration.findOne({
      mobileNumber,
    });
    if (!existingProfile) {
      return res.status(404).json({ message: "Astrologer not found." });
    }

    const removeOldFile = (filePath) => {
      const fullPath = path.join(__dirname, "../", filePath); // go one level up
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    };

    // Aadhaar Card
    if (files?.aadhaarCard) {
      if (existingProfile.aadhaarCard) {
        removeOldFile(existingProfile.aadhaarCard);
      }

      updateData.aadhaarCard = `/public/uploads/${files.aadhaarCard[0].filename}`;
    }

    // Certificate
    if (files?.certificate) {
      if (existingProfile.certificate) {
        removeOldFile(existingProfile.certificate);
      }

      updateData.certificate = `/public/uploads/${files.certificate[0].filename}`;
    }

    // Profile Image
    if (files?.profileImage) {
      if (existingProfile.profileImage) {
        removeOldFile(existingProfile.profileImage);
      }

      updateData.profileImage = `/public/uploads/${files.profileImage[0].filename}`;
    }

    // Final DB update
    const updatedAstrologer = await AstrologerRegistration.findOneAndUpdate(
      { mobileNumber },
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      message: "success",
      data: updatedAstrologer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
};

module.exports = {
  getAstrologerList,
  getAstrologerDetail,
  registerAstrologer,
  updateAstroStatus,
  deleteAstrologerList,
  updateAstroAnyField,
  getAllAstrologersWithWallet,
  getAllAstrologersWithWalletDetail,
  postAstrologerLogin,
  requestPasswordReset,
  resetPassword,
};
