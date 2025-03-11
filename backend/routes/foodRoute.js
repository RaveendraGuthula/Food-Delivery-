import { addFood, listFood, removeItem } from "../controllers/foodController.js";
import {Router} from "express";
import multer from "multer";

const foodRouter=Router();

//Image Storeage Engine
    const storage = multer.diskStorage({
        destination:"uploads",
        filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
        }  
    })

    const upload= multer({storage:storage})
    // const hello=async()=>{
    //     let uploads= upload
    //     console.log(uploads.)
    // }
    // hello();
foodRouter.post("/add",upload.single("image"),addFood)

foodRouter.get("/list",listFood);

foodRouter.post("/remove",removeItem);

export default foodRouter;