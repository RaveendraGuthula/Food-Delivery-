import { changeStatus, listOrders, placeOrder, userOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

import { Router } from "express";

const orderRouter = Router();


orderRouter.post("/place",authMiddleware,placeOrder); 
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.put("/status",changeStatus);
export default orderRouter;

