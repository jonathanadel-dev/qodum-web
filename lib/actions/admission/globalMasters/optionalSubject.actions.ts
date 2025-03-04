"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import OptionalSubject from "@/lib/models/admission/globalMasters/OptionalSubject.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create optional subject props
interface CreateOptionalSubjectProps {
  subject_name: String;
}
// Create optional subject
export const createOptionalSubject = async ({
  subject_name,
}: CreateOptionalSubjectProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the optional subject already exists
    const existinOptionalSubject = await OptionalSubject.findOne({
      subject_name,
      session: activeSession?.year_name,
    });
    if (existinOptionalSubject) {
      throw new Error("Subject already exists");
    }

    // Creating new optional subject
    const newOptionalSubject = await OptionalSubject.create({
      session: activeSession?.year_name,
      subject_name,
    });
    newOptionalSubject.save();

    // Update last updated at date
    await modifyAdmissionStates({
      property: "optional_subjects_last_updated_at",
    });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating optional subject: ${err.message}`);
  }
};

// Fetch subjects
export const fetchOptionalSubjects = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const subjects = await OptionalSubject.find({
      session: activeSession?.year_name,
    });
    return subjects;
  } catch (err: any) {
    throw new Error(`Error fetching subjects: ${err}`);
  }
};

// Fetch subjects names
export const fetchOptionalSubjectsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const subjects = await OptionalSubject.find(
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
}
// Modify subject
export const modifyOptionalSubject = async ({
  id,
  subject_name,
}: ModifySubjectProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the subject already exists
    const subjects = await OptionalSubject.find({
      session: activeSession?.year_name,
    });
    const existingSubject = await OptionalSubject.findById(id);
    if (
      existingSubject.subject_name !== subject_name &&
      subjects.map((s) => s.subject_name).includes(subject_name)
    ) {
      throw new Error("Optional subject already exists");
    }

    // Updating subject
    await OptionalSubject.findByIdAndUpdate(
      id,
      { subject_name },
      { new: true }
    );

    // Update last updated at date
    await modifyAdmissionStates({
      property: "optional_subjects_last_updated_at",
    });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating optional subject: ${err}`);
  }
};

// Delete subject
export const deleteOptionalSubject = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting subject
    await OptionalSubject.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({
      property: "optional_subjects_last_updated_at",
    });

    // Return
    return "Optional subject deleted";
  } catch (err) {
    throw new Error(`Error deleting optional subject: ${err}`);
  }
};
