"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Designation from "@/lib/models/payroll/globalMasters/Designation.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "./admissionStates.actions";

// Create designation props
interface CreateDesignationProps {
  designation: String;
  show_in_payroll: Boolean;
}
// Create designation
export const createDesignation = async ({
  designation,
  show_in_payroll,
}: CreateDesignationProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the designation already exists
    const existingDesignation = await Designation.findOne({
      designation,
      session: activeSession?.year_name,
    });
    if (existingDesignation) {
      throw new Error("Designation already exists");
    }

    // Creating new designation
    const newDesignation = await Designation.create({
      session: activeSession?.year_name,
      designation,
      show_in_payroll,
    });
    newDesignation.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "designations_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating designation: ${err.message}`);
  }
};

// Fetch designations
export const fetchDesignations = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const designations = await Designation.find({
      session: activeSession?.year_name,
    });

    // Return
    return designations;
  } catch (err: any) {
    throw new Error(`Error fetching designations: ${err}`);
  }
};

// Fetch designations names
export const fetchDesignationsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const designations = await Designation.find(
      { session: activeSession?.year_name },
      { designation: 1 }
    );

    // Return
    return designations;
  } catch (err: any) {
    throw new Error(`Error fetching designations: ${err}`);
  }
};

// Modify designation props
interface ModifyDesignationProps {
  id: String;
  designation: string;
  show_in_payroll: Boolean;
}
// Modify designation
export const modifyDesignation = async ({
  id,
  designation,
  show_in_payroll,
}: ModifyDesignationProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the designation already exists
    const designations = await Designation.find({
      session: activeSession?.year_name,
    });
    const existingDesignation = await Designation.findById(id);
    if (
      existingDesignation.designation !== designation &&
      designations.map((s) => s.designation).includes(designation)
    ) {
      throw new Error("Designation already exists");
    }

    // Update designation
    await Designation.findByIdAndUpdate(
      id,
      { designation, show_in_payroll },
      { new: true }
    );

    // Update last updated at date
    await modifyAdmissionStates({ property: "designations_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating designation: ${err}`);
  }
};

// Delete designation
export const deleteDesignation = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting designation
    await Designation.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "designations_last_updated_at" });

    // Return
    return "Designation Deleted";
  } catch (err) {
    throw new Error(`Error deleting designation: ${err}`);
  }
};
