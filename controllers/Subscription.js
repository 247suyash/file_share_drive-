const UserModel = require("../models/UserModel");

const subscription = async (req, res) => {
  const buttonValue = [
    { id: "free" , ammount:"$5",color:"bg-red"},
    { id: "basic" ,ammount:"$10",color:"bg-green" },
    { id: "standard",ammount:"$100",color:"bg-lblue" },
    { id: "premium" ,ammount:"$200",color:"bg-warning"},
  ]

  return res.render('subscriptions/subscriptions',
    {
      data: buttonValue
    }
  )
}
const subscriptionAction = async (req, res) => {
  try {

    const { emails ,fileId} = req.body;
    console.log("fileId",fileId ,
                  "emails...",emails)
    const userId = req.session.userId;
    // await UserModel.findOneAndUpdate({ _id: userId }, { $set: { plan: plan } }, { new: true })
    // return res.redirect("/");

  } catch (e) {
    console.log(e)
  }
}
module.exports = {
  subscription,
  subscriptionAction
}