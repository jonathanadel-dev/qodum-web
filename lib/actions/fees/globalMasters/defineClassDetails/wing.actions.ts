"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Wing from "@/lib/models/fees/globalMasters/defineClassDetails/Wing.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create wing Props
interface CreateWingProps {
  wing: String;
}
// Create wing
export const createWing = async ({ wing }: CreateWingProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the wing already exists
    const existinWing = await Wing.findOne({
      wing,
      session: activeSession?.year_name,
    });
    if (existinWing) {
      throw new Error("Wing already exists");
    }

    // Creating new wing
    const newWing = await Wing.create({
      session: activeSession?.year_name,
      wing,
    });
    newWing.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating wing: ${err.message}`);
  }
};

// Fetch wings
export const fetchWings = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const wings = await Wing.find({ session: activeSession?.year_name });
    return wings;
  } catch (err: any) {
    throw new Error(`Error fetching wings: ${err}`);
  }
};

// Modify Wing Props
interface ModifyWingProps {
  id: String;
  wing: string;
}
// Modify wing
export const modifyWing = async ({ id, wing }: ModifyWingProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the wing already exists
    const wings = await Wing.find({ session: activeSession?.year_name });
    const existingWing = await Wing.findById(id);
    if (
      existingWing.wing !== wing &&
      wings.map((wing) => wing.wing).includes(wing)
    ) {
      throw new Error("Wing already exists");
    }

    // Updating wing
    await Wing.findByIdAndUpdate(id, { wing }, { new: true });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating wing: ${err}`);
  }
};

// Delete wing
export const deleteWing = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting board
    await Wing.findByIdAndDelete(id);
    return "Wing Deleted";
  } catch (err) {
    throw new Error(`Error deleting wing: ${err}`);
  }
};
