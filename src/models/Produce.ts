import mongoose, { Document, ObjectId } from "mongoose";

export interface IProduce extends Document {
    name: string;
    short_description: string;
    long_description: string;
    price: number;
    image: string;
    farmer: ObjectId;
}

const ProduceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
});

const Produce = mongoose.models.Produce || mongoose.model<IProduce>("Produce", ProduceSchema);

export default Produce;
