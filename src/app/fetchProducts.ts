"use server"

import { dbConnect } from "@/utils/dbConnect";
import Produce, { IProduce } from "@/models/Produce";

export async function fetchProduce() {
    await dbConnect();

    // Fetch first 6 products
    const produce: IProduce[] = await Produce.find({})
        .sort({ createdAt: -1 }) // Sort by newest products first
        .limit(6)
        .lean();
    
    return produce;
}