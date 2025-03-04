import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  session: string;
  name: string;
  user_name: string;
  password: string;
  is_reset_password?: boolean;
  designation?: string;
  email?: string;
  employee?: string;
  mobile?: number;
  profile_picture?: string;
  schools?: string[];
  is_active?: boolean;
  enable_otp?: boolean;
  permissions?: any[]; // Adjust type if needed
  is_admin?: boolean;
  fee_types?: any[]; // Adjust type if needed
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    session: { type: String, required: true },
    name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_reset_password: { type: Boolean },
    designation: { type: String },
    email: { type: String },
    employee: { type: String },
    mobile: { type: Number },
    profile_picture: { type: String },
    schools: [{ type: String }],
    is_active: { type: Boolean },
    enable_otp: { type: Boolean },
    permissions: [{ type: mongoose.Schema.Types.Mixed }],
    is_admin: { type: Boolean },
    fee_types: [{ type: mongoose.Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
