import mongoose, { Document, Model } from "mongoose";

export interface IProfession extends Document {
  session: string;
  profession: string;
}

const ProfessionSchema = new mongoose.Schema<IProfession>(
  {
    session: { type: String, required: true },
    profession: { type: String, required: true },
  },
  { timestamps: true }
);

const Profession: Model<IProfession> =
  (mongoose.models.Profession as Model<IProfession>) ||
  mongoose.model<IProfession>("Profession", ProfessionSchema);

export default Profession;
