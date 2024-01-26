require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz-lts");
const uri = process.env.DB_uri;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const store_id = process.env.Store_id;
const store_passwd = process.env.Store_Pass;
const is_live = false; //true for live, false for sandbox

const tran_id = new ObjectId().toString();

const payment = async (req, res) => {
  // console.log(req.body);
  const subscription = req.body;
  const data = {
    total_amount: subscription.price,
    currency: "USD",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/payment/success/${tran_id}`, // added live link change localhost 5000
    fail_url: `http://localhost:5000/payment/failedPay/${tran_id}`, // added live link change localhost 5000
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "vibewabe subscription.",
    product_category: subscription.category,
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
  });
};

const successPayment = async (req, res) => {
  console.log(req.params.tranId);
  res.redirect("http://localhost:3000/successfullPay");
  // added live link change localhost 3000
};

const failedPay = async (req, res) => {
  console.log(req.params.tranId);
  res.redirect("http://localhost:3000/failedPay");
  // added live link change localhost 3000
};
module.exports = { payment, successPayment, failedPay };
