require('dotenv').config();
import * as express from "express";
import * as cors from 'cors';
import { connectDB } from "./config/db";
import bodyParser = require("body-parser");

const app = express();
// app.use(cors())
connectDB(process.env.DB_CONNECTION!, process.env.DB_NAME!)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require('./routes/url'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})