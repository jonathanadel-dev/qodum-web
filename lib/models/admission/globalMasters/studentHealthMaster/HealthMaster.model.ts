import mongoose, { Document, Model } from "mongoose";

export interface IHealthMaster extends Document {
  session: string;
  health_parameter: string;
  unit: string;
}

const HealthMasterSchema = new mongoose.Schema<IHealthMaster>(
  {
    session: { type: String, required: true },
    health_parameter: { type: String, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true }
);

const HealthMaster: Model<IHealthMaster> =
  (mongoose.models.HealthMaster as Model<IHealthMaster>) ||
  mongoose.model<IHealthMaster>("HealthMaster", HealthMasterSchema);

export default HealthMaster;
