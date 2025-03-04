import mongoose, { Document, Model } from "mongoose";

export interface IEnquiryNoSetting extends Document {
  session: string;
  enquiry_no_setting_should_be: string;
  prefix: string;
  start_from: number;
  lead_zero: string;
  suffix?: string;
}

const EnquiryNoSettingSchema = new mongoose.Schema<IEnquiryNoSetting>(
  {
    session: { type: String, required: true },
    enquiry_no_setting_should_be: { type: String, required: true },
    prefix: { type: String, required: true },
    start_from: { type: Number, required: true },
    lead_zero: { type: String, required: true },
    suffix: { type: String },
  },
  { timestamps: true }
);

const EnquiryNoSetting: Model<IEnquiryNoSetting> =
  (mongoose.models.EnquiryNoSetting as Model<IEnquiryNoSetting>) ||
  mongoose.model<IEnquiryNoSetting>("EnquiryNoSetting", EnquiryNoSettingSchema);

export default EnquiryNoSetting;
