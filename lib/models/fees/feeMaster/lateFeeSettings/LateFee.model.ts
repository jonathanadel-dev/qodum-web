import mongoose, { Document, Model } from "mongoose";

export interface ILateFee extends Document {
  session: string;
  fee_group: string;
  fee_type?: string;
  installment?: string;
  due_date?: Date;
  late_fee_type?: string;
  amount?: number;
}

const LateFeeSchema = new mongoose.Schema<ILateFee>(
  {
    session: { type: String, required: true },
    fee_group: { type: String, required: true },
    fee_type: { type: String },
    installment: { type: String },
    due_date: { type: Date },
    late_fee_type: { type: String },
    amount: { type: Number },
  },
  { timestamps: true }
);

const LateFee: Model<ILateFee> =
  (mongoose.models.LateFee as Model<ILateFee>) ||
  mongoose.model<ILateFee>("LateFee", LateFeeSchema);

export default LateFee;
