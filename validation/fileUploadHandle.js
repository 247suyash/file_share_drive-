const { networkInterfaces } = require("nodemailer/lib/shared");
const UserModel = require("../models/UserModel");
const url = require('url');
module.exports = fileUploadHandle = async (req, res, next) => {
    const id = req.session.userId
    const user = await UserModel.findById({ _id: id })
    if (user.upload >= 5 && user.plan == "free") {
        req.flash("error", "Your package is exprired please update")
        return res.redirect("/")
    }
    if (user.upload >= 10 && user.plan == "basic") {
        req.flash("error", "Your package is exprired please update")
        return res.redirect("/")
    }
    if (user.upload >= 20 && user.plan == "standard") {
        req.flash("error", "Your package is exprired please update")
        return res.redirect("/")
    }

    next()
}

