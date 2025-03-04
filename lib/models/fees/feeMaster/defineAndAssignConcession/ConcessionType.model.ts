import mongoose, { Document, Model } from "mongoose";

export interface IConcessionType extends Document {
  session: string;
  type: string;
}

const ConcessionTypeSchema = new mongoose.Schema<IConcessionType>(
  {
    session: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const ConcessionType: Model<IConcessionType> =
  (mongoose.models.ConcessionType as Model<IConcessionType>) ||
  mongoose.model<IConcessionType>("ConcessionType", ConcessionTypeSchema);

export default ConcessionType;
