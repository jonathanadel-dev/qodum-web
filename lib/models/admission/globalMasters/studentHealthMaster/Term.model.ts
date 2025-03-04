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

const Term: Model<ITerm> =
  (mongoose.models.Term as Model<ITerm>) ||
  mongoose.model<ITerm>("Term", TermSchema);

export default Term;
