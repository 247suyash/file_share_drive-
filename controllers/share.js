const { AVAILABLE_TEMPLATES, Email } = require("../utils/Email");
const File = require("../models/file.js");
const UserModel = require("../models/UserModel");


const sharePublically =async (req, res)=>{
    try {
      const {userId} = req.session;

        const {filePath, emails ,fileId } = req.body
        console.log("sharing public",emails , "filepath :",filePath ,"fileId:" ,fileId)
        const file = await File.findById(filePath);
        console.log("CHECK THE PATH OF IMAGE", file.path)
        const emailClient = new Email();
        emailClient.setTemplate(AVAILABLE_TEMPLATES.SHARE);
        emailClient.setBody({
            filePath:file.path
        });
        emailClient.send(emails);
        const userShareLimit = await UserModel.findById({_id:userId})      
        await UserModel.findOneAndUpdate({ _id: userId }, { $set: { sharePublic: userShareLimit.sharePublic+1 } }, { new: true })
                                                                                                                                                                             
        return res.redirect("/")
      } catch (error) {
        return res.status(500).json({
          success: false,
          message:                                                    
            "email error",
          error: error
        });
      }
}
module.exports = { sharePublically}