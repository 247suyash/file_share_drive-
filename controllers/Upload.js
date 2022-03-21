const File =require('../models/file');
const UserModel = require('../models/UserModel');
const uploadaction = async (req, res, next) => {
    try {
      const { file } = req;
      const {userId , userEmail } = req.session;
      await File.create({
        name: file.originalname,
        path: file.filename,
        size: file.size,
        type: file.mimetype,
        permittedUsers: [
          {
            userEmail,
          },
        ],
      });
     const userUploadLimit = await UserModel.findById({_id:userId})      
     await UserModel.findOneAndUpdate({ _id: userId }, { $set: { upload: userUploadLimit.upload+1 } }, { new: true })

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
    uploadaction,
  };