import mongoose, { Document, Model } from "mongoose";

export interface ITerm extends Document {
  session: string;
  term_name: string;
}

const TermSchema = new mongoose.Schema<ITerm>(
  {
    session: { type: String, required: true },
    term_name: { type: String, required: true },
  },
  { timestamps: true }
);

const newTermMaster: Model<ITerm> =
  (mongoose.models.newTermMaster as Model<ITerm>) ||
  mongoose.model<ITerm>("Term", TermSchema);

export default newTermMaster;
