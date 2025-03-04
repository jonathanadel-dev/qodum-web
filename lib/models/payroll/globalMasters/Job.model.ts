import mongoose, { Document, Model } from "mongoose";

export interface IJob extends Document {
  session: string;
  post: string;
  salary: string;
  experience: string;
  description: string;
  key_skill: string;
  last_date_of_submission: Date;
  applications?: any[]; // Adjust this type if needed
}

const JobSchema = new mongoose.Schema<IJob>(
  {
    session: { type: String, required: true },
    post: { type: String, required: true },
    salary: { type: String, required: true },
    experience: { type: String, required: true },
    description: { type: String, required: true },
    key_skill: { type: String, required: true },
    last_date_of_submission: { type: Date, required: true },
    applications: [{ type: mongoose.Schema.Types.Mixed }],
  },
  { timestamps: true }
);

const Job: Model<IJob> =
  (mongoose.models.Job as Model<IJob>) ||
  mongoose.model<IJob>("Job", JobSchema);

export default Job;
