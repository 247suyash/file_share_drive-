const { json } = require('express/lib/response');
const { file } = require('../models')
const UserModel = require('../models/UserModel');
const homepage = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const userPlan = await UserModel.findById({ _id:userId });

    if (userPlan.plan == 'none') {
      return res.redirect("/subscription")
    }
    const userEmail = req.session.userEmail;
    const files = await file
      .find({ permittedUsers: { $elemMatch: { userEmail } } })
      .lean();
    res.render('home/home', {
      total: files.length,
      files: files
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        " home page render error",
      error: error
    });
  }
};
const homeaction = async (req, res, next) => {
  try {
    // next() or
    return res.status(200).json({
      success: true,
      message: "Data saved successfully.",
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "We are having some error while completing your request. Please try again after some time.",
      error: error
    });
  }
};
module.exports = {
  homepage,
  homeaction
}  