import userModel from "../models/userModel.js";


const addToCart=async(req,res)=>{

    try{
    const {foodId}=req.body;

    const userId=req.userId;

    const user= await userModel.findOne({_id:userId});
    
    
    const cartData= await user.cartData;

    // if(!user.cartData[foodId]){
    //     console.log("hello");
    //     await userModel.updateOne({_id:userId},{
    //         cartData:{...user.cartData,[foodId]:1}});
    // }
    // else{
    //     console.log("helloelse");
    // await userModel.updateOne({_id:userId},{
    //     cartData:{...user.cartData,[foodId]:user.cartData[foodId]+1}
    // });

    if(!cartData[foodId]){
        cartData[foodId]=1
    }
    else{
        cartData[foodId]+=1
    }

    await userModel.updateOne({_id:userId},{
        cartData
    });

    return res.status(200).json({success:true,message:"Added To Cart"});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"Error"})
    }

}


const removeFromCart=async(req,res)=>{
   
    try{
        const {foodId}= req.body;
        const userId = req.userId;
    
        const user= await userModel.findById({_id:userId});
        
      
        const cartData= await user.cartData;
        if(cartData[foodId]>0){
            cartData[foodId]-=1;
        }
        await userModel.updateOne({_id:userId},{cartData});

        return res.status(200).json({success:true,message:"Remove From Cart"})
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"Error"});
    }
}

const getCart=async(req,res)=>{
   
    try{
        const userId=req.userId;
        const user= await userModel.findOne({_id:userId});
        return res.status(200).json({success:true,cartData:user.cartData})
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"Error"})
    }
}


export {addToCart,removeFromCart,getCart}