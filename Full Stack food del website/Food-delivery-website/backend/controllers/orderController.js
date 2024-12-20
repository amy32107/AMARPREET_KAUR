import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import * as jwt_decode from 'jwt-decode';
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//placing user order for frontend

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"; // URL for frontend (adjust as necessary)
    try {
        const { userId, items, amount, address } = req.body; // Extract userId from the request body
        
        // Validation to ensure userId is present
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Create a new order with the provided userId and other details
        const newOrder = new orderModel({
            userId: userId, // Associate the order with the user using userId
            items: items,
            amount: amount,
            address: address,
        });
        await newOrder.save();//saving the order in the database
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_items = req.body.items.map((item)=>({//necessary for the stripe payment
         price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100*80
         },
         quantity:item.quantity

        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

      const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      })
     res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        console.log("Received request body:", req.body);  // Log incoming request data

        // Check if orderId and success fields are present
        if (!orderId || success === undefined) {
            return res.status(400).json({ success: false, message: "Missing required fields: orderId or success" });
        }

        // Validate success field
        if (success === "true") {
            const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true });
            if (updatedOrder) {
                console.log("Order updated as paid:", updatedOrder);
                return res.status(200).json({ success: true, message: "Paid" });
            } else {
                console.error("Order not found with ID:", orderId);
                return res.status(404).json({ success: false, message: "Order not found" });
            }
        } else if (success === "false") {
            const deletedOrder = await orderModel.findByIdAndDelete(orderId);
            if (deletedOrder) {
                console.log("Order deleted:", deletedOrder);
                return res.status(200).json({ success: false, message: "Not Paid, order deleted" });
            } else {
                console.error("Order not found with ID:", orderId);
                return res.status(404).json({ success: false, message: "Order not found" });
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid value for success field" });
        }
    } catch (error) {
        console.error("Error in verifyOrder:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
//user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log("error")
        res.json({success:false,message:"Error"})
    }
}
//listing orders for admin panel

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
} 
// api for status update 
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body; // Extract the orderId from the request body

        console.log("Attempting to delete order with ID:", orderId); // Debugging: log the orderId

        // Find the order by ID
        const order = await orderModel.findById(orderId);

        if (!order) {
            console.log("Order not found for ID:", orderId); // Debugging: log if order is not found
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Proceed to delete the order
        await orderModel.findByIdAndDelete(orderId);

        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};



export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,deleteOrder}