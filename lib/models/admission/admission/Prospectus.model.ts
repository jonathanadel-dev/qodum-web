import mongoose, { Document, Model } from "mongoose";

export interface IProspectus extends Document {
  session: string;
  class_name: string;
  board?: string;
  reg_no: number;
  date?: Date;
  student_name: string;
  student_middle_name?: string;
  student_last_name?: string;
  reference?: string;
  date_of_birth?: Date;
  gender: string;
  father_name: string;
  father_middle_name?: string;
  father_last_name?: string;
  mother_name?: string;
  mother_middle_name?: string;
  mother_last_name?: string;
  con_person?: string;
  con_mobile: number;
  con_email?: string;
  h_no_and_streets?: string;
  state?: string;
  city?: string;
  pin_code?: string;
  stationaries?: string[];
  paymode?: {
    name?: string;
    cheque_no?: number;
    cheque_date?: Date;
    cheque_bank?: string;
    branch_name?: string;
    deposit_bank?: string;
    dd_no?: number;
  };
  is_online?: boolean;
}

const ProspectusSchema = new mongoose.Schema<IProspectus>(
  {
    session: { type: String, required: true },
    class_name: { type: String, required: true },
    board: { type: String },
    reg_no: { type: Number, required: true },
    date: { type: Date },
    student_name: { type: String, required: true },
    student_middle_name: { type: String },
    student_last_name: { type: String },
    reference: { type: String },
    date_of_birth: { type: Date },
    gender: { type: String, required: true },
    father_name: { type: String, required: true },
    father_middle_name: { type: String },
    father_last_name: { type: String },
    mother_name: { type: String },
    mother_middle_name: { type: String },
    mother_last_name: { type: String },
    con_person: { type: String },
    con_mobile: { type: Number, required: true },
    con_email: { type: String },
    h_no_and_streets: { type: String },
    state: { type: String },
    city: { type: String },
    pin_code: { type: String },
    stationaries: [{ type: String }],
    paymode: {
      name: { type: String },
      cheque_no: { type: Number },
      cheque_date: { type: Date },
      cheque_bank: { type: String },
      branch_name: { type: String },
      deposit_bank: { type: String },
      dd_no: { type: Number },
    },
    is_online: { type: Boolean },
  },
  { timestamps: true }
);

const Prospectus: Model<IProspectus> =
  (mongoose.models.Prospectus as Model<IProspectus>) ||
  mongoose.model<IProspectus>("Prospectus", ProspectusSchema);

export default Prospectus;
