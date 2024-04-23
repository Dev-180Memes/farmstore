import mongoose, { Document } from "mongoose";

export interface IBuyer extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

const BuyerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

const Buyer = mongoose.models.Buyer || mongoose.model<IBuyer>("Buyer", BuyerSchema);

export default Buyer;