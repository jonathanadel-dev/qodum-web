import mongoose, { Document, Model } from "mongoose";

export interface IVehicleRoute extends Document {
  session: string;
  route_no: string;
  route_description?: string;
  route_in_charge_name?: string;
  route_in_charge_mobile_no?: number;
}

const VehicleRouteSchema = new mongoose.Schema<IVehicleRoute>(
  {
    session: { type: String, required: true },
    route_no: { type: String, required: true },
    route_description: { type: String },
    route_in_charge_name: { type: String },
    route_in_charge_mobile_no: { type: Number },
  },
  { timestamps: true }
);

const VehicleRoute: Model<IVehicleRoute> =
  (mongoose.models.VehicleRoute as Model<IVehicleRoute>) ||
  mongoose.model<IVehicleRoute>("VehicleRoute", VehicleRouteSchema);

export default VehicleRoute;
