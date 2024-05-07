"use server";

import Produce, { IProduce } from "@/models/Produce";
import { dbConnect } from "@/utils/dbConnect";

export interface IServerResponse {
    success: boolean;
    message?: string;
}

export async function AddProduct(formData: FormData, farmerId: string, category: string) {
    await dbConnect();

    const name = formData.get("produce_name") as string;
    const short_description = formData.get("short_description") as string;
    const long_description = formData.get("long_description") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as string;
    const farmer = farmerId;

    if (!name || !short_description || !long_description || !price || !image || !category) {
        throw new Error("Kindly fill all fields");
    }

    // Upload image to imgbb
    const imgbbUrl = 'https://api.imgbb.com/1/upload?key=8abdbad2335b4f5dcac281c6e08ac5b3';
    const imgData = new FormData();
    imgData.append('image', image);
    const imgResponse = await fetch(imgbbUrl, {
        method: 'POST',
        body: imgData
    });
    const imgResult = await imgResponse.json();
    const imageUrl = imgResult.data.url;

    const newProduce = new Produce({
        name,
        short_description,
        long_description,
        category,
        price: parseInt(price),
        image: imageUrl,
        farmer,
    });

    const savedProduce = await newProduce.save();

    if (!savedProduce) {
        throw new Error("Failed to add produce");
    }

    // return success message
    return { success: true, message: "Produce added successfully" };
}