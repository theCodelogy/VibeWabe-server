const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require("./Routs/User");
const videoRouter = require("./Routs/Video/Video");
const musicRouter = require("./Routs/Music/Music");
const paymentRouter = require("./Routs/Payment");
const VideoCommentRouter = require("./Routs/Video/VideoComment");
const MusicCommentRouter = require("./Routs/Music/MusicComment");
const VideoPlaylistRouter = require("./Routs/Video/VideoPlaylist");
const VideoSliderRouter = require("./Routs/Video/VideoSlider");
const VideoUserHistoryRouter = require("./Routs/Video/VideoUserHistory");
const orderRouter = require("./Routs/Order");

// middleware
app.use(cors())
app.use(express.json());


async function run() {
  try {
    app.use("/user", userRouter);
    app.use("/video", videoRouter);
    app.use("/music", musicRouter);
    app.use("/payment", paymentRouter);
    app.use("/videoComment", VideoCommentRouter);
    app.use("/musicComment", MusicCommentRouter);
    app.use("/videoPlaylist", VideoPlaylistRouter);
    app.use("/videoSlider", VideoSliderRouter);
    app.use("/videoHistory", VideoUserHistoryRouter);
    app.use("/order", orderRouter);

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
