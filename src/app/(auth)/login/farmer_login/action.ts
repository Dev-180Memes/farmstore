"use server";

import Farmer, { IFarmer } from "@/models/Farmer";
import { dbConnect } from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IServerResponse {
    success: boolean;
    message?: string;
}

export async function FarmerLogin(formData: FormData) {
    await dbConnect();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        throw new Error("Kindly fill all fields");
    }

    const farmer = await Farmer.findOne({ email });

    if (!farmer) {
        throw new Error("No farmer with this email exists. Kindly create an account");
    }

    const isPasswordValid = await bcrypt.compare(password, farmer.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not found");
    }

    const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });

    return { token, accountType: "farmer" };
}