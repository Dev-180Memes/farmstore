"use server";
import Order, { IOrder } from "@/models/Order";
import { dbConnect } from "@/utils/dbConnect";

export default async function createOrder (cartItems: any[], userId: string, transactionRef: any) {
    await dbConnect();

    // Loop over the cart items and save each item uniquely in the database
    for (const item of cartItems) {
        const order = new Order({
            user: userId,
            produce: item._id,
            quantity: item.quantity,
            // Price should be the total price of the item (price * quantity)
            price: item.price * item.quantity,
            status: "Not Delivered",
            transactionRef: transactionRef
        });

        await order.save();
    }

    return true;
}