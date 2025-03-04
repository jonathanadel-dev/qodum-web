import mongoose, { Document, Model } from "mongoose";

export interface IReligion extends Document {
  session: string;
  religion_name: string;
}

const ReligionSchema = new mongoose.Schema<IReligion>(
  {
    session: { type: String, required: true },
    religion_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Religion: Model<IReligion> =
  (mongoose.models.Religion as Model<IReligion>) ||
  mongoose.model<IReligion>("Religion", ReligionSchema);

export default Religion;
