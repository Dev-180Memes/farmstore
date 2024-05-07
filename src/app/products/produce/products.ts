"use server";

import { dbConnect } from "@/utils/dbConnect";
import Produce from "@/models/Produce";

export async function fetchProducts (productId: string) {
    await dbConnect();

    const produce = await Produce.findOne({ _id: productId }).lean();

    // Convert produce to plain objects
    return produce;
}

export async function getSimilarProducts ( productCategory: string, productId: string ) {
    await dbConnect();

    // Get 3 random products with the same category that is not the product
    const similarProducts = await Produce.find({ category: productCategory, _id: { $ne: productId } })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();

    // Coverting the similar products to an array of plain objects
    return similarProducts;
}