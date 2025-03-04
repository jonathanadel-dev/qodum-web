import mongoose, { Document, Model } from "mongoose";

// Define an interface for your Subject document
export interface ISubject extends Document {
  session: string;
  subject_name: string;
  available_seats?: number;
  is_university?: boolean;
}

// Define the schema using the interface as a generic
const SubjectSchema = new mongoose.Schema<ISubject>(
  {
    session: { type: String, required: true },
    subject_name: { type: String, required: true },
    available_seats: { type: Number },
    is_university: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

// Explicitly cast the model so TypeScript sees it as a callable Model<ISubject>
const Subject: Model<ISubject> =
  (mongoose.models.Subject as Model<ISubject>) ||
  mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;
