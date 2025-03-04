import mongoose, { Document, Model } from "mongoose";

export interface IDepartment extends Document {
  session: string;
  department: string;
}

const DepartmentSchema = new mongoose.Schema<IDepartment>(
  {
    session: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

const Department: Model<IDepartment> =
  (mongoose.models.Department as Model<IDepartment>) ||
  mongoose.model<IDepartment>("Department", DepartmentSchema);

export default Department;
