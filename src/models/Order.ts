import mongoose, { Schema, ObjectId, Document } from "mongoose";

export interface IOrder extends Document {
    user: ObjectId;
    produce: ObjectId;
    quantity: number;
    price: number;
    status: string;
    transactionRef: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const OrderSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    produce: {
        type: Schema.Types.ObjectId,
        ref: "Produce",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Not Delivered"
    },
    transactionRef: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;