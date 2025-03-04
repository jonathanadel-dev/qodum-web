import mongoose, { Document, Model } from "mongoose";

export interface IWing extends Document {
  session: string;
  wing: string;
}

const WingSchema = new mongoose.Schema<IWing>(
  {
    session: { type: String, required: true },
    wing: { type: String, required: true },
  },
  { timestamps: true }
);

const Wing: Model<IWing> =
  (mongoose.models.Wing as Model<IWing>) ||
  mongoose.model<IWing>("Wing", WingSchema);

export default Wing;
