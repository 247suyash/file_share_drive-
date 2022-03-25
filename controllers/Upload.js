const File =require('../models/file');
const UserModel = require('../models/UserModel');

const uploadaction = async (req, res, next) => {
      const { file } = req;
      console.log("file",file)
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
    
  };
  module.exports = {
    uploadaction,
  };