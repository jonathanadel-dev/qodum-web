import mongoose, { Document, Model } from "mongoose";

export interface IStaffType extends Document {
  session: string;
  staff_type: string;
  is_hourly_paid?: boolean;
  show_on_ecare?: boolean;
}

const StaffTypeSchema = new mongoose.Schema<IStaffType>(
  {
    session: { type: String, required: true },
    staff_type: { type: String, required: true },
    is_hourly_paid: { type: Boolean },
    show_on_ecare: { type: Boolean },
  },
  { timestamps: true }
);

const StaffType: Model<IStaffType> =
  (mongoose.models.StaffType as Model<IStaffType>) ||
  mongoose.model<IStaffType>("StaffType", StaffTypeSchema);

export default StaffType;
