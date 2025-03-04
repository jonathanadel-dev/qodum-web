"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import BloodGroup from "@/lib/models/admission/globalMasters/BloodGroup.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create blood group props
interface CreateBloodGroupProps {
  blood_group: String;
}
// Create blood group
export const createBloodGroup = async ({
  blood_group,
}: CreateBloodGroupProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the blood group already exists
    const existingBloodGroup = await BloodGroup.findOne({
      blood_group,
      session: activeSession?.year_name,
    });
    if (existingBloodGroup) {
      throw new Error("Blood group already exists");
    }

    // Creating new blood group
    const newBloodGroup = await BloodGroup.create({
      session: activeSession?.year_name,
      blood_group,
    });
    newBloodGroup.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "blood_groups_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating blood group: ${err.message}`);
  }
};

// Fetch blood groups
export const fetchBloodGroups = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const bloodGroups = await BloodGroup.find({
      session: activeSession?.year_name,
    });
    return bloodGroups;
  } catch (err: any) {
    throw new Error(`Error fetching blood groups: ${err}`);
  }
};

// Fetch blood groups names
export const fetchBloodGroupsNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const bloodGroups = await BloodGroup.find(
      { session: activeSession?.year_name },
      { blood_group: 1 }
    );
    return bloodGroups;
  } catch (err: any) {
    throw new Error(`Error fetching blood groups: ${err}`);
  }
};

// Modify blood group props
interface ModifyBloodGroupProps {
  id: String;
  blood_group: string;
}
// Modify blood group
export const modifyBloodGroup = async ({
  id,
  blood_group,
}: ModifyBloodGroupProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the blood group already exists
    const bloodGroups = await BloodGroup.find({
      session: activeSession?.year_name,
    });
    const existingBloodGroup = await BloodGroup.findById(id);
    if (
      existingBloodGroup.blood_group !== blood_group &&
      bloodGroups.map((r) => r.blood_group).includes(blood_group)
    ) {
      throw new Error("Blood group already exists");
    }

    // Updating blood group
    await BloodGroup.findByIdAndUpdate(id, { blood_group }, { new: true });

    // Update last updated at date
    await modifyAdmissionStates({ property: "blood_groups_last_updated_at" });

    // Return
    return "Modified";
  } catch (err) {
    throw new Error(`Error updating blood group: ${err}`);
  }
};

// Delete blood group
export const deleteBloodGroup = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting blood group
    await BloodGroup.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "blood_groups_last_updated_at" });

    // Return
    return "Blood Group Deleted";
  } catch (err) {
    throw new Error(`Error deleting blood group: ${err}`);
  }
};
