require('dotenv').config();
import * as express from "express";
import * as cors from 'cors';
import { connectDB } from "./config/db";

const app = express();
app.use(cors())
// should add the real connection here
// connectDB(process.env.DB_CONNECTION!, process.env.DB_NAME!)
app.use(express.json())
app.use("/", require('./routes/url'));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})