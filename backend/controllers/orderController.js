import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const placeOrder =async(req,res)=>{

    try{
        const {items,amount,address}=req.body;
        await orderModel.create({
            userId:req.userId,
            items,
            amount,
            address
        });
        await userModel.updateOne({_id:req.userId},{cartData:{}});

        return res.status(200).json({success:true,message:"order successfully placed"});

    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false, message:"Error"})
    }    
}






export const userOrders=async(req,res)=>{
    try{
        const userId = req.userId;
        
        const orders= await orderModel.find({userId:userId});
     
        return res.status(200).json({success:true,data:orders});

    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"Error"})
    }
}





//Listing orders for admin panel


export const listOrders = async (req,res)=>{
    try{
        const list = await orderModel.find({});
        return res.status(200).json({success:true,data:list})
    }
    catch(err){
        return res.status(404).json({success:false,message:"Error"})
    }
}



//api for updating order status

export const changeStatus=async(req,res)=>{
    
    try{
    const{id ,status}=req.body;

        await orderModel.updateOne({_id:id},{
            status
        })
        
        return res.status(200).json({success:200,message:"status updated"})
    }
    catch(err){
        return res.status(404).json({success:404,message:"Error"})
    }
}