"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Nationality from "@/lib/models/admission/globalMasters/Nationality.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create nationality props
interface CreateNationalityProps {
  name: String;
}
// Create nationality
export const createNationality = async ({ name }: CreateNationalityProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the nationality name already exists
    const existingNationality = await Nationality.findOne({
      name,
      session: activeSession?.year_name,
    });
    if (existingNationality) {
      throw new Error("Nationality name already exists");
    }

    // Creating new nationality
    const newNationality = await Nationality.create({
      session: activeSession?.year_name,
      name,
    });
    newNationality.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "nationalities_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating nationality: ${err.message}`);
  }
};

// Fetch nationalities
export const fetchNationalities = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const nationalities = await Nationality.find({
      session: activeSession?.year_name,
    });

    // Return
    return nationalities;
  } catch (err: any) {
    throw new Error(`Error fetching nationalities: ${err}`);
  }
};

// Fetch nationalities names
export const fetchNationalitiesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const nationalities = await Nationality.find(
      { session: activeSession?.year_name },
      { name: 1 }
    );

    // Return
    return nationalities;
  } catch (err: any) {
    throw new Error(`Error fetching nationalities: ${err}`);
  }
};

// Modify nationality props
interface ModifyNationalityProps {
  id: String;
  name: string;
}
// Modify nationality
export const modifyNationality = async ({
  id,
  name,
}: ModifyNationalityProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the nationality name already exists
    const nationalities = await Nationality.find({
      session: activeSession?.year_name,
    });
    const existingNationality = await Nationality.findById(id);
    if (
      existingNationality.name !== name &&
      nationalities.map((n) => n.name).includes(name)
    ) {
      throw new Error("Nationality already exists");
    }

    // Update nationality
    await Nationality.findByIdAndUpdate(id, { name }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "nationalities_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating nationality: ${err}`);
  }
};

// Delete nationality
export const deleteNationality = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting nationality
    await Nationality.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "nationalities_last_updated_at" });

    // Return
    return "Nationality Deleted";
  } catch (err) {
    throw new Error(`Error deleting nationality: ${err}`);
  }
};
