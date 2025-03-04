"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import TcCaste from "@/lib/models/admission/globalMasters/tcDetails/TcCaste.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create tc caste props
interface CreateTcCasteProps {
  caste_name: String;
}
// Create tc caste
export const createTcCaste = async ({ caste_name }: CreateTcCasteProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the caste name already exists
    const existinTcCaste = await TcCaste.findOne({
      session: activeSession?.year_name,
      caste_name,
    });
    if (existinTcCaste) {
      throw new Error("Tc caste already exists");
    }

    // Creating new tc caste
    const newTcCaste = await TcCaste.create({ caste_name });
    newTcCaste.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating tc caste: ${err.message}`);
  }
};

// Fetch tc casts
export const fetchTcCasts = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const tcCasts = await TcCaste.find({ session: activeSession?.year_name });
    return tcCasts;
  } catch (err: any) {
    throw new Error(`Error fetching tc casts: ${err}`);
  }
};

// Modify tc caste props
interface ModifyTcCasteProps {
  id: String;
  caste_name: string;
}
// Modify tc caste
export const modifyTcCaste = async ({ id, caste_name }: ModifyTcCasteProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the caste name already exists
    const tcCasts = await TcCaste.find({ session: activeSession?.year_name });
    const existingTcCaste = await TcCaste.findById(id);
    if (
      existingTcCaste.caste_name !== caste_name &&
      tcCasts.map((tcCaste) => tcCaste.caste_name).includes(caste_name)
    ) {
      throw new Error("Tc caste already exists");
    }

    // Updating tc caste
    await TcCaste.findByIdAndUpdate(id, { caste_name }, { new: true });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating tc caste: ${err}`);
  }
};

// Delete tc caste
export const deleteTcCaste = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting tc caste
    await TcCaste.findByIdAndDelete(id);
    return "Tc caste deleted";
  } catch (err) {
    throw new Error(`Error deleting tc caste: ${err}`);
  }
};
