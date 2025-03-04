"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Parish from "@/lib/models/admission/globalMasters/Parish.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create parish props
interface CreateParishProps {
  parish: String;
  religion: string[];
}
// Create parish
export const createParish = async ({ parish, religion }: CreateParishProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the parish already exists
    const existinParish = await Parish.findOne({
      parish,
      religion,
      session: activeSession?.year_name,
    });
    if (existinParish) {
      throw new Error("Parish already exists");
    }

    // Creating new parish
    const newParish = await Parish.create({
      session: activeSession?.year_name,
      parish,
    });
    newParish.save().then(async () => {
      await Parish.findOneAndUpdate(
        { parish, session: activeSession?.year_name },
        { religion }
      );
    });

    // Update last updated at date
    await modifyAdmissionStates({ property: "perishes_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating parish: ${err.message}`);
  }
};

// Fetch parishes
export const fetchParishes = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const parishes = await Parish.find({ session: activeSession?.year_name });
    return parishes;
  } catch (err: any) {
    throw new Error(`Error fetching parishes: ${err}`);
  }
};

// Fetch parishes names
export const fetchParishesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const parishes = await Parish.find(
      { session: activeSession?.year_name },
      { parish: 1 }
    );
    return parishes;
  } catch (err: any) {
    throw new Error(`Error fetching parishes: ${err}`);
  }
};

// Modify parish props
interface ModifyParishProps {
  id: String;
  parish: string;
  religion: string[];
}
// Modify stationry details
export const modifyParish = async ({
  id,
  parish,
  religion,
}: ModifyParishProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the parish already exists
    const parishes = await Parish.find({ session: activeSession?.year_name });
    const existingParish = await Parish.findById(id);
    if (
      existingParish.parish !== parish &&
      parishes.map((p) => p.parish).includes(parish)
    ) {
      throw new Error("Parish already exists");
    }

    // Updating parish
    await Parish.findByIdAndUpdate(id, { parish, religion }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "perishes_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating parish: ${err}`);
  }
};

// Delete parish
export const deleteParish = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting parish
    await Parish.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "perishes_last_updated_at" });

    // Return
    return "Parish deleted";
  } catch (err) {
    throw new Error(`Error deleting parish: ${err}`);
  }
};
