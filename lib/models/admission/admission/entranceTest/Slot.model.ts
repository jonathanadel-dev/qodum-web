import mongoose, { Document, Model } from "mongoose";

export interface ISlot extends Document {
  session?: string;
  class_name?: string;
  slot_name?: string;
  slot_date?: Date;
  start_time?: string;
  end_time?: string;
  applicant?: number;
  alloted?: number;
  students?: any[];
}

const SlotSchema = new mongoose.Schema<ISlot>(
  {
    session: { type: String },
    class_name: { type: String },
    slot_name: { type: String },
    slot_date: { type: Date },
    start_time: { type: String },
    end_time: { type: String },
    applicant: { type: Number },
    alloted: { type: Number },
    // Use shorthand array notation for arrays of mixed values
    students: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

// Explicitly cast the model so TypeScript knows its callable signature
const Slot: Model<ISlot> =
  (mongoose.models.Slot as Model<ISlot>) ||
  mongoose.model<ISlot>("Slot", SlotSchema);

export default Slot;
