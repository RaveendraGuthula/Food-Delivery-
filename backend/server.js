import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app=express();

//middleware
app.use(express.json());
app.use(cors({}));

//db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static("./uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    // try{
    //     Foodmodel
    // }
    return res.status(200).json({mess:"hello"});
})

app.listen(3000,()=>{
    console.log(`server is running on http://localhost:3000`);
});