import mongoose, { Document, Model } from "mongoose";

export interface ITransportGroup extends Document {
  session: string;
  distance_name: string;
  distance_amount: number;
  distance_from?: number;
  distance_to?: number;
  transport_term?: string;
}

const TransportGroupSchema = new mongoose.Schema<ITransportGroup>(
  {
    session: { type: String, required: true },
    distance_name: { type: String, required: true },
    distance_amount: { type: Number, required: true },
    distance_from: { type: Number },
    distance_to: { type: Number },
    transport_term: { type: String },
  },
  {
    timestamps: true,
  }
);

// Explicitly cast the model to Model<ITransportGroup>
const TransportGroup: Model<ITransportGroup> =
  (mongoose.models.TransportGroup as Model<ITransportGroup>) ||
  mongoose.model<ITransportGroup>("TransportGroup", TransportGroupSchema);

export default TransportGroup;
