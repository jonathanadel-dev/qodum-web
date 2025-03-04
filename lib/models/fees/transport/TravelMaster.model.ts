import mongoose, { Document, Model } from "mongoose";

export interface ITravelMaster extends Document {
  session: string;
  travel_agency_name: string;
  mobile_no: number;
  mail_id: string;
}

const TravelMasterSchema = new mongoose.Schema<ITravelMaster>(
  {
    session: { type: String, required: true },
    travel_agency_name: { type: String, required: true },
    mobile_no: { type: Number, required: true },
    mail_id: { type: String, required: true },
  },
  { timestamps: true }
);

const TravelMaster: Model<ITravelMaster> =
  (mongoose.models.TravelMaster as Model<ITravelMaster>) ||
  mongoose.model<ITravelMaster>("TravelMaster", TravelMasterSchema);

export default TravelMaster;
