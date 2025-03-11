import jwt from "jsonwebtoken";

export const authMiddleware=async(req,res,next)=>{
    try{
    const authentication=req.headers.authentication;
    if(!authentication){
        return res.status(404).json({success:false,message:"Not Authorized Login Again"});
    }
    // console.log({authentication,message:process.env.JWT_SECRET});
    const decode =  jwt.verify(authentication,process.env.JWT_SECRET);

        req.userId=decode.id
        return await next();

    }
    catch(err){
        console.log(err);
        return res.status(404).json({success:false,message:"Error"});
    }
    
}

// export {authMiddleware};