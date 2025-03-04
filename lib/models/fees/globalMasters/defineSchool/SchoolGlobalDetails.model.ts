import mongoose, { Document, Model } from "mongoose";

export interface ISchoolGlobalDetails extends Document {
  logo?: string;
  school_main?: boolean;
  school_subheads?: boolean;
  school_name: string;
  school_address: string;
  school_address_2?: string;
  school_short_name?: string;
  contact_no?: string;
  mobile?: string;
  email?: string;
  support_email_id?: string;
  website?: string;
  prefix: string;
  iso_details?: string;
  principal_signature?: string;
  accountant_signature?: string;
  school_no?: string;
  affiliation_to?: string;
  affiliation_no?: string;
  udise_code?: string;
  pen?: string;
  associates?: string;
  renew_up_to?: string;
  school_status?: string;
  working_days?: string;
  recess?: string;
  total_period?: string;
  academic_year?: string;
  financial_year?: string;
  facebook_link?: string;
  linkedin_link?: string;
  twitter_link?: string;
  instagram_link?: string;
}

const SchoolGlobalDetailsSchema = new mongoose.Schema<ISchoolGlobalDetails>(
  {
    logo: { type: String },
    school_main: { type: Boolean },
    school_subheads: { type: Boolean },
    school_name: { type: String, required: true },
    school_address: { type: String, required: true },
    school_address_2: { type: String },
    school_short_name: { type: String },
    contact_no: { type: String },
    mobile: { type: String },
    email: { type: String },
    support_email_id: { type: String },
    website: { type: String },
    prefix: { type: String, required: true },
    iso_details: { type: String },
    principal_signature: { type: String },
    accountant_signature: { type: String },
    school_no: { type: String },
    affiliation_to: { type: String },
    affiliation_no: { type: String },
    udise_code: { type: String },
    pen: { type: String },
    associates: { type: String },
    renew_up_to: { type: String },
    school_status: { type: String },
    working_days: { type: String },
    recess: { type: String },
    total_period: { type: String },
    academic_year: { type: String },
    financial_year: { type: String },
    facebook_link: { type: String },
    linkedin_link: { type: String },
    twitter_link: { type: String },
    instagram_link: { type: String },
  },
  { timestamps: true }
);

const SchoolGlobalDetails: Model<ISchoolGlobalDetails> =
  (mongoose.models.SchoolGlobalDetails as Model<ISchoolGlobalDetails>) ||
  mongoose.model<ISchoolGlobalDetails>(
    "SchoolGlobalDetails",
    SchoolGlobalDetailsSchema
  );

export default SchoolGlobalDetails;
