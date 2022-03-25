const File = require("../models/file.js");
const UserModel = require("../models/UserModel.js");

const permittedaction = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const { filePath, emails } = req.body;
    console.log("this is perticular file id",req.body)

    const file = await File.findById(filePath);
    console.log("this is perticular file id", emails , filePath)

    if (!file) {                 //file is not avaliable redirect on home page
      return res.redirect("/");
    }
    const userLimit = await UserModel.findById({ _id: userId })
    await UserModel.findOneAndUpdate({ _id: userId }, { $set: { sharePrivate: userLimit.sharePrivate + 1 } }, { new: true })
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
  permittedaction,
};
