"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Remark from "@/lib/models/admission/globalMasters/Remark.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create remark Props
interface CreateRemarkProps {
  remark: String;
}
// Create remark
export const createRemark = async ({ remark }: CreateRemarkProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the remark already exists
    const existinRemark = await Remark.findOne({
      remark,
      session: activeSession?.year_name,
    });
    if (existinRemark) {
      throw new Error("Remark already exists");
    }

    // Creating new remark
    const newRemark = await Remark.create({
      session: activeSession?.year_name,
      remark,
    });
    newRemark.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating remark: ${err.message}`);
  }
};

// Fetch remarks
export const fetchRemarks = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const remarks = await Remark.find({ session: activeSession?.year_name });
    return remarks;
  } catch (err: any) {
    throw new Error(`Error fetching remarks: ${err}`);
  }
};

// Modify Remark Props
interface ModifyRemarkProps {
  id: String;
  remark: string;
}
// Modify remark
export const modifyRemark = async ({ id, remark }: ModifyRemarkProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the remark already exists
    const remarks = await Remark.find({ session: activeSession?.year_name });
    const existingRemark = await Remark.findById(id);
    if (
      existingRemark.remark !== remark &&
      remarks.map((remark) => remark.remark).includes(remark)
    ) {
      throw new Error("Remark already exists");
    }

    // Updating remark
    await Remark.findByIdAndUpdate(id, { remark }, { new: true });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating remark: ${err}`);
  }
};

// Delete remark
export const deleteRemark = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting board
    await Remark.findByIdAndDelete(id);
    return "Remark Deleted";
  } catch (err) {
    throw new Error(`Error deleting remark: ${err}`);
  }
};
