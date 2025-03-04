import mongoose, { Document, Model } from "mongoose";

export interface IVehicleType extends Document {
  session: string;
  vehicle_name: string;
}

const VehicleTypeSchema = new mongoose.Schema<IVehicleType>(
  {
    session: { type: String, required: true },
    vehicle_name: { type: String, required: true },
  },
  { timestamps: true }
);

const VehicleType: Model<IVehicleType> =
  (mongoose.models.VehicleType as Model<IVehicleType>) ||
  mongoose.model<IVehicleType>("VehicleType", VehicleTypeSchema);

export default VehicleType;
