const UserModel = require("../models/UserModel");
const file = require('../models/file')
const File = require("../models/file.js")
const { Email, AVAILABLE_TEMPLATES } = require("../utils/Email.js");


const homepage = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.redirect('/login')
    } else {
      const userEmail = req.session.userEmail;
      const files = await file
        .find({ permittedUsers: { $elemMatch: { userEmail } } })
        .lean();
      // console.log(files)
      res.render('home/home', {
        total: files.length,
        files: files
      })
    }
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

const loginpage = async (req, res, next) => {
  try {
    return res.render('login/login')
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        " login page render error",
      error: error
    });
  }
};
const loginaction = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.redirect("/login");
    }

    const user = await UserModel.findOne({ email });
    if (user.email === email && user.password === password) {
      req.session.userId = user._id;
      req.session.userEmail = user.email;
      return res.redirect("/");
    }
    else {
      return res.redirect("/login")
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "login action  error",
      error: error
    });
  }
};

const signuppage = async (req, res, next) => {
  try {
    return res.render('signup/signup')
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        " home page render error",
      error: error
    });
  }
};
const signupaction = async (req, res, next) => {
  try {
    console.log("api call", UserModel, req.body)
    const { firstName, lastName, email, password } = req.body
    await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res.redirect('/login')
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        " signup action error",
      error: error
    });
  }
};

const uploadaction = async (req, res, next) => {
  try {
    const { file } = req;
    const { userEmail } = req.session;
    // console.log(userEmail)
    await File.create({
      name: file.originalname,
      path: file.filename,
      size: file.size,
      type: file.mimetype,
      permittedUsers: [
        {
          userEmail,
          isOwner: true,
        },
      ],
    });
    return res.redirect("/");

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        " upload action error",
      error: error
    });
  }
};


const permittedaction = async (req, res, next) => {
  try {

    const { fileId, emails } = req.body;
    console.log("this is perticular file id", fileId)

    const file = await File.findById(fileId);
    if (!file) {                 //file is not avaliable redirect on home page
      return res.redirect("/");
    }
    const userEmails = [];
    userEmails.push({ userEmail: emails, isOwner: false });
    file.permittedUsers.push(...userEmails);
    await file.save(userEmails);
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        " upload action error",
      error: error
    });
  }
};

module.exports = {
  homepage,
  homeaction,
  loginpage,
  loginaction,
  signuppage,
  signupaction,
  uploadaction,
  permittedaction
};
