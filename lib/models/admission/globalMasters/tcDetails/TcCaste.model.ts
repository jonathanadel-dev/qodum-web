import mongoose, { Document, Model } from "mongoose";

export interface ITcCaste extends Document {
  session: string;
  caste_name: string;
}

const TcCasteSchema = new mongoose.Schema<ITcCaste>(
  {
    session: { type: String, required: true },
    caste_name: { type: String, required: true },
  },
  { timestamps: true }
);

const TcCaste: Model<ITcCaste> =
  (mongoose.models.TcCaste as Model<ITcCaste>) ||
  mongoose.model<ITcCaste>("TcCaste", TcCasteSchema);

export default TcCaste;
