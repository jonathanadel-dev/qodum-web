import mongoose, { Document, Model } from "mongoose";

export interface IStationaryDetails extends Document {
  session: string;
  stationary_name: string;
  amount: number;
  account_name: string;
  school_name: string;
  is_online?: boolean;
}

const StationaryDetailsSchema = new mongoose.Schema<IStationaryDetails>(
  {
    session: { type: String, required: true },
    stationary_name: { type: String, required: true },
    amount: { type: Number, required: true },
    account_name: { type: String, required: true },
    school_name: { type: String, required: true },
    is_online: { type: Boolean },
  },
  { timestamps: true }
);

const StationaryDetails: Model<IStationaryDetails> =
  (mongoose.models.StationaryDetails as Model<IStationaryDetails>) ||
  mongoose.model<IStationaryDetails>(
    "StationaryDetails",
    StationaryDetailsSchema
  );

export default StationaryDetails;
