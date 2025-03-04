import mongoose, { Document, Model } from "mongoose";

export interface IHealthUnit extends Document {
  session: string;
  unit_name: string;
  unit_type: string;
}

const HealthUnitSchema = new mongoose.Schema<IHealthUnit>(
  {
    session: { type: String, required: true },
    unit_name: { type: String, required: true },
    unit_type: { type: String, required: true },
  },
  { timestamps: true }
);

const HealthUnit: Model<IHealthUnit> =
  (mongoose.models.HealthUnit as Model<IHealthUnit>) ||
  mongoose.model<IHealthUnit>("HealthUnit", HealthUnitSchema);

export default HealthUnit;
