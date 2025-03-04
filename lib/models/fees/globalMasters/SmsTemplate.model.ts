import mongoose, { Document, Model } from "mongoose";

export interface ISmsTemplate extends Document {
  session: string;
  sms_type: string;
  sms_template: string;
  is_enable?: boolean;
}

const SmsTemplateSchema = new mongoose.Schema<ISmsTemplate>(
  {
    session: { type: String, required: true },
    sms_type: { type: String, required: true },
    sms_template: { type: String, required: true },
    is_enable: { type: Boolean },
  },
  { timestamps: true }
);

const SmsTemplate: Model<ISmsTemplate> =
  (mongoose.models.SmsTemplate as Model<ISmsTemplate>) ||
  mongoose.model<ISmsTemplate>("SmsTemplate", SmsTemplateSchema);

export default SmsTemplate;
