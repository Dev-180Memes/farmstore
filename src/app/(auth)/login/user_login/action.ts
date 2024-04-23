"use server";

import Buyer, { IBuyer } from "@/models/Buyer";
import { dbConnect } from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IServerResponse {
    success: boolean;
    message?: string;
}

export async function BuyerLogin(formData: FormData) {
    await dbConnect();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        throw new Error("Kindly fill all fields");
    }

    const buyer = await Buyer.findOne({ email });

    if (!buyer) {
        throw new Error("No buyer with this email exists. Try creating an account instead");
    }

    const isPasswordValid = await bcrypt.compare(password, buyer.password);

    if (!isPasswordValid) {
        throw new Error("Invalid Password");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not found");
    }

    const token = jwt.sign({ id: buyer._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });

    return { token, accountType: "buyer" };
}