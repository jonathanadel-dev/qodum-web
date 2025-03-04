"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Club from "@/lib/models/admission/globalMasters/Club.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create club props
interface CreateClubProps {
  name: String;
}
// Create club
export const createClub = async ({ name }: CreateClubProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the club already exists
    const existingClub = await Club.findOne({
      name,
      session: activeSession?.year_name,
    });
    if (existingClub) {
      throw new Error("Club already exists");
    }

    // Creating new club
    const newClub = await Club.create({
      session: activeSession?.year_name,
      name,
    });
    newClub.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "clubs_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating club: ${err.message}`);
  }
};

// Fetch clubs
export const fetchClubs = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const clubs = await Club.find({ session: activeSession?.year_name });

    // Return
    return clubs;
  } catch (err: any) {
    throw new Error(`Error fetching clubs: ${err}`);
  }
};

// Fetch clubs names
export const fetchClubsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const clubs = await Club.find(
      { session: activeSession?.year_name },
      { name: 1 }
    );

    // Return
    return clubs;
  } catch (err: any) {
    throw new Error(`Error fetching clubs: ${err}`);
  }
};

// Modify club props
interface ModifyClubProps {
  id: String;
  name: string;
}
// Modify club
export const modifyClub = async ({ id, name }: ModifyClubProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the club already exists
    const clubs = await Club.find({ session: activeSession?.year_name });
    const existingClub = await Club.findById(id);
    if (existingClub.name !== name && clubs.map((s) => s.name).includes(name)) {
      throw new Error("Club already exists");
    }

    // Update club
    await Club.findByIdAndUpdate(id, { name }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "clubs_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating club: ${err}`);
  }
};

// Delete club
export const deleteClub = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting club
    await Club.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "clubs_last_updated_at" });

    // Return
    return "Club Deleted";
  } catch (err) {
    throw new Error(`Error deleting club: ${err}`);
  }
};
