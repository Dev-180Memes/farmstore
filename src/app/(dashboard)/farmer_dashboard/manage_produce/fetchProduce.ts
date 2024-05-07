"use server";

import { dbConnect } from "@/utils/dbConnect";
import Produce, { IProduce } from "@/models/Produce";
import { ObjectId } from "mongoose";

export default async function fetchProduce(farmerId: string) {
    await dbConnect();

    const produce: IProduce[] = await Produce.find({ farmer: farmerId }).populate("farmer").lean();

    if (!produce) {
        throw new Error("No produce found");
    } else {
        return produce;
    }
    
}

export async function DeleteProduce(produceId: string) {
    await dbConnect();

    try {
        const produce = await Produce.findByIdAndDelete(produceId);
        if (!produce) {
            throw new Error("Produce not found");
        } else {
            return { message: "Produce deleted successfully" };
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}