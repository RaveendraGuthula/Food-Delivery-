import mongoose from "mongoose";

const foodSchem= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
})

const foodmodel= mongoose.models.foodmodel|| mongoose.model("foodmodel",foodSchem);

export default foodmodel;