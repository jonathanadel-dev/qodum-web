import mongoose, { Document, Model } from "mongoose";

// Define an interface for your Installment document
export interface IInstallment extends Document {
  session: string;
  name: string;
  print_name: string;
  preference_no: number;
  due_on_date: {
    day: string;
    month: string;
    year: string;
  };
  due_date: {
    day: string;
    month: string;
    year: string;
  };
  months: string[];
}

// Create the schema with the interface as a generic
const InstallmentSchema = new mongoose.Schema<IInstallment>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
    print_name: { type: String, required: true },
    preference_no: { type: Number, required: true },
    due_on_date: {
      day: { type: String, required: true },
      month: { type: String, required: true },
      year: { type: String, required: true },
    },
    due_date: {
      day: { type: String, required: true },
      month: { type: String, required: true },
      year: { type: String, required: true },
    },
    months: [{ type: String, max: 13 }],
  },
  {
    timestamps: true,
  }
);

// Explicitly cast the model so that TypeScript knows it's a Model<IInstallment>
const Installment: Model<IInstallment> =
  (mongoose.models.Installment as Model<IInstallment>) ||
  mongoose.model<IInstallment>("Installment", InstallmentSchema);

export default Installment;
