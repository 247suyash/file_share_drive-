const paypal = require('paypal-rest-sdk');
const UserModel = require('../models/UserModel');
paypal.configure({
  'mode': "sandbox",
  'client_id': "AR_wz8RtRoWY43Hg8y7Kgqkgly8-aWzjimueEzMIA5qthU9pBdxlWIZyt9XAAAoJ7ryTfTqUO48TRO79",
  'client_secret': "EDAm6hKhg2-Q-xyK6zqWJCJ_j-DXPl2GWDtmHCqjUc-00vo4422VY7BqXL1XcZXAZA4Zvj63FkP4QwoQ"
});
const payPal = async (req, res) => {
  const { amount, fileId } = req.body;
  const userId = req.session.userId;
  if(fileId==="free"){
    await UserModel.findOneAndUpdate({ _id: userId }, { $set: { plan: fileId } }, { new: true })
    return res.redirect("/");
  }  
  const  payAmount = amount+".00"
  console.log("fileId", fileId,
    "amounts...", payAmount)
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/success",
      "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Red Sox Hat",
          "sku": "001",
          "price": payAmount,
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": payAmount
      },
      "description": "Hat for the best team ever"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
  await UserModel.findOneAndUpdate({ _id: userId }, { $set: { plan: fileId } }, { new: true })


}
const paySuccess = async (req, res) => {
  const payerId = req.query.PayerID;
  const amount= req.body.amount;
  const paymentId = req.query.paymentId;
 console.log("payerId........",amount)
 console.log("paymentId........",paymentId)

  
  const execute_payment_json = {
    "payer_id": payerId,
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));

      res.redirect('/')
    }
  });
}
const payCancel = async (req, res) => res.send('Cancelled');

module.exports = { payPal, paySuccess, payCancel }