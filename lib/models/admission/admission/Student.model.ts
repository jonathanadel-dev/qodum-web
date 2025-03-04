import mongoose, { Document, Model } from "mongoose";

// Define an interface for a Student document
export interface IStudent extends Document {
  session: string;
  student: {
    is_up_for_admission?: boolean;
    is_online?: boolean;
    image?: string;
    enquiry_no?: string;
    reg_no: string;
    pros_no?: string;
    amount?: number;
    date?: Date;
    payment_mode?: string;
    admission_account?: string;
    post_account?: string;
    class?: string;
    board?: string;
    stream?: string;
    subjects?: any[]; // adjust type if needed
    optional_subject?: string;
    name?: string;
    middle_name?: string;
    last_name?: string;
    dob?: Date;
    place_of_birth?: string;
    gender?: string;
    contact_person_name?: string;
    contact_person_mobile?: number;
    contact_person_email?: string;
    secondary_contact_no?: number;
    h_no_and_streets?: string;
    email?: string;
    city?: string;
    mobile?: number;
    state?: string;
    pin_code?: number;
    aadhar_card_no?: number;
    religion?: string;
    blood_group?: string;
    caste?: string;
    category?: string;
    is_ews?: boolean;
    sibling?: boolean;
    transport?: string;
    nationality?: string;
  };
  parents: {
    father: {
      father_name?: string;
      middle_name?: string;
      last_name?: string;
      profession?: string;
      designation?: string;
      residence_address?: string;
      office_address?: string;
      email?: string;
      alternate_email?: string;
      dob?: Date;
      mobile?: number;
      phone?: number;
      company_name?: string;
      business_details?: string;
      qualification?: string;
      service_in?: string;
      office_phone?: number;
      office_mobile?: number;
      office_extension?: string;
      office_email?: string;
      office_website?: string;
      annual_income?: string;
      parent_status?: string;
    };
    mother: {
      mother_name?: string;
      middle_name?: string;
      last_name?: string;
      profession?: string;
      designation?: string;
      residence_address?: string;
      office_address?: string;
      email?: string;
      alternate_email?: string;
      dob?: Date;
      mobile?: number;
      phone?: number;
      company_name?: string;
      business_details?: string;
      qualification?: string;
      service_in?: string;
      office_phone?: number;
      office_mobile?: number;
      office_extension?: string;
      office_email?: string;
      office_website?: string;
      annual_income?: string;
      anniversary_date?: Date;
    };
  };
  others: {
    student_other_details: {
      medical_history?: string;
      descriptions?: string;
      allergies?: string;
      allergies_causes?: string;
      family_doctor_name?: string;
      family_doctor_phone?: number;
      family_doctor_address?: string;
      distance_from_home?: string;
      no_of_living_year?: number;
      only_child?: string;
      general_description?: string;
    };
    student_staff_relation: {
      staff_ward?: string;
      staff_name?: string;
    };
    is_alumni: {
      is_alumni?: boolean;
      academic_session?: string;
      class_name?: string;
      admission_number?: number;
    };
    previous_school_details?: any[];
  };
  guardian_details: {
    guardian_name?: string;
    profession?: string;
    designation?: string;
    company_name?: string;
    business_details?: string;
    qualification?: string;
    if_single_parent: {
      student_lives_with?: string;
      legal_custody_of_the_child?: string;
      correspondence_to?: string;
      check_id_applicable?: string;
      separation_reason?: string;
    };
  };
  siblings?: any[];
  paymode_details?: {
    cheque_no?: string;
    cheque_date?: Date;
    cheque_bank?: string;
    dd_no?: string;
    dd_date?: Date;
    dd_bank?: string;
    branch_name?: string;
    deposit_bank?: string;
    neft_name?: string;
  };
}

