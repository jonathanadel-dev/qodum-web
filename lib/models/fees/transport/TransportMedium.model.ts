import mongoose, { Document, Model } from "mongoose";

export interface ITransportMedium extends Document {
  session: string;
  transport_medium: string;
}

const TransportMediumSchema = new mongoose.Schema<ITransportMedium>(
  {
    session: { type: String, required: true },
    transport_medium: { type: String, required: true },
  },
  { timestamps: true }
);

const TransportMedium: Model<ITransportMedium> =
  (mongoose.models.TransportMedium as Model<ITransportMedium>) ||
  mongoose.model<ITransportMedium>("TransportMedium", TransportMediumSchema);

export default TransportMedium;
