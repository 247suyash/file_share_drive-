const UserModel = require("../models/UserModel");

module.exports = fileShareHandle = async (req, res, next) => {
    const id = req.session.userId
    const user = await UserModel.findById({ _id: id })
    console.log("file share validation",user.sharePrivate)
    if (user.sharePrivate >=0 && user.plan == "free") {
        return res.redirect('/subscription')
    }
    if (user.sharePrivate >= 0 && user.plan == "basic") {
        return res.redirect('/subscription')
    }
    if (user.sharePublic >= 5 && user.plan == "free") {
        return res.redirect('/subscription')
    }
    if (user.sharePublic >= 10 && user.plan == "basic") {
        return res.redirect('/subscription')
    }
    if (user.sharePublic >= 15 && user.plan == "standard") {
        return res.redirect('/subscription')
    }
    
    next()
}