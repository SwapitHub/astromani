const express = require("express")
const { PostMatchingKundali } = require("../controllers/kundaliMatchingControler")

const KundaliMatching = express.Router()

KundaliMatching.post("/post-matching-kundali", PostMatchingKundali)

module.exports = {KundaliMatching}