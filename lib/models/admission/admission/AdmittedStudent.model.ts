import mongoose, { Document, Model } from "mongoose";

// Define interface for AdmittedStudent document
export interface IAdmittedStudent extends Document {
  session: string;
  student: {
    section?: string;
    adm_no?: string;
    pen_no?: string;
    par_id?: string;
    roll_no?: string;
    bill_no?: string;
    is_university?: boolean;
    re_adm_no?: string;
    is_minority?: boolean;
    is_disability?: boolean;
    dis_disc?: string;
    is_new?: boolean;
    is_active?: boolean;
    reason?: string;
    is_only_child?: boolean;
    student_status?: string;
    house?: string;
    doa?: Date;
    doj?: Date;
    admitted_class?: string;
    image?: string;
    stream?: string;
    subjects?: any[];
    optional_subject?: string;
    class?: string;
    board?: string;
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
    locality?: string;
    email?: string;
    city?: string;
    mobile?: number;
    state?: string;
    pin_code?: number;
    aadhar_card_no?: number;
    whats_app_no?: number;
    religion?: string;
    parish?: string;
    caste?: string;
    category?: string;
    blood_group?: string;
    cadet_type?: string;
    club?: string;
    is_ews?: boolean;
    is_rte?: boolean;
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
  health_details: {
    height?: number;
    weight?: number;
  };
  documents?: any[];
  affiliated_heads: {
    group_name?: string;
    heads?: any[];
  };
  transport_details: {
    route?: string;
    stop?: string;
    vehicle?: string;
    seat_no?: number;
    months?: any[];
  };
}

// Define the schema
const AdmittedStudentSchema = new mongoose.Schema(
  {
    session: { type: String, required: true },
    student: {
      section: { type: String },
      adm_no: { type: String },
      pen_no: { type: String },
      par_id: { type: String },
      roll_no: { type: String },
      bill_no: { type: String },
      is_university: { type: Boolean },
      re_adm_no: { type: String },
      is_minority: { type: Boolean },
      is_disability: { type: Boolean },
      dis_disc: { type: String },
      is_new: { type: Boolean },
      is_active: { type: Boolean },
      reason: { type: String },
      is_only_child: { type: Boolean },
      student_status: { type: String },
      house: { type: String },
      doa: { type: Date },
      doj: { type: Date },
      admitted_class: { type: String },
      image: { type: String },
      stream: { type: String },
      subjects: { type: Array },
      optional_subject: { type: String },
      class: { type: String },
      board: { type: String },
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
      locality: { type: String },
      email: { type: String },
      city: { type: String },
      mobile: { type: Number },
      state: { type: String },
      pin_code: { type: Number },
      aadhar_card_no: { type: Number },
      whats_app_no: { type: Number },
      religion: { type: String },
      parish: { type: String },
      caste: { type: String },
      category: { type: String },
      blood_group: { type: String },
      cadet_type: { type: String },
      club: { type: String },
      is_ews: { type: Boolean },
      is_rte: { type: Boolean },
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
      previous_school_details: { type: Array },
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
    health_details: {
      height: { type: Number },
      weight: { type: Number },
    },
    documents: { type: Array },
    affiliated_heads: {
      group_name: { type: String },
      heads: { type: Array },
    },
    transport_details: {
      route: { type: String },
      stop: { type: String },
      vehicle: { type: String },
      seat_no: { type: Number },
      months: { type: Array },
    },
  },
  {
    timestamps: true,
  }
);

// Export the model explicitly as Model<IAdmittedStudent>
const AdmittedStudent: Model<IAdmittedStudent> =
  (mongoose.models.AdmittedStudent as Model<IAdmittedStudent>) ||
  mongoose.model<IAdmittedStudent>("AdmittedStudent", AdmittedStudentSchema);

export default AdmittedStudent;
