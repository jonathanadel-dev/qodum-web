"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Profession from "@/lib/models/payroll/globalMasters/Profession.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "./admissionStates.actions";

// Create profession props
interface CreateProfessionProps {
  profession: String;
}
// Create profession
export const createProfession = async ({
  profession,
}: CreateProfessionProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the profession already exists
    const existingProfession = await Profession.findOne({
      profession,
      session: activeSession?.year_name,
    });
    if (existingProfession) {
      throw new Error("Profession already exists");
    }

    // Creating new profession
    const newProfession = await Profession.create({
      session: activeSession?.year_name,
      profession,
    });
    newProfession.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "professions_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating profession: ${err.message}`);
  }
};

// Fetch professions
export const fetchProfessions = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const professions = await Profession.find({
      session: activeSession?.year_name,
    });

    // Return
    return professions;
  } catch (err: any) {
    throw new Error(`Error fetching professions: ${err}`);
  }
};

// Fetch professions names
export const fetchProfessionsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const professions = await Profession.find(
      { session: activeSession?.year_name },
      { profession: 1 }
    );

    // Return
    return professions;
  } catch (err: any) {
    throw new Error(`Error fetching professions: ${err}`);
  }
};

// Modify profession props
interface ModifyProfessionProps {
  id: String;
  profession: string;
}
// Modify profession
export const modifyProfession = async ({
  id,
  profession,
}: ModifyProfessionProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the profession already exists
    const professions = await Profession.find({
      session: activeSession?.year_name,
    });
    const existingProfession = await Profession.findById(id);
    if (
      existingProfession.profession !== profession &&
      professions.map((s) => s.profession).includes(profession)
    ) {
      throw new Error("Profession already exists");
    }

    // Update profession
    await Profession.findByIdAndUpdate(id, { profession }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "professions_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating profession: ${err}`);
  }
};

// Delete profession
export const deleteProfession = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting profession
    await Profession.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "professions_last_updated_at" });

    // Return
    return "Profession Deleted";
  } catch (err) {
    throw new Error(`Error deleting profession: ${err}`);
  }
};
