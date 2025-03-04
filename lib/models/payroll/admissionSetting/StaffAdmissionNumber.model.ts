import mongoose, { Document, Model } from "mongoose";

export interface IStaffAdmissionNumber extends Document {
  setting_type?: string;
  should_be?: string;
  rec_no?: number;
  prefix?: string;
  start_from?: number;
  lead_zero?: string;
  suffix?: string;
}

const StaffAdmissionNumberSchema = new mongoose.Schema<IStaffAdmissionNumber>(
  {
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

const StaffAdmissionNumber: Model<IStaffAdmissionNumber> =
  (mongoose.models.StaffAdmissionNumber as Model<IStaffAdmissionNumber>) ||
  mongoose.model<IStaffAdmissionNumber>(
    "StaffAdmissionNumber",
    StaffAdmissionNumberSchema
  );

export default StaffAdmissionNumber;
