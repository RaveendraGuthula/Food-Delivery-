import mongoose from "mongoose";

export default async function connectDB(){

    await mongoose.connect("mongodb+srv://raveendrag777:Raveendr%40555@cluster0.9jw6jer.mongodb.net/Food_Del").then(()=>console.log("db"));
}