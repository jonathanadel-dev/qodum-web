import mongoose, { Document, Model } from "mongoose";

export interface IDocumentType extends Document {
  session: string;
  document_type: string;
}

const DocumentTypeSchema = new mongoose.Schema<IDocumentType>(
  {
    session: { type: String, required: true },
    document_type: { type: String, required: true },
  },
  { timestamps: true }
);

const DocumentType: Model<IDocumentType> =
  (mongoose.models.DocumentType as Model<IDocumentType>) ||
  mongoose.model<IDocumentType>("DocumentType", DocumentTypeSchema);

export default DocumentType;
