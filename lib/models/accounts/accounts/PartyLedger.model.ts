import mongoose, { Document, Model } from "mongoose";

export interface IPartyLedger extends Document {
  session: string;
  account_name: string;
  account_no: number;
  cin_no?: number;
  group: string;
  account_type: string;
  account_address?: string;
  account_city?: string;
  pin_code?: number;
  email?: string;
  mobile?: number;
  pan?: string;
  gstin?: string;
  opening_balance?: number;
  opening_balance_type?: string;
  assign_date?: Date;
}

const PartyLedgerSchema = new mongoose.Schema<IPartyLedger>(
  {
    session: { type: String, required: true },
    account_name: { type: String, required: true },
    account_no: { type: Number, required: true },
    cin_no: { type: Number },
    group: { type: String, required: true },
    account_type: { type: String, required: true },
    account_address: { type: String },
    account_city: { type: String },
    pin_code: { type: Number },
    email: { type: String },
    mobile: { type: Number },
    pan: { type: String },
    gstin: { type: String },
    opening_balance: { type: Number },
    opening_balance_type: { type: String },
    assign_date: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Explicitly cast the model so that TypeScript sees it as a callable Model<IPartyLedger>
const PartyLedger: Model<IPartyLedger> =
  (mongoose.models.PartyLedger as Model<IPartyLedger>) ||
  mongoose.model<IPartyLedger>("PartyLedger", PartyLedgerSchema);

export default PartyLedger;
