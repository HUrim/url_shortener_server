require('dotenv').config();
import * as express from "express";
import * as cors from 'cors';
import { connectDB } from "./config/db";

const app = express();
app.use(cors())
// should add the real connection
connectDB(process.env.DB_CONNECTION!, process.env.DB_NAME!)

const server = app.listen(4004, () => {
    console.log(`Server is running on port 4004`)
})