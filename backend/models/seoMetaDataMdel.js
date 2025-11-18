const mongoose = require("mongoose");

const seoMetaDataSchema = new mongoose.Schema(
  {
    page:  String,
    meta_title:  String, 
    meta_description:  String ,
    slug: String, 
    keywords:  String, 
    deleteStatus: Boolean,
  },
  { timestamps: true }
);

const SaveSeoMetaData = mongoose.model("SaveSeoMetaData", seoMetaDataSchema);
module.exports = SaveSeoMetaData;
