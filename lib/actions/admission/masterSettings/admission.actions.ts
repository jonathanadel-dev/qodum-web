"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Student from "@/lib/models/admission/admission/Student.model";
import Prospectus from "@/lib/models/admission/admission/Prospectus.model";
import AdmittedStudent from "@/lib/models/admission/admission/AdmittedStudent.model";
import Admission from "@/lib/models/admission/masterSettings/admissionSetting/Admission.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create admission props
interface CreateAdmissionProps {
  school: String;
  class_name: String;
  board: String;
  setting_type: String;
  should_be: String;
  rec_no: Number;
  prefix: String;
  start_from: Number;
  lead_zero: String;
  suffix: String;
}
// Create admission
export const createAdmission = async ({
  school,
  class_name,
  board,
  setting_type,
  should_be,
  rec_no,
  prefix,
  start_from,
  lead_zero,
  suffix,
}: CreateAdmissionProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the prefix already exists
    if (prefix !== "") {
      const existingAdmission = await Admission.findOne({
        prefix,
        session: activeSession?.year_name,
      });
      if (existingAdmission) {
        throw new Error("Prefix already exists");
      }
    }

    // Creating new admission
    await Admission.create({
      session: activeSession?.year_name,
      school,
      class_name,
      board,
      setting_type,
      should_be,
      rec_no,
      prefix,
      start_from,
      lead_zero,
      suffix,
    });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating admission: ${err.message}`);
  }
};

// Fetch admissions
export const fetchAdmissions = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const admissions = await Admission.find({
      session: activeSession?.year_name,
    });
    return admissions;
  } catch (err: any) {
    throw new Error(`Error fetching admissions: ${err}`);
  }
};

// Modify admission props
interface ModifyAdmissionProps {
  id: String;
  school: String;
  class_name: String;
  board: String;
  setting_type: String;
  should_be: String;
  rec_no: Number;
  prefix: string;
  start_from: Number;
  lead_zero: String;
  suffix: String;
}
// Modify admission
export const modifyAdmission = async ({
  id,
  school,
  class_name,
  board,
  setting_type,
  should_be,
  rec_no,
  prefix,
  start_from,
  lead_zero,
  suffix,
}: ModifyAdmissionProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    if (prefix !== "") {
      // Checking if the prefix already exists
      const admissions = await Admission.find({
        session: activeSession?.year_name,
      });
      const existingAdmission = await Admission.findById(id);
      if (
        existingAdmission.prefix !== prefix &&
        admissions.map((a) => a.prefix).includes(prefix)
      ) {
        throw new Error("Prefix already exists");
      }
    }

    // Update admission
    await Admission.findByIdAndUpdate(
      id,
      {
        school,
        class_name,
        board,
        setting_type,
        should_be,
        rec_no,
        prefix,
        start_from,
        lead_zero,
        suffix,
      },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating admission: ${err}`);
  }
};

// Delete admission
export const deleteAdmission = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting admission
    await Admission.findByIdAndDelete(id);
    return "Admission Deleted";
  } catch (err) {
    throw new Error(`Error deleting admission: ${err}`);
  }
};

// Get class numbers
export const fetchClassNumbers = async ({
  class_name,
}: {
  class_name: String;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Fetching admission
    const numbers = await Admission.find({
      class_name,
      session: activeSession?.year_name,
    });

    // Return
    return numbers;
  } catch (err) {
    throw new Error(`Error fetching admission: ${err}`);
  }
};

// Get editable numbers
export const getEditableNumbers = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Editable numbers
    let editableNumbers = [];

    // Fetching students count
    const studentsCount = await Student.countDocuments();
    studentsCount < 1 && editableNumbers.push("Registration No.");

    // Fetching admitted students count
    const admittedStudentsCount = await AdmittedStudent.countDocuments();
    admittedStudentsCount < 1 && editableNumbers.push("Admission No.");

    // Prospectus count
    const prospectusesCount = await Prospectus.countDocuments();
    prospectusesCount < 1 && editableNumbers.push("Prospectus No.");

    // Return
    return editableNumbers;
  } catch (err) {
    console.log(`Error while fetching uneditable numbers`);
  }
};
