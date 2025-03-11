import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

const cartRouter=Router();


cartRouter.put("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;