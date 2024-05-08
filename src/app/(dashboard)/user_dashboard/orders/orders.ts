"use server";

import Order from "@/models/Order";
import { dbConnect } from "@/utils/dbConnect";

export default async function getUsersOrder(userId: string) {
    await dbConnect();

    // Find all orders where user is userId
    const orders = await Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("produce")
        .lean();

    return orders;
}

export async function markOrderAsDelivered(orderId: string) {
    await dbConnect();

    // Find order by id and update status to "Delivered"
    const order = await Order.findById(orderId);

    order.status = "Delivered";

    await order.save();

    return {
        success: true,
        message: "Order marked as delivered"
    }
}