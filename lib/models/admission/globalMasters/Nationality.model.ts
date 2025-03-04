import mongoose, { Document, Model } from "mongoose";

export interface INationality extends Document {
  session: string;
  name: string;
}

const NationalitySchema = new mongoose.Schema<INationality>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Nationality: Model<INationality> =
  (mongoose.models.Nationality as Model<INationality>) ||
  mongoose.model<INationality>("Nationality", NationalitySchema);

export default Nationality;
