import mongoose, { Document, Model } from "mongoose";

export interface IClub extends Document {
  session: string;
  name: string;
}

const ClubSchema = new mongoose.Schema<IClub>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Club: Model<IClub> =
  (mongoose.models.Club as Model<IClub>) ||
  mongoose.model<IClub>("Club", ClubSchema);

export default Club;
