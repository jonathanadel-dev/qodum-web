"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import House from "@/lib/models/admission/globalMasters/House.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create house props
interface CreateHouseProps {
  house_name: String;
}
// Create house
export const createHouse = async ({ house_name }: CreateHouseProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the house already exists
    const existinHouse = await House.findOne({
      house_name,
      session: activeSession?.year_name,
    });
    if (existinHouse) {
      throw new Error("House already exists");
    }

    // Creating new house
    const newHouse = await House.create({
      session: activeSession?.year_name,
      house_name,
    });
    newHouse.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "houses_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating house: ${err.message}`);
  }
};

// Fetch houses
export const fetchHouses = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const houses = await House.find({ session: activeSession?.year_name });
    return houses;
  } catch (err: any) {
    throw new Error(`Error fetching houses: ${err}`);
  }
};

// Fetch houses names
export const fetchHousesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const houses = await House.find(
      { session: activeSession?.year_name },
      { house_name: 1 }
    );
    return houses;
  } catch (err: any) {
    throw new Error(`Error fetching houses: ${err}`);
  }
};

// Modify house props
interface ModifyHouseProps {
  id: String;
  house_name: string;
}
// Modify stationry details
export const modifyHouse = async ({ id, house_name }: ModifyHouseProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the house already exists
    const houses = await House.find({ session: activeSession?.year_name });
    const existingHouse = await House.findById(id);
    if (
      existingHouse.house_name !== house_name &&
      houses.map((h) => h.house_name).includes(house_name)
    ) {
      throw new Error("House already exists");
    }

    // Updating house
    await House.findByIdAndUpdate(id, { house_name }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "houses_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating house: ${err}`);
  }
};

// Delete house
export const deleteHouse = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting house
    await House.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "houses_last_updated_at" });

    // Return
    return "House deleted";
  } catch (err) {
    throw new Error(`Error deleting house: ${err}`);
  }
};
