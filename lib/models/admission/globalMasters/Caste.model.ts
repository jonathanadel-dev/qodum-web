import mongoose, { Document, Model } from "mongoose";

export interface ICaste extends Document {
  session: string;
  caste_name: string;
}

const CasteSchema = new mongoose.Schema<ICaste>(
  {
    session: { type: String, required: true },
    caste_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Caste: Model<ICaste> =
  (mongoose.models.Caste as Model<ICaste>) ||
  mongoose.model<ICaste>("Caste", CasteSchema);

export default Caste;
