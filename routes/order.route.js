import express from "express";
import {
  createOrder,
  cashfreeWebhook,
  getAllSuccessOrders,
} from "../controllers/order.controller.js"; // adjust this path as needed

const router = express.Router();

router.get("/", getAllSuccessOrders);

router.post("/create-order", createOrder);
router.post("/cashfree-webhook", cashfreeWebhook);

export default router;
