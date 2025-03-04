// Import
import mongoose, { Document, Model } from "mongoose";

// Define interface for AcademicYear document
export interface IAcademicYear extends Document {
  year_name: string;
  start_date: {
    day: string;
    month: string;
    year: string;
  };
  end_date: {
    day: string;
    month: string;
    year: string;
  };
  is_active: boolean;
}

// Academic year schema
const AcademicYearSchema = new mongoose.Schema<IAcademicYear>(
  {
    year_name: { type: String, required: true, unique: true },
    start_date: {
      day: { type: String, required: true },
      month: { type: String, required: true },
      year: { type: String, required: true },
    },
    end_date: {
      day: { type: String, required: true },
      month: { type: String, required: true },
      year: { type: String, required: true },
    },
    is_active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const AcademicYear: Model<IAcademicYear> =
  (mongoose.models.AcademicYear as Model<IAcademicYear>) ||
  mongoose.model<IAcademicYear>("AcademicYear", AcademicYearSchema);

export default AcademicYear;
