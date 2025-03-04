import mongoose, { Document, Model } from "mongoose";

export interface IStaffDocumentType extends Document {
  session: string;
  document_type: string;
}

const StaffDocumentTypeSchema = new mongoose.Schema<IStaffDocumentType>(
  {
    session: { type: String, required: true },
    document_type: { type: String, required: true },
  },
  { timestamps: true }
);

const StaffDocumentType: Model<IStaffDocumentType> =
  (mongoose.models.StaffDocumentType as Model<IStaffDocumentType>) ||
  mongoose.model<IStaffDocumentType>(
    "StaffDocumentType",
    StaffDocumentTypeSchema
  );

export default StaffDocumentType;
