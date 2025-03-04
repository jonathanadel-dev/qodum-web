"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import MeritCriteria from "@/lib/models/admission/admission/entranceTest/MeritCriteria.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create merit criteria props
interface CreateMeritCriteriaProps {
  session: String;
  name: String;
  maximum_point: Number;
}
// Create merit criteria
export const createMeritCriteria = async ({
  session,
  name,
  maximum_point,
}: CreateMeritCriteriaProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the name name already exists
    const existingMeritCriteria = await MeritCriteria.findOne({
      name,
      session: activeSession?.year_name,
    });
    if (existingMeritCriteria) {
      throw new Error("Criteria name already exists");
    }

    // Creating new merit criteria
    const newMeritCriteria = await MeritCriteria.create({
      session,
      name,
      maximum_point,
    });
    newMeritCriteria.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating merit criteria: ${err.message}`);
  }
};

// Fetch merit criterias
export const fetchMeritCriterias = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const meritCriterias = await MeritCriteria.find({
      session: activeSession?.year_name,
    });

    // Return
    return meritCriterias;
  } catch (err: any) {
    throw new Error(`Error fetching merit criterias: ${err}`);
  }
};

// Modify merit criteria props
interface ModifyMeritCriteriaProps {
  id: String;
  session: String;
  name: string;
  maximum_point: Number;
}
// Modify merit criteria
export const modifyMeritCriteria = async ({
  id,
  session,
  name,
  maximum_point,
}: ModifyMeritCriteriaProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the criteria name already exists
    const meritCriterias = await MeritCriteria.find({
      session: activeSession?.year_name,
    });
    const existingMeritCriteria = await MeritCriteria.findById(id);
    if (
      existingMeritCriteria.name !== name &&
      meritCriterias.map((c) => c.name).includes(name)
    ) {
      throw new Error("Criteria name already exists");
    }

    // Updating
    await MeritCriteria.findByIdAndUpdate(
      id,
      { session, name, maximum_point },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating merit criteria: ${err}`);
  }
};

// Delete merit criteria
export const deleteMeritCriteria = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting merit criteria
    await MeritCriteria.findByIdAndDelete(id);
    return "Merit criteria Deleted";
  } catch (err) {
    throw new Error(`Error deleting merit criteria: ${err}`);
  }
};
