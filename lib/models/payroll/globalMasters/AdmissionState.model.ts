import mongoose, { Document, Model } from "mongoose";

export interface IAdmissionState extends Document {
  session: string;
  logo?: string;
  is_staff_admission_opened?: boolean;
  admission_accounts_last_updated_at?: Date;
  post_accounts_last_updated_at?: Date;
  classes_last_updated_at?: Date;
  boards_last_updated_at?: Date;
  streams_last_updated_at?: Date;
  subjects_last_updated_at?: Date;
  optional_subjects_last_updated_at?: Date;
  religions_last_updated_at?: Date;
  blood_groups_last_updated_at?: Date;
  casts_last_updated_at?: Date;
  categories_last_updated_at?: Date;
  transport_mediums_last_updated_at?: Date;
  nationalities_last_updated_at?: Date;
  professions_last_updated_at?: Date;
  designations_last_updated_at?: Date;
  staff_types_last_updated_at?: Date;
  sections_last_updated_at?: Date;
  perishes_last_updated_at?: Date;
  cadet_types_last_updated_at?: Date;
  clubs_last_updated_at?: Date;
  houses_last_updated_at?: Date;
  fees_dashboard_data?: {
    student_head_counts?: {
      total?: number;
      boys?: number;
      girls?: number;
    };
    fee_revenue_summary?: {
      total?: number;
      outstanding_revenue?: number;
      total_received?: number;
    };
    total_paymode_summary?: {
      cash?: any[];
      qr?: any[];
      dd?: any[];
      cheque?: any[];
      neft?: any[];
      online?: any[];
      swiped_card?: any[];
    };
  };
}

const AdmissionStateSchema = new mongoose.Schema<IAdmissionState>(
  {
    session: { type: String, required: true },
    logo: { type: String },
    is_staff_admission_opened: { type: Boolean },
    admission_accounts_last_updated_at: { type: Date, default: new Date() },
    post_accounts_last_updated_at: { type: Date, default: new Date() },
    classes_last_updated_at: { type: Date, default: new Date() },
    boards_last_updated_at: { type: Date, default: new Date() },
    streams_last_updated_at: { type: Date, default: new Date() },
    subjects_last_updated_at: { type: Date, default: new Date() },
    optional_subjects_last_updated_at: { type: Date, default: new Date() },
    religions_last_updated_at: { type: Date, default: new Date() },
    blood_groups_last_updated_at: { type: Date, default: new Date() },
    casts_last_updated_at: { type: Date, default: new Date() },
    categories_last_updated_at: { type: Date, default: new Date() },
    transport_mediums_last_updated_at: { type: Date, default: new Date() },
    nationalities_last_updated_at: { type: Date, default: new Date() },
    professions_last_updated_at: { type: Date, default: new Date() },
    designations_last_updated_at: { type: Date, default: new Date() },
    staff_types_last_updated_at: { type: Date, default: new Date() },
    sections_last_updated_at: { type: Date, default: new Date() },
    perishes_last_updated_at: { type: Date, default: new Date() },
    cadet_types_last_updated_at: { type: Date, default: new Date() },
    clubs_last_updated_at: { type: Date, default: new Date() },
    houses_last_updated_at: { type: Date, default: new Date() },
    fees_dashboard_data: {
      student_head_counts: {
        total: { type: Number },
        boys: { type: Number },
        girls: { type: Number },
      },
      fee_revenue_summary: {
        total: { type: Number },
        outstanding_revenue: { type: Number },
        total_received: { type: Number },
      },
      total_paymode_summary: {
        cash: { type: [mongoose.Schema.Types.Mixed] },
        qr: { type: [mongoose.Schema.Types.Mixed] },
        dd: { type: [mongoose.Schema.Types.Mixed] },
        cheque: { type: [mongoose.Schema.Types.Mixed] },
        neft: { type: [mongoose.Schema.Types.Mixed] },
        online: { type: [mongoose.Schema.Types.Mixed] },
        swiped_card: { type: [mongoose.Schema.Types.Mixed] },
      },
    },
  },
  { timestamps: true }
);

const AdmissionState: Model<IAdmissionState> =
  (mongoose.models.AdmissionState as Model<IAdmissionState>) ||
  mongoose.model<IAdmissionState>("AdmissionState", AdmissionStateSchema);

export default AdmissionState;
