import mongoose, { Document, Model } from "mongoose";

export interface IRemark extends Document {
  session: string;
  remark: string;
}

const RemarkSchema = new mongoose.Schema<IRemark>(
  {
    session: { type: String, required: true },
    remark: { type: String, required: true },
  },
  { timestamps: true }
);

const Remark: Model<IRemark> =
  (mongoose.models.Remark as Model<IRemark>) ||
  mongoose.model<IRemark>("Remark", RemarkSchema);

export default Remark;
