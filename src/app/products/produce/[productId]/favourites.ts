// Todo: Get a Users favourite products
// Todo: Add a product to a users favourite products
// Todo: Remove a product from a users favourite products
// Todo: Check if a Product is in a users favourite products
"use server";

import Favourites from "@/models/Favourites";
import { dbConnect } from "@/utils/dbConnect";

export async function fetchFavourites (userId: string) {
    await dbConnect();

    // Fetch all favourites for a specific user and fill in the products in the favourites array
    const favourites = await Favourites.findOne({ user: userId }).populate('favourites').lean();

    if (!favourites) {
        return [];
    }

    return { success: true, data: favourites.favourites };
}

export async function addFavourite (userid: string, productId: string) {
    await dbConnect();

    const favourites = await Favourites.findOne({ user: userid });

    if (!favourites) {
        await Favourites.create({
            user: userid,
            favourites: [productId],
        });
    } else {
        await Favourites.updateOne({ user: userid }, { $push: { favourites: productId } });
    }

    return { success: true, message: 'Product added to favourites' };
}

export async function removeFavourite (userid: string, productId: string) {
    await dbConnect();

    const favourites = await Favourites.findOne({ user: userid });

    if (!favourites) {
        return { success: false, message: 'Favourites not found' };
    }

    await Favourites.updateOne({ user: userid }, { $pull: { favourites: productId } });

    return { success: true, message: 'Product removed from favourites' };
}

export async function checkIsFavourites (userid: string, productId: string) {
    await dbConnect();

    const favourites = await Favourites.findOne({ user: userid });

    if (!favourites) {
        return false;
    }

    return favourites.favourites.includes(productId);
}