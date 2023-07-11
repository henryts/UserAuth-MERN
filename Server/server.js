const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors=require("cors");
const userRoute = require("./routes/userRouter.js");
const adminRoute = require("./routes/adminRouter.js");
const db = require("./config/db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", userRoute);
app.use("/api/admin",adminRoute )


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
