import  userModel  from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}



const signUp=async(req,res)=>{
    try{
       const {name,email,password}=req.body;
        
        const check =await userModel.findOne({email});
        if(check){
           return res.status(404).json({success:false,message:"user already exists"})
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.status(404).json({success:false,message:"Please enter a valid email"});
        }

        if(password.length<8){
            return res.status(404).json({success:false,message:"please enter a strong password"})
        }

        //hashing user password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const addUser= await userModel.create({
            name,
            email,
            password:hashedPassword
        });

        if(!addUser){
            return res.status(404).json({success:false,message:"error while creating the user"});
        }
            
            const token= createToken(addUser._id);
            return res.status(200).json({success:true,token})
        
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"Error"})
    }
}




const signIn=async(req,res)=>{
    try{

        const {email,password}=req.body;

        const user= await userModel.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"User doesn't exist"})
        }


        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({success:false,message:"Invalid credentials"});
        }
        

        const token = createToken(user._id);

        return res.status(200).json({success:true,token});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"Error"});
    }


}





export {signUp,signIn}


