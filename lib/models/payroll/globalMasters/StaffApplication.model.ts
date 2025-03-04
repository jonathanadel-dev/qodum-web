import mongoose, { Document, Model } from "mongoose";

export interface IStaffApplication extends Document {
  session: string;
  is_up_for_admission?: boolean;
  staff_registration: {
    post: string;
    reg_no: string;
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
  staff_educational_details?: any[]; // Adjust type if needed
  staff_experience_details?: any[]; // Adjust type if needed
  staff_document_details?: any[]; // Adjust type if needed
}

const StaffApplicationSchema = new mongoose.Schema<IStaffApplication>(
  {
    session: { type: String, required: true },
    is_up_for_admission: { type: Boolean },
    staff_registration: {
      post: { type: String, required: true },
      reg_no: { type: String, required: true, unique: true },
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
    staff_educational_details: [{ type: mongoose.Schema.Types.Mixed }],
    staff_experience_details: [{ type: mongoose.Schema.Types.Mixed }],
    staff_document_details: [{ type: mongoose.Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const StaffApplication: Model<IStaffApplication> =
  (mongoose.models.StaffApplication as Model<IStaffApplication>) ||
  mongoose.model<IStaffApplication>("StaffApplication", StaffApplicationSchema);

export default StaffApplication;
