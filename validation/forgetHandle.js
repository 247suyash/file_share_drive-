const { body } = require("express-validator");
const { UserModel } = require("./../models");

const forgetPasswordValidations = async (req ,res,next) =>{
    const {email} =req.body;
    const user = await UserModel.findOne({ email:email  });

    if( !email ){
        req.flash("error", "Email is required")
       return res.redirect('/forget')
    }
    if(!user){
        req.flash("error", "Email is does not exist")
       return res.redirect('/forget')
    }
    next()
}

module.exports = {
    forgetPasswordValidations,
};
