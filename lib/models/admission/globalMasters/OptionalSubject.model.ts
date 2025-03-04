import mongoose, { Document, Model } from "mongoose";

export interface IOptionalSubject extends Document {
  session: string;
  subject_name: string;
}

const OptionalSubjectSchema = new mongoose.Schema<IOptionalSubject>(
  {
    session: { type: String, required: true },
    subject_name: { type: String, required: true },
  },
  { timestamps: true }
);

const OptionalSubject: Model<IOptionalSubject> =
  (mongoose.models.OptionalSubject as Model<IOptionalSubject>) ||
  mongoose.model<IOptionalSubject>("OptionalSubject", OptionalSubjectSchema);

export default OptionalSubject;
