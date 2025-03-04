"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import StaffType from "@/lib/models/payroll/globalMasters/StaffType.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "./admissionStates.actions";

// Create staff type props
interface CreateStaffTypeProps {
  staff_type: String;
  is_hourly_paid: Boolean;
  show_on_ecare: Boolean;
}
// Create staff type
export const createStaffType = async ({
  staff_type,
  is_hourly_paid,
  show_on_ecare,
}: CreateStaffTypeProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the staff type already exists
    const existingStaffType = await StaffType.findOne({
      staff_type,
      session: activeSession?.year_name,
    });
    if (existingStaffType) {
      throw new Error("Staff type already exists");
    }

    // Creating new staff type
    const newStaffType = await StaffType.create({
      session: activeSession?.year_name,
      staff_type,
      is_hourly_paid,
      show_on_ecare,
    });
    newStaffType.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "staff_types_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating staff type: ${err.message}`);
  }
};

// Fetch staff types
export const fetchStaffTypes = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const staffTypes = await StaffType.find({
      session: activeSession?.year_name,
    });

    // Return
    return staffTypes;
  } catch (err: any) {
    throw new Error(`Error fetching staff types: ${err}`);
  }
};

// Modify staff type props
interface ModifyStaffTypeProps {
  id: String;
  staff_type: string;
  is_hourly_paid: Boolean;
  show_on_ecare: Boolean;
}
// Modify staff type
export const modifyStaffType = async ({
  id,
  staff_type,
  is_hourly_paid,
  show_on_ecare,
}: ModifyStaffTypeProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the staff type already exists
    const staffTypes = await StaffType.find({
      session: activeSession?.year_name,
    });
    const existingStaffType = await StaffType.findById(id);
    if (
      existingStaffType.staff_type !== staff_type &&
      staffTypes.map((s) => s.staff_type).includes(staff_type)
    ) {
      throw new Error("Staff type already exists");
    }

    // Update staff type
    await StaffType.findByIdAndUpdate(
      id,
      { staff_type, is_hourly_paid, show_on_ecare },
      { new: true }
    );

    // Update last updated at date
    await modifyAdmissionStates({ property: "staff_types_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating staff types: ${err}`);
  }
};

// Delete staff type
export const deleteStaffType = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting staff type
    await StaffType.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "staff_types_last_updated_at" });

    // Return
    return "Staff type deleted";
  } catch (err) {
    throw new Error(`Error deleting staff type: ${err}`);
  }
};
