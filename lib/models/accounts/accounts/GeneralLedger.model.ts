import mongoose, { Document, Model } from "mongoose";

export interface IGeneralLedger extends Document {
  session: string;
  account_name: string;
  group: string;
  account_type: string;
  opening_balance?: number;
  opening_balance_type?: string;
  assign_date?: Date;
  is_cash_book?: boolean;
  is_fixed_asset?: boolean;
  depreciation?: number;
}

const GeneralLedgerSchema = new mongoose.Schema<IGeneralLedger>(
  {
    session: { type: String, required: true },
    account_name: { type: String, required: true },
    group: { type: String, required: true },
    account_type: { type: String, required: true },
    opening_balance: { type: Number },
    opening_balance_type: { type: String },
    assign_date: { type: Date },
    is_cash_book: { type: Boolean },
    is_fixed_asset: { type: Boolean },
    depreciation: { type: Number },
  },
  {
    timestamps: true,
  }
);

const GeneralLedger: Model<IGeneralLedger> =
  (mongoose.models.GeneralLedger as Model<IGeneralLedger>) ||
  mongoose.model<IGeneralLedger>("GeneralLedger", GeneralLedgerSchema);

export default GeneralLedger;
