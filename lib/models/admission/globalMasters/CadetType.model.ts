import mongoose, { Document, Model } from "mongoose";

export interface ICadetType extends Document {
  session: string;
  name: string;
}

const CadetTypeSchema = new mongoose.Schema<ICadetType>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const CadetType: Model<ICadetType> =
  (mongoose.models.CadetType as Model<ICadetType>) ||
  mongoose.model<ICadetType>("CadetType", CadetTypeSchema);

export default CadetType;
