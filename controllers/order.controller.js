import axios from "axios";
import Order from "../models/order.model.js"; // adjust this path as needed


export const getAllSuccessOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "confirmed" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items:", items);
      return res
        .status(400)
        .json({ message: "Items are required and must be an array" });
    }
    if (typeof total !== "number" || total <= 0) {
      console.error("Invalid total:", total);
      return res
        .status(400)
        .json({ message: "Total must be a positive number" });
    }

    // Validate item structure
    for (const item of items) {
      if (
        !item.id ||
        !item.name ||
        typeof item.price !== "number" ||
        typeof item.quantity !== "number"
      ) {
        console.error("Invalid item structure:", item);
        return res.status(400).json({
          message: "Each item must have id, name, price, and quantity",
        });
      }
    }

    // Generate unique order ID
    const cashfreeOrderId = `order_${Date.now()}`;

    // Cashfree sandbox URL
    const CASHFREE_BASE_URL = "https://sandbox.cashfree.com";

    // Request body for Cashfree
    const requestBody = {
      order_id: cashfreeOrderId,
      order_amount: total,
      order_currency: "INR",
      customer_details: {
        customer_id: `guest_${Date.now()}`,
        customer_phone: "9999999999", // Dummy phone
      },
      order_meta: {
        notify_url:
          "https://hotel-web-1.onrender.com/api/order/cashfree-webhook",
      },
    };

    // Call Cashfree API
    const response = await axios.post(
      `${CASHFREE_BASE_URL}/pg/orders`,
      requestBody,
      {
        headers: {
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Save order locally
    const order = new Order({
      cashfreeOrderId,
      items,
      total,
      status: "pending",
      paymentSessionId: response.data.payment_session_id,
    });

    await order.save();

    console.log("Order created:", {
      cashfreeOrderId,
      total,
      items: items.length,
    });

    // Send payment session ID to frontend
    res.status(201).json({
      message: "Order created successfully",
      payment_session_id: response.data.payment_session_id,
      order_id: cashfreeOrderId,
    });
  } catch (error) {
    console.error(
      "Order creation failed:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to create order",
      details: error.response?.data || error.message,
    });
  }
};

// controllers/cashfreeWebhook.js
export const cashfreeWebhook = async (req, res) => {
  console.log("Received Webhook Data:", JSON.stringify(req.body, null, 2));
  const order_id = req.body?.data?.order?.order_id;
  const order_status = req.body?.data?.payment?.payment_status;

  if (!order_id) {
    console.error("Invalid order_id: Not provided");
    return res.status(400).json({ message: "Invalid order_id" });
  }

  console.log("Processing order_id:", order_id);

  try {
    // Find the purchase record by cashfreeOrderId
    const purchase = await Order.findOne({ cashfreeOrderId: order_id });
    if (!purchase) {
      console.error("Purchase not found for cashfreeOrderId:", order_id);
      return res.status(404).json({ message: "Purchase not found" });
    }

    console.log("Purchase found:", purchase);

    // Update purchase status based on webhook data
    if (order_status === "SUCCESS") {
      purchase.status = "confirmed";
      await purchase.save();
      console.log("Order confirmed:", order_id);
      return res.status(200).json({ message: "Payment successful" });
    } else if (order_status === "FAILED" || order_status === "CANCELLED") {
      purchase.status = "cancelled";
      await purchase.save();
      console.log("Order cancelled:", order_id);
      return res.status(200).json({ message: "Payment failed" });
    } else {
      console.log("Order status pending:", order_id);
      return res.status(200).json({ message: "Payment pending" });
    }
  } catch (error) {
    console.error("Error processing webhook:", error.message);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
};
