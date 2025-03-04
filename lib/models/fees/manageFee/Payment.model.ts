import mongoose, { Document, Model } from "mongoose";

export interface IPayment extends Document {
  session: string;
  student?: string;
  image?: string;
  receipt_no?: string;
  ref_no?: string;
  installments?: any[]; // adjust type if needed
  received_date?: Date;
  remarks?: string;
  paymode?: string;
  paymode_details?: Record<string, unknown>; // adjust type if needed
  fee_type?: string;
  advance_dues_number?: string;
  class_name?: string;
  section?: string;
  board?: string;
  adm_no?: string;
  father_name?: string;
  school_name?: string;
  school_address?: string;
  website?: string;
  school_no?: string;
  affiliation_no?: string;
  logo?: string;
  wing_name?: string;
  entry_mode?: string;
  is_new?: boolean;
  is_active?: boolean;
  student_status?: string;
  bank_name?: string;
  fee_group?: string;
  is_canceled?: boolean;
  cheque_no?: string;
  cheque_date?: Date;
  cheque_bank?: string;
  branch_name?: string;
  deposit_bank?: string;
  actual_amount?: number;
  concession_amount?: number;
  paid_amount?: number;
  paid_heads?: any[]; // adjust type if needed
  concession_reason?: string;
}

const PaymentSchema = new mongoose.Schema<IPayment>(
  {
    session: { type: String, required: true },
    student: { type: String },
    image: { type: String },
    receipt_no: { type: String },
    ref_no: { type: String },
    installments: [mongoose.Schema.Types.Mixed],
    received_date: { type: Date },
    remarks: { type: String },
    paymode: { type: String },
    paymode_details: { type: mongoose.Schema.Types.Mixed },
    fee_type: { type: String },
    advance_dues_number: { type: String },
    class_name: { type: String },
    section: { type: String },
    board: { type: String },
    adm_no: { type: String },
    father_name: { type: String },
    school_name: { type: String },
    school_address: { type: String },
    website: { type: String },
    school_no: { type: String },
    affiliation_no: { type: String },
    logo: { type: String },
    wing_name: { type: String },
    entry_mode: { type: String },
    is_new: { type: Boolean },
    is_active: { type: Boolean },
    student_status: { type: String },
    bank_name: { type: String },
    fee_group: { type: String },
    is_canceled: { type: Boolean },
    cheque_no: { type: String },
    cheque_date: { type: Date },
    cheque_bank: { type: String },
    branch_name: { type: String },
    deposit_bank: { type: String },
    actual_amount: { type: Number },
    concession_amount: { type: Number },
    paid_amount: { type: Number },
    paid_heads: [mongoose.Schema.Types.Mixed],
    concession_reason: { type: String },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> =
  (mongoose.models.Payment as Model<IPayment>) ||
  mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
