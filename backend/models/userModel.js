import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{type:Object,default:{}}
},{minimize:false});


const userModel= mongoose.models.signUP||mongoose.model("userModel",userSchema);

export default userModel;