const StudentSchema = new mongoose.Schema<IStudent>(
  {
    session: { type: String, required: true },
    student: {
      is_up_for_admission: { type: Boolean },
      is_online: { type: Boolean },
      image: { type: String },
      enquiry_no: { type: String },
      reg_no: { type: String, required: true },
      pros_no: { type: String },
      amount: { type: Number },
      date: { type: Date },
      payment_mode: { type: String },
      admission_account: { type: String },
      post_account: { type: String },
      class: { type: String },
      board: { type: String },
      stream: { type: String },
      subjects: { type: [mongoose.Schema.Types.Mixed] },
      optional_subject: { type: String },
      name: { type: String },
      middle_name: { type: String },
      last_name: { type: String },
      dob: { type: Date },
      place_of_birth: { type: String },
      gender: { type: String },
      contact_person_name: { type: String },
      contact_person_mobile: { type: Number },
      contact_person_email: { type: String },
      secondary_contact_no: { type: Number },
      h_no_and_streets: { type: String },
      email: { type: String },
      city: { type: String },
      mobile: { type: Number },
      state: { type: String },
      pin_code: { type: Number },
      aadhar_card_no: { type: Number },
      religion: { type: String },
      blood_group: { type: String },
      caste: { type: String },
      category: { type: String },
      is_ews: { type: Boolean },
      sibling: { type: Boolean },
      transport: { type: String },
      nationality: { type: String },
    },
    parents: {
      father: {
        father_name: { type: String },
        middle_name: { type: String },
        last_name: { type: String },
        profession: { type: String },
        designation: { type: String },
        residence_address: { type: String },
        office_address: { type: String },
        email: { type: String },
        alternate_email: { type: String },
        dob: { type: Date },
        mobile: { type: Number },
        phone: { type: Number },
        company_name: { type: String },
        business_details: { type: String },
        qualification: { type: String },
        service_in: { type: String },
        office_phone: { type: Number },
        office_mobile: { type: Number },
        office_extension: { type: String },
        office_email: { type: String },
        office_website: { type: String },
        annual_income: { type: String },
        parent_status: { type: String },
      },
      mother: {
        mother_name: { type: String },
        middle_name: { type: String },
        last_name: { type: String },
        profession: { type: String },
        designation: { type: String },
        residence_address: { type: String },
        office_address: { type: String },
        email: { type: String },
        alternate_email: { type: String },
        dob: { type: Date },
        mobile: { type: Number },
        phone: { type: Number },
        company_name: { type: String },
        business_details: { type: String },
        qualification: { type: String },
        service_in: { type: String },
        office_phone: { type: Number },
        office_mobile: { type: Number },
        office_extension: { type: String },
        office_email: { type: String },
        office_website: { type: String },
        annual_income: { type: String },
        anniversary_date: { type: Date },
      },
    },
    others: {
      student_other_details: {
        medical_history: { type: String },
        descriptions: { type: String },
        allergies: { type: String },
        allergies_causes: { type: String },
        family_doctor_name: { type: String },
        family_doctor_phone: { type: Number },
        family_doctor_address: { type: String },
        distance_from_home: { type: String },
        no_of_living_year: { type: Number },
        only_child: { type: String },
        general_description: { type: String },
      },
      student_staff_relation: {
        staff_ward: { type: String },
        staff_name: { type: String },
      },
      is_alumni: {
        is_alumni: { type: Boolean },
        academic_session: { type: String },
        class_name: { type: String },
        admission_number: { type: Number },
      },
      previous_school_details: { type: [mongoose.Schema.Types.Mixed] },
    },
    guardian_details: {
      guardian_name: { type: String },
      profession: { type: String },
      designation: { type: String },
      company_name: { type: String },
      business_details: { type: String },
      qualification: { type: String },
      if_single_parent: {
        student_lives_with: { type: String },
        legal_custody_of_the_child: { type: String },
        correspondence_to: { type: String },
        check_id_applicable: { type: String },
        separation_reason: { type: String },
      },
    },
    siblings: [mongoose.Schema.Types.Mixed],
    paymode_details: {
      cheque_no: { type: String },
      cheque_date: { type: Date },
      cheque_bank: { type: String },
      dd_no: { type: String },
      dd_date: { type: Date },
      dd_bank: { type: String },
      branch_name: { type: String },
      deposit_bank: { type: String },
      neft_name: { type: String },
    },
  },
  { timestamps: true }
);

const Student: Model<IStudent> =
  (mongoose.models.Student as Model<IStudent>) ||
  mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
