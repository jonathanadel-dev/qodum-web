import mongoose, { Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  session: string;
  enquiry_no?: string;
  enquiry_date?: Date;
  visitor_name: string;
  visitor_address: string;
  mobile_no: number;
  purpose_is_admission?: boolean;
  student_name?: string;
  class_name?: string;
  reason_to_visit?: string;
  contact_person?: string;
  reference_details?: string;
}

const EnquirySchema = new mongoose.Schema<IEnquiry>(
  {
    session: { type: String, required: true },
    enquiry_no: { type: String },
    enquiry_date: { type: Date },
    visitor_name: { type: String, required: true },
    visitor_address: { type: String, required: true },
    mobile_no: { type: Number, required: true },
    purpose_is_admission: { type: Boolean },
    student_name: { type: String },
    class_name: { type: String },
    reason_to_visit: { type: String },
    contact_person: { type: String },
    reference_details: { type: String },
  },
  {
    timestamps: true,
  }
);

const Enquiry: Model<IEnquiry> =
  (mongoose.models.Enquiry as Model<IEnquiry>) ||
  mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
