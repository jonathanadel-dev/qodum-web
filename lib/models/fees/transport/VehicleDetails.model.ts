import mongoose, { Document, Model } from "mongoose";

export interface IVehicleDetails extends Document {
  session: string;
  vehicle_owner?: string;
  vehicle_type: string;
  vehicle_name: string;
  vehicle_reg_no: string;
  driver_name?: string;
  attendent_name?: string;
  fule_type?: string;
  seating_capacity?: number;
  reserved_seats?: number;
  facility_in_bus: {
    cctv?: boolean;
    wifi?: boolean;
    gps?: boolean;
    ac?: boolean;
  };
  driver_mobile_no?: string;
  gps_no?: string;
  service_due_date?: Date;
  insurance_due_date?: Date;
  vendor?: string;
  routes?: any[];
}

const VehicleDetailsSchema = new mongoose.Schema<IVehicleDetails>(
  {
    session: { type: String, required: true },
    vehicle_owner: { type: String },
    vehicle_type: { type: String, required: true },
    vehicle_name: { type: String, required: true },
    vehicle_reg_no: { type: String, required: true },
    driver_name: { type: String },
    attendent_name: { type: String },
    fule_type: { type: String },
    seating_capacity: { type: Number },
    reserved_seats: { type: Number },
    facility_in_bus: {
      cctv: { type: Boolean },
      wifi: { type: Boolean },
      gps: { type: Boolean },
      ac: { type: Boolean },
    },
    driver_mobile_no: { type: String },
    gps_no: { type: String },
    service_due_date: { type: Date },
    insurance_due_date: { type: Date },
    vendor: { type: String },
    routes: [mongoose.Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

const VehicleDetails: Model<IVehicleDetails> =
  (mongoose.models.VehicleDetails as Model<IVehicleDetails>) ||
  mongoose.model<IVehicleDetails>("VehicleDetails", VehicleDetailsSchema);

export default VehicleDetails;
