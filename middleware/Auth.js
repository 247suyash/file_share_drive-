
const Auth = async(req, res,next) => {
    try {
        const user = req.session.userId;
        if(!user){
            return res.redirect('/login')
        }
        next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "auth middleware error",
        error: error
      });
    }
  }
module.exports =Auth;  