import mongoose, { Document as MongooseDocument, Model } from "mongoose";

export interface IDocument extends MongooseDocument {
  session: string;
  document_type: string;
  document_name: string;
}

const DocumentSchema = new mongoose.Schema<IDocument>(
  {
    session: { type: String, required: true },
    document_type: { type: String, required: true },
    document_name: { type: String, required: true },
  },
  { timestamps: true }
);

const DocumentModel: Model<IDocument> =
  (mongoose.models.Document as Model<IDocument>) ||
  mongoose.model<IDocument>("Document", DocumentSchema);

export default DocumentModel;
