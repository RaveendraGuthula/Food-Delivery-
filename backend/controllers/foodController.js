import foodmodel from "../models/foodModel.js";
import fs from "fs";

const addFood=async(req,res)=>{
    
    try{
        
        let image_filename = `${req.file.filename}`;

    const food= new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:Number(req.body.price),
        image:image_filename,
        category:req.body.category
    })

    
        await food.save();
        return res.status(200).json({success:"true",message:"Food Added"});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:"false",message:"Error"});
    }

}



//all food list
const listFood=async(req,res)=>{
    try{
        const list= await foodmodel.find({});
        return res.status(200).json({success:true,data:list});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"error"});
        
    }
}



//remove item

const removeItem=async(req,res)=>{

    try{
        const {id}=req.body;

        const Item= await foodmodel.findOne({
            _id:id
        })
        const remove=await foodmodel.deleteOne({
            _id:id
        })

        if(!Item||!remove){
            return res.status(404).json({mess:"mission fail while deleting the item"})
        }   

        fs.unlink(`uploads/${Item.image}`,()=>{});


        return res.status(200).json({success:true,message:"item succesfully deleted"});
    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"error"});
    }
}

export {addFood,listFood,removeItem}
