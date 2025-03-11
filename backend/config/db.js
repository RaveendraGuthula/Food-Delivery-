import mongoose from "mongoose";

export default async function connectDB(){

    await mongoose.connect(`${process.env.BACKEND_MONGOOSE_URL}`).then(()=>console.log("db"));
}
