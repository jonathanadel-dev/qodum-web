import mongoose, { Document, Model } from "mongoose";

export interface ILateFeeHeadWise extends Document {
  session: string;
  fee_group: string;
  fee_type?: string;
  installment?: string;
  head?: string;
  due_date?: Date;
  late_fee_type?: string;
  amount?: number;
}

const LateFeeHeadWiseSchema = new mongoose.Schema<ILateFeeHeadWise>(
  {
    session: { type: String, required: true },
    fee_group: { type: String, required: true },
    fee_type: { type: String },
    installment: { type: String },
    head: { type: String },
    due_date: { type: Date },
    late_fee_type: { type: String },
    amount: { type: Number },
  },
  { timestamps: true }
);

const LateFeeHeadWise: Model<ILateFeeHeadWise> =
  (mongoose.models.LateFeeHeadWise as Model<ILateFeeHeadWise>) ||
  mongoose.model<ILateFeeHeadWise>("LateFeeHeadWise", LateFeeHeadWiseSchema);

export default LateFeeHeadWise;
