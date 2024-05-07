import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IFavourites extends Document {
  user: ObjectId;
  favourites: ObjectId[];
}

const FavouritesSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true,
    },
    favourites: {
        type: [Schema.Types.ObjectId],
        ref: 'Produce',
        default: [],
    },
})

const Favourites = mongoose.models.Favourites || mongoose.model<IFavourites>('Favourites', FavouritesSchema);

export default Favourites;