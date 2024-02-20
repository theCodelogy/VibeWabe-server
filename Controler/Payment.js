require("dotenv").config();
const SSLCommerzPayment = require("sslcommerz-lts");
const {ObjectId } = require('../db')
const { orderCollection}= require("./Order");
const { userCollection}= require("./User");
const store_id = process.env.Store_id;
const store_passwd = process.env.Store_Pass;
const is_live = false; //true for live, false for sandbox

const tran_id = new ObjectId().toString();

const payment = async (req, res) => {
  const subscription = req.body;

  const data = {
    total_amount: subscription.price,
    currency: "USD",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `https://vibewabe-server.vercel.app/payment/success/${tran_id}`, // added live link change localhost 5000
    fail_url: `https://vibewabe-server.vercel.app/payment/failedPay/${tran_id}`, // added live link change localhost 5000
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "vibewabe subscription.",
    product_category: subscription.package,
    product_profile: "general",
    cus_name: subscription.name,
    cus_email: subscription.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: subscription.phone,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  //   console.log(data);
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
    // console.log("Redirecting to: ", GatewayPageURL);

    const finalOrder = {
      ...subscription,
      paidStatus:false,
      tranjectionId:tran_id
    }

    const result = orderCollection.insertOne(finalOrder)


  });
};

const successPayment = async (req, res) => {
  console.log(req.params.tranId);
  const order = await orderCollection.findOne({tranjectionId:req.params.tranId})
  const user = await userCollection.findOne({email:order.email})
  const subscriptionInfo = {
    package:order.package,
    takeingTime: new Date(),
    duration: order.duration,
    tranjectionId:order.tranjectionId
  }
  const userUpdate = await userCollection.updateOne({email:order.email}, {
    $set: {role:'premium',subscriptionInfo }
})
const updateOrder = await orderCollection.updateOne({tranjectionId:req.params.tranId},{
  $set: {paidStatus:true}
})
  res.redirect("https://vibe-wabe-five.vercel.app/successfullPay");

};

const failedPay = async (req, res) => {
  const deleteOrder = await orderCollection.deleteOne({tranjectionId:req.params.tranId})
  res.redirect("https://vibe-wabe-five.vercel.app/failedPay");
  // added live link change localhost 3000
};
module.exports = { payment, successPayment, failedPay };
