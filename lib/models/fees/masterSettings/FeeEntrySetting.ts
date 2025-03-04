import mongoose, { Document, Model } from "mongoose";

export interface IFeeEntrySetting extends Document {
  prefix?: string;
  lead_zero?: string;
  receipt_no_start?: string;
  suffix?: string;
  generate_type?: string;
}

const FeeEntrySettingSchema = new mongoose.Schema<IFeeEntrySetting>(
  {
    prefix: { type: String },
    lead_zero: { type: String },
    receipt_no_start: { type: String },
    suffix: { type: String },
    generate_type: { type: String },
  },
  { timestamps: true }
);

const FeeEntrySetting: Model<IFeeEntrySetting> =
  (mongoose.models.FeeEntrySetting as Model<IFeeEntrySetting>) ||
  mongoose.model<IFeeEntrySetting>("FeeEntrySetting", FeeEntrySettingSchema);

export default FeeEntrySetting;
