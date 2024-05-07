"use server";

import Buyer, { IBuyer } from "@/models/Buyer";
import { dbConnect } from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IServerResponse {
    success: boolean;
    message?: string;
}

export async function createBuyerAccount(formData: FormData) {
    await dbConnect();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!name || !email || !password || !confirmPassword || !phone || !address) {
        throw new Error("Kindly fill all fields");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const buyer = await Buyer.findOne({ email });

    if (buyer) {
        throw new Error("Buyer with this email already exists. Try to login instead");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newBuyer = new Buyer({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
    });

    const savedBuyer = await newBuyer.save();

    if (!savedBuyer) {
        throw new Error("Failed to create account");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not found");
    }

    const token = jwt.sign({ id: savedBuyer._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });

    return { 
        success: true,
        message: "Account created successfully",
        token,
        accountType: "buyer"
    };
}