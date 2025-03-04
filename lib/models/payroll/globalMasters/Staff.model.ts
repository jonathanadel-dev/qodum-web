import mongoose, { Document, Model } from "mongoose";

export interface IStaff extends Document {
  session: string;
  staff_registration: {
    post: string;
    reg_no: string;
    employee_code: string;
    approved_teacher?: string;
    teacher_id?: string;
    cbse_code?: string;
    first_name_title: string;
    first_name: string;
    middle_name?: string;
    last_name?: string;
    gender?: string;
    email?: string;
    alternate_email?: string;
    phone?: number;
    mobile: number;
    whatsapp_mobile?: number;
    emergency_mobile?: number;
    wing?: string;
    is_active?: boolean;
    profile_picture?: string;
    maritial_status?: string;
    qualification?: string;
    date_of_birth: Date;
    date_of_anniversary?: Date;
    date_of_joining?: Date;
    date_of_retire?: Date;
    date_of_retire_is_extend?: boolean;
    permenant_address?: string;
    current_address?: string;
    father_or_spouse_name: string;
    father_or_spouse_mobile?: number;
    father_or_spouse_relation?: string;
    blood_group?: string;
    staff_type: string;
    designation: string;
    department: string;
    religion?: string;
    aadhar_card_no?: number;
  };
  staff_salary_details?: {
    emp_no?: string;
    pan_no?: string;
    bank_name?: string;
    bank_account_no?: string;
    is_generate_salary?: boolean;
    is_salary_to_bank?: boolean;
    machine_no?: number;
    pf_no?: string;
    esi_no?: string;
    uan_no?: string;
    emp_acc_no?: string;
    status?: string;
    salary_group?: string;
    basic_salary_part?: {
      basic?: {
        value?: number;
        applied_on?: Date;
      };
      grade_pay?: {
        value?: number;
        applied_on?: Date;
      };
    };
    confirmation_date?: Date;
    permanent_date?: Date;
    leaving_date?: Date;
    joining_date_epf?: Date;
    joining_date_eps?: Date;
    leaving_date_epf?: Date;
    leaving_date_eps?: Date;
    probation_date?: Date;
    increment_date?: Date;
    reason_of_leaving?: string;
    short_name?: string;
  };
  staff_salary_heads?: any[];
  staff_educational_details?: any[];
  staff_document_details?: any[];
}

const StaffSchema = new mongoose.Schema<IStaff>(
  {
    session: { type: String, required: true },
    staff_registration: {
      post: { type: String, required: true },
      reg_no: { type: String, required: true, unique: true },
      employee_code: { type: String, required: true, unique: true },
      approved_teacher: { type: String },
      teacher_id: { type: String },
      cbse_code: { type: String },
      first_name_title: { type: String, required: true },
      first_name: { type: String, required: true },
      middle_name: { type: String },
      last_name: { type: String },
      gender: { type: String },
      email: { type: String },
      alternate_email: { type: String },
      phone: { type: Number },
      mobile: { type: Number, required: true },
      whatsapp_mobile: { type: Number },
      emergency_mobile: { type: Number },
      wing: { type: String },
      is_active: { type: Boolean },
      profile_picture: { type: String },
      maritial_status: { type: String },
      qualification: { type: String },
      date_of_birth: { type: Date, required: true },
      date_of_anniversary: { type: Date },
      date_of_joining: { type: Date },
      date_of_retire: { type: Date },
      date_of_retire_is_extend: { type: Boolean },
      permenant_address: { type: String },
      current_address: { type: String },
      father_or_spouse_name: { type: String, required: true },
      father_or_spouse_mobile: { type: Number },
      father_or_spouse_relation: { type: String },
      blood_group: { type: String },
      staff_type: { type: String, required: true },
      designation: { type: String, required: true },
      department: { type: String, required: true },
      religion: { type: String },
      aadhar_card_no: { type: Number },
    },
    staff_salary_details: {
      emp_no: { type: String },
      pan_no: { type: String },
      bank_name: { type: String },
      bank_account_no: { type: String },
      is_generate_salary: { type: Boolean },
      is_salary_to_bank: { type: Boolean },
      machine_no: { type: Number },
      pf_no: { type: String },
      esi_no: { type: String },
      uan_no: { type: String },
      emp_acc_no: { type: String },
      status: { type: String },
      salary_group: { type: String },
      basic_salary_part: {
        basic: {
          value: { type: Number },
          applied_on: { type: Date },
        },
        grade_pay: {
          value: { type: Number },
          applied_on: { type: Date },
        },
      },
      confirmation_date: { type: Date },
      permanent_date: { type: Date },
      leaving_date: { type: Date },
      joining_date_epf: { type: Date },
      joining_date_eps: { type: Date },
      leaving_date_epf: { type: Date },
      leaving_date_eps: { type: Date },
      probation_date: { type: Date },
      increment_date: { type: Date },
      reason_of_leaving: { type: String },
      short_name: { type: String },
    },
    staff_salary_heads: [{ type: mongoose.Schema.Types.Mixed }],
    staff_educational_details: [{ type: mongoose.Schema.Types.Mixed }],
    staff_document_details: [{ type: mongoose.Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const Staff: Model<IStaff> =
  (mongoose.models.Staff as Model<IStaff>) ||
  mongoose.model<IStaff>("Staff", StaffSchema);

export default Staff;
