const { UserModel } = require('../models')
const jwt = require("jsonwebtoken")
const JWT_SECRATE = "THIS IS SECRATE OF JWT "
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
      return res.render("login/login", {
        errorsMessage: "Invalid cridentials"
      })
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
const logoutAction = async (req, res, next) => {
  try {
    req.session.userId = ''
    req.session.destroy(null);
    return res.redirect('/')
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        " logout action error",
      error: error
    });
  }
}

const forgetpage = async (req, res) => {
  res.render("login/forget", {
    messages: req.flash('error')
  })
}
const forgetAction = async (req, res) => {
  const { email } = req.body
  const user = await UserModel.findOne({ email })
  const priviousPass = user.password
  // now email is exist than we create a one time link
  const secrate = JWT_SECRATE + priviousPass
  const payload = {
    email: user.email,
    id: user.id
  }
  const token = jwt.sign(payload, secrate, { expiresIn: '15m' })
  const link = `http://localhost:3000/resetpassword/${user.id}/${token}`
  console.log(link)
  res.send("link has been send on the email")
}
const resetPasspage = async (req, res) => {
  const { id, token } = req.params
  const user = await UserModel.findOne({ id })
  if (id !== user.id) {
    return res.send("invalid id")
  }
  const secrate = JWT_SECRATE + user.password;
  try {
    const payload =jwt.verify(token ,secrate)
    return res.render('login/resetPassword')
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
}

const resetAction = async (req, res) =>{
  const { id, token } = req.params;
  const {password} =req.body
  const user = await UserModel.findOne({ id })
  if (id !== user.id) {
    return res.send("invalid id")
  }
  const secrate = JWT_SECRATE + user.password;
  try {
    const payload =jwt.verify(token ,secrate)
    await UserModel.findOneAndUpdate({ _id: id }, { $set: { password: password } }, { new: true })
    return res.render('login/login',{
      success:"Password has been successfully changed "
    })
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
}
module.exports = {
  loginpage,
  loginaction,
  signuppage,
  signupaction,
  logoutAction,
  forgetpage,
  forgetAction,
  resetPasspage,
  resetAction
};