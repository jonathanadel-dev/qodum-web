import mongoose, { Document, Model } from "mongoose";

export interface IAdmission extends Document {
  session: string;
  school: string;
  class_name: string;
  board?: string;
  setting_type?: string;
  should_be?: string;
  rec_no?: number;
  prefix?: string;
  start_from?: number;
  lead_zero?: string;
  suffix?: string;
}

const AdmissionSchema = new mongoose.Schema<IAdmission>(
  {
    session: { type: String, required: true },
    school: { type: String, required: true },
    class_name: { type: String, required: true },
    board: { type: String },
    setting_type: { type: String },
    should_be: { type: String },
    rec_no: { type: Number },
    prefix: { type: String },
    start_from: { type: Number },
    lead_zero: { type: String },
    suffix: { type: String },
  },
  { timestamps: true }
);

const Admission: Model<IAdmission> =
  (mongoose.models.Admission as Model<IAdmission>) ||
  mongoose.model<IAdmission>("Admission", AdmissionSchema);

export default Admission;
