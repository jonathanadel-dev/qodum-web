import mongoose, { Document, Model } from "mongoose";

export interface IConcession extends Document {
  session: string;
  name: string;
}

const ConcessionSchema = new mongoose.Schema<IConcession>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Concession: Model<IConcession> =
  (mongoose.models.Concession as Model<IConcession>) ||
  mongoose.model<IConcession>("Concession", ConcessionSchema);

export default Concession;
