"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Caste from "@/lib/models/admission/globalMasters/Caste.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create caste Props
interface CreateCasteProps {
  caste_name: String;
}
// Create caste
export const createCaste = async ({ caste_name }: CreateCasteProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the caste name already exists
    const existingCaste = await Caste.findOne({
      caste_name,
      session: activeSession?.year_name,
    });
    if (existingCaste) {
      throw new Error("Caste name already exists");
    }

    // Creating new caste
    const newCaste = await Caste.create({
      session: activeSession?.year_name,
      caste_name,
    });
    newCaste.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "casts_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating caste: ${err.message}`);
  }
};

// Fetch casts
export const fetchCastes = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const castes = await Caste.find({ session: activeSession?.year_name });
    return castes;
  } catch (err: any) {
    throw new Error(`Error fetching castes: ${err}`);
  }
};

// Fetch casts names
export const fetchCastesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Active session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const castes = await Caste.find(
      { session: activeSession?.year_name },
      { caste_name: 1 }
    );
    return castes;
  } catch (err: any) {
    throw new Error(`Error fetching castes: ${err}`);
  }
};

// Modify caste props
interface ModifyCasteProps {
  id: String;
  caste_name: string;
}
// Modify caste
export const modifyCaste = async ({ id, caste_name }: ModifyCasteProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the caste already exists
    const castes = await Caste.find({ session: activeSession?.year_name });
    const existingCaste = await Caste.findById(id);
    if (
      existingCaste.caste_name !== caste_name &&
      castes.map((r) => r.caste_name).includes(caste_name)
    ) {
      throw new Error("Caste already exists");
    }

    // Updating caste
    const updatedCaste = await Caste.findByIdAndUpdate(
      id,
      { caste_name },
      { new: true }
    );

    // Update last updated at date
    await modifyAdmissionStates({ property: "casts_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating caste: ${err}`);
  }
};

// Delete caste
export const deleteCaste = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting caste
    await Caste.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "casts_last_updated_at" });

    // Return
    return "Caste Deleted";
  } catch (err) {
    throw new Error(`Error deleting caste: ${err}`);
  }
};
