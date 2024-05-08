"use server";

import Order from "@/models/Order";
import Produce from "@/models/Produce";
import mongoose from "mongoose";
import { dbConnect } from "@/utils/dbConnect";

export async function fetchOrdersByFarmerId(farmerId: string) {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
        throw new Error('Invalid farmerId');
    }

    const produces = await Produce.find({ farmer: farmerId }).lean();

    const produceIds = produces.map((produce) => produce._id);

    const orders = await Order.find({ produce: { $in: produceIds } })
        .sort({ createdAt: -1 })
        .populate('produce')
        .lean();

    return orders;
}