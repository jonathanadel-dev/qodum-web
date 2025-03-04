import mongoose, { Document, Model } from "mongoose";

export interface IDueLimit extends Document {
  session: string;
  class_name?: string;
  fee_type?: string;
  late_fee_on_due?: boolean;
  dues_amount?: number;
  is_percent?: boolean;
  heads?: string;
  fine_waive_off_setting?: string;
}

const DueLimitSchema = new mongoose.Schema<IDueLimit>(
  {
    session: { type: String, required: true },
    class_name: { type: String },
    fee_type: { type: String },
    late_fee_on_due: { type: Boolean },
    dues_amount: { type: Number },
    is_percent: { type: Boolean },
    heads: { type: String },
    fine_waive_off_setting: { type: String },
  },
  { timestamps: true }
);

const DueLimit: Model<IDueLimit> =
  (mongoose.models.DueLimit as Model<IDueLimit>) ||
  mongoose.model<IDueLimit>("DueLimit", DueLimitSchema);

export default DueLimit;
