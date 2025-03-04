import mongoose, { Document, Model } from "mongoose";

export interface IDesignation extends Document {
  session: string;
  designation: string;
  show_in_payroll?: boolean;
}

const DesignationSchema = new mongoose.Schema<IDesignation>(
  {
    session: { type: String, required: true },
    designation: { type: String, required: true },
    show_in_payroll: { type: Boolean },
  },
  { timestamps: true }
);

const Designation: Model<IDesignation> =
  (mongoose.models.Designation as Model<IDesignation>) ||
  mongoose.model<IDesignation>("Designation", DesignationSchema);

export default Designation;
