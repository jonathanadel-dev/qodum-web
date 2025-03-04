import mongoose, { Document, Model } from "mongoose";

export interface IHead extends Document {
  session: string;
  name: string;
  print_name: string;
  pay_schedule: string;
  priority_no?: number;
  type: string;
  show_in_certificate?: boolean;
  fee_refundable?: boolean;
  affiliated_fee_type?: string;
}

const HeadSchema = new mongoose.Schema<IHead>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
    print_name: { type: String, required: true },
    pay_schedule: { type: String, required: true },
    priority_no: { type: Number },
    type: { type: String, required: true },
    show_in_certificate: { type: Boolean },
    fee_refundable: { type: Boolean },
    affiliated_fee_type: { type: String },
  },
  {
    timestamps: true,
  }
);

// Explicitly cast the model to Model<IHead>
const Head: Model<IHead> =
  (mongoose.models.Head as Model<IHead>) ||
  mongoose.model<IHead>("Head", HeadSchema);

export default Head;
