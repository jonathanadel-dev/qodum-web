"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import StationaryDetails from "@/lib/models/admission/globalMasters/StationaryDetails.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create stationary details props
interface CreateStationaryDetailsProps {
  stationary_name: String;
  amount: Number;
  account_name: String;
  school_name: String;
  session: String;
  is_online: Boolean;
}
// Create stationary details
export const createStationaryDetails = async ({
  stationary_name,
  amount,
  account_name,
  school_name,
  session,
  is_online,
}: CreateStationaryDetailsProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if online or offline data already exists
    const existingData = await StationaryDetails.findOne({
      is_online,
      session: activeSession?.year_name,
    });
    if (existingData) {
      throw new Error(
        `${is_online ? "Online" : "Offline"} stationary details already exsist`
      );
    }

    // Checking if the stationary name already exists
    const existinStationaryDetails = await StationaryDetails.findOne({
      stationary_name,
      session: activeSession?.year_name,
    });
    if (existinStationaryDetails) {
      throw new Error("Stationary name already exists");
    }

    // Creating new stationary details
    const newStationaryDetails = await StationaryDetails.create({
      stationary_name,
      amount,
      account_name,
      school_name,
      session,
      is_online,
    });
    newStationaryDetails.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating stationary details: ${err.message}`);
  }
};

// Fetch stationary details
export const fetchStationaryDetails = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const stationaryDetails = await StationaryDetails.find({
      session: activeSession?.year_name,
    });
    return stationaryDetails;
  } catch (err: any) {
    throw new Error(`Error fetching stationary details: ${err}`);
  }
};

// Modify stationary details props
interface ModifyStationaryDetailsProps {
  id: String;
  stationary_name: string;
  amount: Number;
  account_name: String;
  school_name: String;
  session: String;
  is_online: Boolean;
}
// Modify stationry details
export const modifyStationaryDetails = async ({
  id,
  stationary_name,
  amount,
  account_name,
  school_name,
  session,
  is_online,
}: ModifyStationaryDetailsProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if online or offline data already exists
    const existingData = await StationaryDetails.findOne({
      is_online,
      session: activeSession?.year_name,
    });
    if (existingData) {
      throw new Error(
        `${is_online ? "Online" : "Offline"} stationary details already exsist`
      );
    }

    // Checking if the stationary details already exists
    const stationaryDetails = await StationaryDetails.find({
      session: activeSession?.year_name,
    });
    const existingStationaryDetails = await StationaryDetails.findById(id);
    if (
      existingStationaryDetails.stationary_name !== stationary_name &&
      stationaryDetails.map((s) => s.stationary_name).includes(stationary_name)
    ) {
      throw new Error("Stationary name already exists");
    }

    // Updating stationary details
    await StationaryDetails.findByIdAndUpdate(
      id,
      {
        stationary_name,
        amount,
        account_name,
        school_name,
        session,
        is_online,
      },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating stationary details: ${err}`);
  }
};

// Delete stationary details
export const deleteStationaryDetails = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting stationary details
    await StationaryDetails.findByIdAndDelete(id);
    return "Stationary details deleted";
  } catch (err) {
    throw new Error(`Error deleting stationary details: ${err}`);
  }
};
