const express = require("express")
const { postMatchingKundali } = require("../controllers/kundaliMatchingControler")

const kundaliMatchingRoute = express.Router()

kundaliMatchingRoute.post("/post-matching-kundali", postMatchingKundali)

module.exports = {kundaliMatchingRoute}