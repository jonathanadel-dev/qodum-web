import mongoose, { Document, Model } from "mongoose";

export interface IAdmissionGuideline extends Document {
  session: string;
  guidelines?: string;
}

const AdmissionGuidelineSchema = new mongoose.Schema<IAdmissionGuideline>(
  {
    session: { type: String, required: true },
    guidelines: { type: String },
  },
  { timestamps: true }
);

const AdmissionGuideline: Model<IAdmissionGuideline> =
  (mongoose.models.AdmissionGuideline as Model<IAdmissionGuideline>) ||
  mongoose.model<IAdmissionGuideline>(
    "AdmissionGuideline",
    AdmissionGuidelineSchema
  );

export default AdmissionGuideline;
