const { networkInterfaces } = require("nodemailer/lib/shared");
const UserModel = require("../models/UserModel");

module.exports = fileUploadHandle = async (req, res, next) => {
    const id = req.session.userId
    const user = await UserModel.findById({ _id: id })
    if (user.upload >=5 && user.plan == "free") {
        return res.redirect('/subscription')
    }
    if (user.upload >= 10 && user.plan == "basic") {
        return res.redirect('/subscription')
    }
    if (user.upload >= 20 && user.plan == "standard") {
        return res.redirect('/subscription')
    }
   
    next()
}