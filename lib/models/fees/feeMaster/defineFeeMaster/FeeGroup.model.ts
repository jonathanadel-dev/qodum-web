import mongoose, { Document, Model } from "mongoose";

export interface IGroup extends Document {
  session: string;
  name: string;
  is_special?: boolean;
  affiliated_heads?: any[]; // Adjust this type if you have a more specific structure
}

const GroupSchema = new mongoose.Schema<IGroup>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
    is_special: { type: Boolean },
    affiliated_heads: [{ type: mongoose.Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const Group: Model<IGroup> =
  (mongoose.models.Group as Model<IGroup>) ||
  mongoose.model<IGroup>("Group", GroupSchema);

export default Group;
