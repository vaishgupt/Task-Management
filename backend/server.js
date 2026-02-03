import express from "express";
import dotenv from "dotenv";
const app=express();
import connectDB from "./config/db.js";
import authUserRoute from "./routes/authUserRoute.js";
import todoRoute from "./routes/todoRoute.js"


dotenv.config();
connectDB();

app.use(express.json());

app.use("/", authUserRoute);
app.use("/",todoRoute);

const PORT=5000;

app.listen(PORT,()=>{
  console.log(`Server is running on PORT ${PORT}`);
})