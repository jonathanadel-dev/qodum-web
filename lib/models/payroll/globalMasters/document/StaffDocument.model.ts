import mongoose, { Document, Model } from "mongoose";

export interface IStaffDocument extends Document {
  session: string;
  document_type: string;
  document_name: string;
}

const StaffDocumentSchema = new mongoose.Schema<IStaffDocument>(
  {
    session: { type: String, required: true },
    document_type: { type: String, required: true },
    document_name: { type: String, required: true },
  },
  { timestamps: true }
);

const StaffDocument: Model<IStaffDocument> =
  (mongoose.models.StaffDocument as Model<IStaffDocument>) ||
  mongoose.model<IStaffDocument>("StaffDocument", StaffDocumentSchema);

export default StaffDocument;
