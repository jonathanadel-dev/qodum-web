"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import HealthUnit from "@/lib/models/admission/globalMasters/studentHealthMaster/HealthUnit.model";

// Create health unit Props
interface CreateHealthUnitProps {
  unit_name: String;
  unit_type: String;
}
// Create health unit
export const createHealthUnit = async ({
  unit_name,
  unit_type,
}: CreateHealthUnitProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the health unit name already exists
    const existinHealthUnit = await HealthUnit.findOne({
      unit_name,
      session: activeSession?.year_name,
    });
    if (existinHealthUnit) {
      throw new Error("Health unit name already exists");
    }

    // Creating new health unit
    const newHealthUnit = await HealthUnit.create({
      session: activeSession?.year_name,
      unit_name,
      unit_type,
    });
    newHealthUnit.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating health unit: ${err.message}`);
  }
};

// Fetch health units
export const fetchHealthUnits = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const healthUnits = await HealthUnit.find({
      session: activeSession?.year_name,
    });
    return healthUnits;
  } catch (err: any) {
    throw new Error(`Error fetching health units: ${err}`);
  }
};

// Modify health unit props
interface ModifyHealthUnitProps {
  id: String;
  unit_name: string;
  unit_type: String;
}
// Modify health unit
export const modifyHealthUnit = async ({
  id,
  unit_name,
  unit_type,
}: ModifyHealthUnitProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the health unit name already exists
    const healthUnits = await HealthUnit.find({
      session: activeSession?.year_name,
    });
    const existingHealthUnit = await HealthUnit.findById(id);
    if (
      existingHealthUnit.unit_name !== unit_name &&
      healthUnits.map((h) => h.unit_name).includes(unit_name)
    ) {
      throw new Error("Health unit already exists");
    }

    // Updating health unit
    const updatedHealthUnit = await HealthUnit.findByIdAndUpdate(
      id,
      { unit_name, unit_type },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating health unit: ${err}`);
  }
};

// Delete health unit
export const deleteHealthUnit = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting health unit
    await HealthUnit.findByIdAndDelete(id);
    return "Health unit deleted";
  } catch (err) {
    throw new Error(`Error deleting health unit: ${err}`);
  }
};
