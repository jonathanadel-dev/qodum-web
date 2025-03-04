"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import StaffApplication from "@/lib/models/payroll/globalMasters/StaffApplication.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import StaffAdmissionNumber from "@/lib/models/payroll/admissionSetting/StaffAdmissionNumber.model";
import Staff from "@/lib/models/payroll/globalMasters/Staff.model";

// Create staff admission number props
interface CreateStaffAdmissionNumberProps {
  setting_type: String;
  should_be: String;
  rec_no: Number;
  prefix: String;
  start_from: Number;
  lead_zero: String;
  suffix: String;
}
// Create staff admission number
export const createStaffAdmissionNumber = async ({
  setting_type,
  should_be,
  rec_no,
  prefix,
  start_from,
  lead_zero,
  suffix,
}: CreateStaffAdmissionNumberProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the prefix already exists
    if (prefix !== "") {
      const existingAdmission = await StaffAdmissionNumber.findOne({
        prefix,
        session: activeSession?.year_name,
      });
      if (existingAdmission) {
        throw new Error("Prefix already exists");
      }
    }

    // Creating new admission
    await StaffAdmissionNumber.create({
      session: activeSession?.year_name,
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

// Fetch staff admission numbers
export const fetchStaffAdmissionNumbers = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const admissions = await StaffAdmissionNumber.find({
      session: activeSession?.year_name,
    });
    return admissions;
  } catch (err: any) {
    throw new Error(`Error fetching admissions: ${err}`);
  }
};

// Modify staff admission number props
interface ModifyStaffAdmissionNumberProps {
  id: String;
  setting_type: String;
  should_be: String;
  rec_no: Number;
  prefix: string;
  start_from: Number;
  lead_zero: String;
  suffix: String;
}
// Modify staff admission number
export const modifyStaffAdmissionNumber = async ({
  id,
  setting_type,
  should_be,
  rec_no,
  prefix,
  start_from,
  lead_zero,
  suffix,
}: ModifyStaffAdmissionNumberProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    if (prefix !== "") {
      // Checking if the prefix already exists
      const admissions = await StaffAdmissionNumber.find({
        session: activeSession?.year_name,
      });
      const existingAdmission = await StaffAdmissionNumber.findById(id);
      if (
        existingAdmission.prefix !== prefix &&
        admissions.map((a) => a.prefix).includes(prefix)
      ) {
        throw new Error("Prefix already exists");
      }
    }

    // Update admission
    await StaffAdmissionNumber.findByIdAndUpdate(
      id,
      {
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

// Delete staff admission number
export const deleteStaffAdmissionNumber = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting admission
    await StaffAdmissionNumber.findByIdAndDelete(id);
    return "Staff Admission Number Deleted";
  } catch (err) {
    throw new Error(`Error deleting staff admission number: ${err}`);
  }
};

// Get editable numbers
export const getEditableNumbers = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Editable numbers
    let editableNumbers = [];

    // Fetching staff applications count
    const staffApplicationsCount = await StaffApplication.countDocuments();
    staffApplicationsCount < 1 && editableNumbers.push("Applicant Reg. No.");

    // Fetching students count
    const staffCount = await Staff.countDocuments();
    staffCount < 1 && editableNumbers.push("Employment Code");

    // Return
    return editableNumbers;
  } catch (err) {
    console.log(`Error while fetching uneditable numbers`);
  }
};

// Fetch staff admission number by name
export const fetchStaffAdmissionNumberByName = async ({
  name,
}: {
  name: String;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching staff admission number
    const staffAdmissionNumber = await StaffAdmissionNumber.findOne({
      setting_type: name,
    });

    // Return
    return JSON.parse(JSON.stringify(staffAdmissionNumber));
  } catch (err) {
    console.log(`Error while fetching uneditable numbers`);
  }
};
