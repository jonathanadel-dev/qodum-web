import mongoose, { Document, Model } from "mongoose";

export interface IMeritCriteria extends Document {
  session: string;
  name: string;
  maximum_point: number;
}

const MeritCriteriaSchema = new mongoose.Schema<IMeritCriteria>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
    maximum_point: { type: Number, required: true },
  },
  { timestamps: true }
);

const MeritCriteria: Model<IMeritCriteria> =
  (mongoose.models.MeritCriteria as Model<IMeritCriteria>) ||
  mongoose.model<IMeritCriteria>("MeritCriteria", MeritCriteriaSchema);

export default MeritCriteria;
