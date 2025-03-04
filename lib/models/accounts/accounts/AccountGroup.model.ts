import mongoose, { Document, Model } from "mongoose";

export interface IAccountGroup extends Document {
  session: string;
  group_name: string;
  category: string;
  group_type: string;
  group_no: number;
}

const AccountGroupSchema = new mongoose.Schema<IAccountGroup>(
  {
    session: { type: String, required: true },
    group_name: { type: String, required: true },
    category: { type: String, required: true },
    group_type: { type: String, required: true },
    group_no: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Explicitly cast the model so that TypeScript knows its callable signature.
const AccountGroup: Model<IAccountGroup> =
  (mongoose.models.AccountGroup as Model<IAccountGroup>) ||
  mongoose.model<IAccountGroup>("AccountGroup", AccountGroupSchema);

export default AccountGroup;
