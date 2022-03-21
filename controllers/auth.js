const {UserModel} =require('../models')

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
  const logoutAction = async (req, res, next)=>{
    try{
         req.session.userId=''
         req.session.destroy(null);
         return res.redirect('/')     
    }catch (error) {
      return res.status(500).json({
        success: false,
        message:
          " logout action error",
        error: error
      });
    }
  }
  
  
module.exports = {
    loginpage,
    loginaction,
    signuppage,
    signupaction,
    logoutAction
  };