import mongoose, { Document, Model } from "mongoose";

// Define an interface for a Financial Year document
export interface IFinancialYear extends Document {
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

// Create the schema using the interface as a generic
const FinancialYearSchema = new mongoose.Schema<IFinancialYear>(
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

// Explicitly cast the model so that TypeScript knows its callable signature.
const FinancialYear: Model<IFinancialYear> =
  (mongoose.models.FinancialYear as Model<IFinancialYear>) ||
  mongoose.model<IFinancialYear>("FinancialYear", FinancialYearSchema);

export default FinancialYear;
