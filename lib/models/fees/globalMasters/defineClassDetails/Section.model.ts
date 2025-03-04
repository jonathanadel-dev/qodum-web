import mongoose, { Document, Model } from "mongoose";

export interface ISection extends Document {
  session: string;
  section_name: string;
  order_no: number;
}

const SectionSchema = new mongoose.Schema<ISection>(
  {
    session: { type: String, required: true },
    section_name: { type: String, required: true },
    order_no: { type: Number, required: true },
  },
  { timestamps: true }
);

const Section: Model<ISection> =
  (mongoose.models.Section as Model<ISection>) ||
  mongoose.model<ISection>("Section", SectionSchema);

export default Section;
