"use server";

import { dbConnect } from "@/utils/dbConnect";
import Produce from "@/models/Produce";

export async function fetchProducts () {
    await dbConnect();

    const produce = Produce.find({})
        .sort({ createdAt: -1 }) // Sort by newest products first
        .lean() // Convert Mongoose document to plain JavaScript object
        .exec(); // Execute the query

    return produce;
}