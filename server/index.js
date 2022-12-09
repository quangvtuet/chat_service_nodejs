import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import databaseConnect from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import cookieParser from "cookie-parser";

dotenv.config();
databaseConnect();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/user',userRouter);

const PORT = process.env.ENV_PORT || 5000 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});