import mongoose, { Document, Model } from "mongoose";

export interface IHouse extends Document {
  session: string;
  house_name: string;
}

const HouseSchema = new mongoose.Schema<IHouse>(
  {
    session: { type: String, required: true },
    house_name: { type: String, required: true },
  },
  { timestamps: true }
);

const House: Model<IHouse> =
  (mongoose.models.House as Model<IHouse>) ||
  mongoose.model<IHouse>("House", HouseSchema);

export default House;
