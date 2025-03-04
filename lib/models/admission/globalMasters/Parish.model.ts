import mongoose, { Document, Model } from "mongoose";

export interface IParish extends Document {
  session: string;
  parish: string;
  religion: string[];
}

const ParishSchema = new mongoose.Schema<IParish>(
  {
    session: { type: String, required: true },
    parish: { type: String, required: true },
    religion: [{ type: String }],
  },
  { timestamps: true }
);

const Parish: Model<IParish> =
  (mongoose.models.Parish as Model<IParish>) ||
  mongoose.model<IParish>("Parish", ParishSchema);

export default Parish;
