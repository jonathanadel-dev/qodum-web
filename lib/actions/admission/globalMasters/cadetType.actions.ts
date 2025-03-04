"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import CadetType from "@/lib/models/admission/globalMasters/CadetType.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create cadet type props
interface CreateCadetTypeProps {
  name: String;
}
// Create cadet type
export const createCadetType = async ({ name }: CreateCadetTypeProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the cadet type already exists
    const existingCadetType = await CadetType.findOne({
      name,
      session: activeSession?.year_name,
    });
    if (existingCadetType) {
      throw new Error("Cadet type already exists");
    }

    // Creating new cadet type
    const newCadetType = await CadetType.create({
      session: activeSession?.year_name,
      name,
    });
    newCadetType.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "cadet_types_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating cadet type: ${err.message}`);
  }
};

// Fetch cadet types
export const fetchCadetTypes = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const cadetTypes = await CadetType.find({
      session: activeSession?.year_name,
    });

    // Return
    return cadetTypes;
  } catch (err: any) {
    throw new Error(`Error fetching cadet types: ${err}`);
  }
};

// Fetch cadet types names
export const fetchCadetTypesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const cadetTypes = await CadetType.find(
      { session: activeSession?.year_name },
      { name: 1 }
    );

    // Return
    return cadetTypes;
  } catch (err: any) {
    throw new Error(`Error fetching cadet types: ${err}`);
  }
};

// Modify cadet type props
interface ModifyCadetTypeProps {
  id: String;
  name: string;
}
// Modify cadet type
export const modifyCadetType = async ({ id, name }: ModifyCadetTypeProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the cadet type already exists
    const cadetTypes = await CadetType.find({
      session: activeSession?.year_name,
    });
    const existingCadetType = await CadetType.findById(id);
    if (
      existingCadetType.name !== name &&
      cadetTypes.map((s) => s.name).includes(name)
    ) {
      throw new Error("Cadet type already exists");
    }

    // Update cadet type
    await CadetType.findByIdAndUpdate(id, { name }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "cadet_types_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating cadet type: ${err}`);
  }
};

// Delete cadet type
export const deleteCadetType = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting cadet type
    await CadetType.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "cadet_types_last_updated_at" });

    // Return
    return "Cadet type Deleted";
  } catch (err) {
    throw new Error(`Error deleting cadet type: ${err}`);
  }
};
