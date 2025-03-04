import mongoose, { Document, Model } from "mongoose";

export interface INarrationMaster extends Document {
  session: string;
  voucher_type: string;
  narration: string;
}

const NarrationMasterSchema = new mongoose.Schema<INarrationMaster>(
  {
    session: { type: String, required: true },
    voucher_type: { type: String, required: true },
    narration: { type: String, required: true },
  },
  { timestamps: true }
);

const NarrationMaster: Model<INarrationMaster> =
  (mongoose.models.NarrationMaster as Model<INarrationMaster>) ||
  mongoose.model<INarrationMaster>("NarrationMaster", NarrationMasterSchema);

export default NarrationMaster;
