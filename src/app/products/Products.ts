"use server";

import { dbConnect } from "@/utils/dbConnect";
import Produce from "@/models/Produce";
import Favourites from "@/models/Favourites";

export async function fetchProducts () {
    await dbConnect();

    const produce = Produce.find({})
        .sort({ createdAt: -1 }) // Sort by newest products first
        .lean() // Convert Mongoose document to plain JavaScript object
        .exec(); // Execute the query

    return produce;
}

export async function getRecommendations (userId: string) {
    await dbConnect();

    // Get Favourites for a specific user
    const favourites = await Favourites.findOne({ user: userId })
        .populate("favourites")
        .lean();

    // Pick a random favourite and get a random product in that favourites category
    if (favourites) {
        const randomFavourite = favourites.favourites[Math.floor(Math.random() * favourites.favourites.length)];
        
        const randomProduct = await Produce.find({ category: randomFavourite.category })
            .sort({ createdAt: -1 })
            .limit(3)
            .lean();

        return { success: true, data: randomProduct };
    }

    return { success: false, data: [] };
}