import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js"
import dotevn from "dotenv"

dotevn.config()
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL

const app = express();
app.use(express.json());

app.use('/api', router);

mongoose.connect(DB_URL).then(() => console.log("Connected to database"));

app.listen(PORT, () => console.log("Listening on port" + PORT));
