const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { name} = req.body;


});
