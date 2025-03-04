"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Subject from "@/lib/models/admission/globalMasters/Subject.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create subject props
interface CreateSubjectProps {
  subject_name: String;
  available_seats: Number;
  is_university: Boolean;
}
// Create subject
export const createSubject = async ({
  subject_name,
  available_seats,
  is_university,
}: CreateSubjectProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the subject name already exists
    const existingSubject = await Subject.findOne({
      subject_name,
      session: activeSession?.year_name,
    });
    if (existingSubject) {
      throw new Error("Subject name already exists");
    }

    // Creating new subject
    const newSubject = await Subject.create({
      session: activeSession?.year_name,
      subject_name,
      available_seats,
      is_university,
    });
    newSubject.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "subjects_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating subject: ${err.message}`);
  }
};

// Fetch subjects
export const fetchSubjects = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const subjects = await Subject.find({ session: activeSession?.year_name });
    return subjects;
  } catch (err: any) {
    throw new Error(`Error fetching subjects: ${err}`);
  }
};

// Fetch subjects names
export const fetchSubjectsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const subjects = await Subject.find(
      { session: activeSession?.year_name },
      { subject_name: 1 }
    );
    return subjects;
  } catch (err: any) {
    throw new Error(`Error fetching subjects: ${err}`);
  }
};

// Modify subject props
interface ModifySubjectProps {
  id: String;
  subject_name: string;
  available_seats: Number;
  is_university: Boolean;
}
// Modify subject
export const modifySubject = async ({
  id,
  subject_name,
  available_seats,
  is_university,
}: ModifySubjectProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the subject name already exists
    const subjects = await Subject.find({ session: activeSession?.year_name });
    const existingSubject = await Subject.findById(id);
    if (
      existingSubject.subject_name !== subject_name &&
      subjects.map((s) => s.subject_name).includes(subject_name)
    ) {
      throw new Error("Subject already exists");
    }

    // Update subject
    await Subject.findByIdAndUpdate(
      id,
      { subject_name, available_seats, is_university },
      { new: true }
    );

    // Update last updated at date
    await modifyAdmissionStates({ property: "subjects_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating subject: ${err}`);
  }
};

// Delete subject
export const deleteSubject = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting subject
    await Subject.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "subjects_last_updated_at" });

    // Return
    return "Subject Deleted";
  } catch (err) {
    throw new Error(`Error deleting subject: ${err}`);
  }
};
