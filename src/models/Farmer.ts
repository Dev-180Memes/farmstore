import mongoose, { Document } from "mongoose";

export interface IFarmer extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

const FarmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

const Farmer = mongoose.models.Farmer || mongoose.model<IFarmer>("Farmer", FarmerSchema);

export default Farmer;