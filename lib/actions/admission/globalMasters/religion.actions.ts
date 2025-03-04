"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Religion from "@/lib/models/admission/globalMasters/Religion.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create religion Props
interface CreateReligionProps {
  religion_name: String;
}
// Create religion
export const createReligion = async ({
  religion_name,
}: CreateReligionProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the religion name already exists
    const existinReligion = await Religion.findOne({
      religion_name,
      session: activeSession?.year_name,
    });
    if (existinReligion) {
      throw new Error("Religion name already exists");
    }

    // Creating new religion
    const newReligion = await Religion.create({
      session: activeSession?.year_name,
      religion_name,
    });
    newReligion.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "religions_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating religion: ${err.message}`);
  }
};

// Fetch religions
export const fetchReligions = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const religions = await Religion.find({
      session: activeSession?.year_name,
    });
    return religions;
  } catch (err: any) {
    throw new Error(`Error fetching religions: ${err}`);
  }
};

// Fetch religions names
export const fetchReligionsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const religions = await Religion.find(
      { session: activeSession?.year_name },
      { religion_name: 1 }
    );
    return religions;
  } catch (err: any) {
    throw new Error(`Error fetching religions: ${err}`);
  }
};

// Modify religion props
interface ModifyReligionProps {
  id: String;
  religion_name: string;
}
// Modify religion
export const modifyReligion = async ({
  id,
  religion_name,
}: ModifyReligionProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the religion already exists
    const religions = await Religion.find({
      session: activeSession?.year_name,
    });
    const existingReligion = await Religion.findById(id);
    if (
      existingReligion.religion_name !== religion_name &&
      religions.map((r) => r.religion_name).includes(religion_name)
    ) {
      throw new Error("Religion already exists");
    }

    // Updating religion
    await Religion.findByIdAndUpdate(id, { religion_name }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "religions_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating religion: ${err}`);
  }
};

// Delete religion
export const deleteReligion = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting religion
    await Religion.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "religions_last_updated_at" });

    // Return
    return "Religion Deleted";
  } catch (err) {
    throw new Error(`Error deleting religion: ${err}`);
  }
};
