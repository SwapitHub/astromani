const mongoose = require("mongoose");

const astrologerSignUpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    languages: [{ type: String, required: true }],
    professions: [{ type: String }],
    deviceUse: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    astroStatus: { type: Boolean, required: true },
    mobileNumber: { type: String, required: true },
    blockUnblockAstro: { type: Boolean, required: true },
    deleteAstroLoger: { type: Boolean, required: true },
    completeProfile: { type: Boolean },
    aadhaarCard: { type: String },
    certificate: { type: String },
    charges: { type: String },
    experience: String,
    profileImage: String,
  },
  { timestamps: true }
);

const AstrologerRegistration = mongoose.model(
  "AstrologerRegistration",
  astrologerSignUpSchema
);
module.exports = AstrologerRegistration;
