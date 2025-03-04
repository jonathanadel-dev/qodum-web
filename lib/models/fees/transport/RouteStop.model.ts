import mongoose, { Document, Model } from "mongoose";

export interface IRouteStop extends Document {
  session: string;
  route_no: string;
  stop_no: string;
  stop_name: string;
  morning_arrival_time?: {
    hour?: string;
    minute?: string;
    meridiem?: string;
  };
  afternoon_arrival_time?: {
    hour?: string;
    minute?: string;
    meridiem?: string;
  };
  transport_groups?: {
    jan?: string;
    feb?: string;
    mar?: string;
    apr?: string;
    may?: string;
    jun?: string;
    jul?: string;
    aug?: string;
    sep?: string;
    oct?: string;
    nov?: string;
    dec?: string;
  };
}

const RouteStopSchema = new mongoose.Schema<IRouteStop>(
  {
    session: { type: String, required: true },
    route_no: { type: String, required: true },
    stop_no: { type: String, required: true },
    stop_name: { type: String, required: true },
    morning_arrival_time: {
      hour: { type: String },
      minute: { type: String },
      meridiem: { type: String },
    },
    afternoon_arrival_time: {
      hour: { type: String },
      minute: { type: String },
      meridiem: { type: String },
    },
    transport_groups: {
      jan: { type: String },
      feb: { type: String },
      mar: { type: String },
      apr: { type: String },
      may: { type: String },
      jun: { type: String },
      jul: { type: String },
      aug: { type: String },
      sep: { type: String },
      oct: { type: String },
      nov: { type: String },
      dec: { type: String },
    },
  },
  { timestamps: true }
);

// Explicitly cast the model to Model<IRouteStop>
const RouteStop: Model<IRouteStop> =
  (mongoose.models.RouteStop as Model<IRouteStop>) ||
  mongoose.model<IRouteStop>("RouteStop", RouteStopSchema);

export default RouteStop;
