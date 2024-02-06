const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require("./Routs/User");
const videoRouter = require("./Routs/Video");
const musicRouter = require("./Routs/Music");
const paymentRouter = require("./Routs/Payment");

// middleware
app.use(cors())
app.use(express.json());

// MongoDb Database connection
async function run() {
  try {
    app.use("/user", userRouter);
    app.use("/video", videoRouter);
    app.use("/music", musicRouter);
    app.use("/payment", paymentRouter);

    // Send a ping to confirm a successful connection
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`the server is running on the port of ${port} `);
});
