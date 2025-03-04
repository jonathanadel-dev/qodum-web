import mongoose, { Document, Model } from "mongoose";

// Define an interface for the Class document
export interface IClass extends Document {
  class_name: string;
  wing_name: string;
  school: string;
  order: number;
  sections: string[];
  affiliated_heads?: {
    group_name?: string;
    heads?: any[];
  };
  affiliated_special_heads?: {
    group_name?: string;
    heads?: any[];
  };
  is_admission_opened?: boolean;
}

// Create the schema using the interface as a generic
const ClassSchema = new mongoose.Schema<IClass>(
  {
    class_name: { type: String, required: true },
    wing_name: { type: String, required: true },
    school: { type: String, required: true },
    order: { type: Number, required: true },
    sections: [String],
    affiliated_heads: {
      group_name: { type: String },
      heads: { type: Array },
    },
    affiliated_special_heads: {
      group_name: { type: String },
      heads: { type: Array },
    },
    is_admission_opened: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

// Explicitly cast the model so TypeScript knows it’s callable.
const ClassModel: Model<IClass> =
  (mongoose.models.Class as Model<IClass>) ||
  mongoose.model<IClass>("Class", ClassSchema);

export default ClassModel;
