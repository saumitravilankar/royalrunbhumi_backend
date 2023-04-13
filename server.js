const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandle");
const env = require("dotenv").config();

const cors = require('cors');

connectDb();

const app = express();

const port = process.env.PORT;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/booking", require("./routes/slotRoutes"));
app.use(errorHandler)

app.get("/api/getkey/", (req,res) =>
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})
