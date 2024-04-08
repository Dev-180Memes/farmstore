"use server";

import Farmer, { IFarmer } from "@/models/Farmer";
import { dbConnect } from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IServerResponse {
    success: boolean;
    message?: string;
}

export async function createFarmerAccount(formData: FormData) {
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

    const farmer = await Farmer.findOne({ email });

    if (farmer) {
        throw new Error("Farmer with this email already exists. Try to login instead");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newFarmer = new Farmer({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
    });

    const savedFarmer = await newFarmer.save();

    if (!savedFarmer) {
        throw new Error("Failed to create account");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not found");
    }

    const token = jwt.sign({ id: savedFarmer._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });

    return { 
        token,
        accountType: "farmer",
    };
}