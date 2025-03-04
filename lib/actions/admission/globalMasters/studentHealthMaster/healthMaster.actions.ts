"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import HealthMaster from "@/lib/models/admission/globalMasters/studentHealthMaster/HealthMaster.model";

// Create health Master Props
interface CreateHealthMasterProps {
  health_parameter: String;
  unit: String;
}
// Create health Master
export const createHealthMaster = async ({
  health_parameter,
  unit,
}: CreateHealthMasterProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the health master already exists
    const existinHealthMaster = await HealthMaster.findOne({
      health_parameter,
      session: activeSession?.year_name,
    });
    if (existinHealthMaster) {
      throw new Error("Health master already exists");
    }

    // Creating new health Master
    const newHealthMaster = await HealthMaster.create({
      session: activeSession?.year_name,
      health_parameter,
      unit,
    });
    newHealthMaster.save();

    // Return
    return "Updated";
  } catch (err: any) {
    console.log(`Error creating health master: ${err.message}`);
  }
};

// Fetch health masters
export const fetchHealthMasters = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const healthMasters = await HealthMaster.find({
      session: activeSession?.year_name,
    });
    return healthMasters;
  } catch (err: any) {
    throw new Error(`Error fetching health masters: ${err}`);
  }
};

// Modify health Master props
interface ModifyHealthMasterProps {
  id: String;
  health_parameter: string;
  unit: String;
}
// Modify health Master
export const modifyHealthMaster = async ({
  id,
  health_parameter,
  unit,
}: ModifyHealthMasterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the health master already exists
    const healthMasters = await HealthMaster.find({
      session: activeSession?.year_name,
    });
    const existingHealthMaster = await HealthMaster.findById(id);
    if (
      existingHealthMaster.health_parameter !== health_parameter &&
      healthMasters.map((h) => h.health_parameter).includes(health_parameter)
    ) {
      throw new Error("Health master already exists");
    }

    // Updating health Master
    const updatedHealthMaster = await HealthMaster.findByIdAndUpdate(
      id,
      { health_parameter, unit },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating health master: ${err}`);
  }
};

// Delete health Master
export const deleteHealthMaster = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting health Master
    await HealthMaster.findByIdAndDelete(id);
    return "Health master deleted";
  } catch (err) {
    throw new Error(`Error deleting health master: ${err}`);
  }
};
