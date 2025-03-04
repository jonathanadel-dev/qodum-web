import mongoose, { Document, Model } from "mongoose";

export interface IBloodGroup extends Document {
  session: string;
  blood_group: string;
}

const BloodGroupSchema = new mongoose.Schema<IBloodGroup>(
  {
    session: { type: String, required: true },
    blood_group: { type: String, required: true },
  },
  { timestamps: true }
);

const BloodGroup: Model<IBloodGroup> =
  (mongoose.models.BloodGroup as Model<IBloodGroup>) ||
  mongoose.model<IBloodGroup>("BloodGroup", BloodGroupSchema);

export default BloodGroup;
