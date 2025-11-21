const mongoose = require("mongoose");

const addKundaliMatchingSchema = new mongoose.Schema({
  girlDetail: {
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    timeOfBirth: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
  },

  boyDetail: {
    fullName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    timeOfBirth: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
  },

  kundaliData: {
    type: Object,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const KundaliMatching = mongoose.model(
  "KundaliMatchingMain",
  addKundaliMatchingSchema
);

module.exports = KundaliMatching;
