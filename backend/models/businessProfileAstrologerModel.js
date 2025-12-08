const mongoose = require("mongoose");

const businessProfileAstrologerSchema = new mongoose.Schema(
  {
    astrologer_id: { type: mongoose.Schema.Types.ObjectId, ref: "AstrologerRegistration" },
    spiritual_services: [
      {
        service: { type: String, required: false },
        service_price: { type: String, required: false },
        shop_id: { type: String, required: false },
        shop_Name: { type: String, required: false },
        shop_slug: { type: String, required: false },
        shop_name: { type: String, required: false },
      },
    ],

    Description: String,
    minute: { type: String, required: false },
    profileStatus: Boolean,
    chatStatus: Boolean,
    country: String,
    starRating: String,
    totalOrders: { type: Number, default: 0 },
    offers: String,
    freeChatStatus: Boolean,
    requestStatus: Boolean,
    astroTotalChatTime: Number,
    topAstrologer: String,
    cloudinary_id: String,
    totalAvailableBalance: Number,
    upi_id: String,
    account_number: String,
    bank_name: String,
    IFSC_code: String,
  },
  { timestamps: true }
);

const businessProfileAstrologer = mongoose.model(
  "businessProfileAstrologer",
  businessProfileAstrologerSchema
);
module.exports = businessProfileAstrologer;
