"use server";

import Buyer from "@/models/Buyer";
import { dbConnect } from "@/utils/dbConnect";

export default async function getUserDetails (userId: string) {
    await dbConnect();

    const user = await Buyer.findOne({ _id: userId });

    return {
        email: user.email,
        name: user.name,
        phone: user.phone
    }
}