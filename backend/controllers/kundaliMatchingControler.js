// const KundaliMatching = require("../models/kundaliMAtchingModel");

// const postMatchingKundali = async (req, res) => {
//   try {
//     const { girlDetail, boyDetail, kundaliData } = req.body;

//     if ((!girlDetail, !boyDetail, !kundaliData)) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const newKundaliMatch = new KundaliMatching ({
//       girlDetail: {
//         fullName: girlDetail?.fullName,
//         dob: new Date(girlDetail?.dob),
//         timeOfBirth: girlDetail?.timeOfBirth,
//         placeOfBirth: girlDetail?.placeOfBirth,
//       },
//       boyDetail: {
//         fullName: boyDetail?.fullName,
//         dob: new Date(boyDetail?.dob),
//         timeOfBirth: boyDetail?.timeOfBirth,
//         placeOfBirth: boyDetail?.placeOfBirth,
//       },
//       kundaliData: kundaliData, 
//     });

//     const savedKundaliMatch = await newKundaliMatch.save();

//     res.status(201).json({
//       message: "success",
//       data: savedKundaliMatch,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error, try again later." });
//   }
// };

// module.exports = { postMatchingKundali };
