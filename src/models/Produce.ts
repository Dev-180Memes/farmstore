import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IProduce extends Document {
    filter: (arg0: (item: any) => boolean) => any;
    name: string;
    short_description: string;
    long_description: string;
    price: number;
    category: string;
    image: string;
    farmer: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProduceSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
}, { timestamps: true });

const Produce = mongoose.models.Produce || mongoose.model<IProduce>("Produce", ProduceSchema);

export default Produce;
