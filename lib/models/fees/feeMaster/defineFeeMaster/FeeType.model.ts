import mongoose, { Document, Model } from "mongoose";

export interface IFeeType extends Document {
  session: string;
  name: string;
  preference_no: number;
  heads: string[];
}

const FeeTypeSchema = new mongoose.Schema<IFeeType>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
    preference_no: { type: Number, required: true },
    heads: [{ type: String }],
  },
  { timestamps: true }
);

const FeeType: Model<IFeeType> =
  (mongoose.models.FeeType as Model<IFeeType>) ||
  mongoose.model<IFeeType>("FeeType", FeeTypeSchema);

export default FeeType;
