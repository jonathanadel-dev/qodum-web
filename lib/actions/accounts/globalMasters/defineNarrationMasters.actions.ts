"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import NarrationMaster from "@/lib/models/accounts/globalMasters/NarrationMaster.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create Narration Master Props
interface CreateNarrationMasterProps {
  voucher_type: String;
  narration: String;
}
// Create Narration Master
export const createNarrationMaster = async ({
  voucher_type,
  narration,
}: CreateNarrationMasterProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if narration already exists
    const existingNarration = await NarrationMaster.findOne({
      narration,
      session: activeSession?.year_name,
    });
    if (existingNarration) {
      throw new Error("Narration already exists");
    }

    // Creating new narration master
    const newNarrationMaster = await NarrationMaster.create({
      session: activeSession?.year_name,
      voucher_type,
      narration,
    });
    newNarrationMaster.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error Creating Narration Master: ${err.message}`);
  }
};

// Fetch Narration Masters
export const fetchNarrationMasters = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const narrations = await NarrationMaster.find({
      session: activeSession?.year_name,
    });

    // Return
    return { narrations };
  } catch (err: any) {
    throw new Error(`Error fetching narration masters: ${err}`);
  }
};

// Modify Narration Master Props
interface ModifyNarrationMasterProps {
  id: String;
  narration: string;
  voucher_type: String;
}
// Modify Narration Master
export const modifyNarrationMaster = async ({
  id,
  narration,
  voucher_type,
}: ModifyNarrationMasterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the narration already exists
    const narrations = await NarrationMaster.find({
      session: activeSession?.year_name,
    });
    const existingNarration = await NarrationMaster.findById(id);
    if (
      existingNarration.narration !== narration &&
      narrations.map((narration) => narration.narration).includes(narration)
    ) {
      throw new Error("Narration already exists");
    }

    // Update Narration
    await NarrationMaster.findByIdAndUpdate(
      id,
      { narration, voucher_type },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating narration master: ${err}`);
  }
};

// Delete Narration Master
export const deleteNarrationMaster = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting Narration
    await NarrationMaster.findByIdAndDelete(id);
    return "Narration Master Deleted";
  } catch (err) {
    throw new Error(`Error deleting narration master: ${err}`);
  }
};
