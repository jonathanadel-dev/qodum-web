"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Department from "@/lib/models/payroll/globalMasters/Department.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create department props
interface CreateDepartmentProps {
  department: String;
}
// Create department
export const createDepartment = async ({
  department,
}: CreateDepartmentProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the department already exists
    const existingDepartment = await Department.findOne({
      department,
      session: activeSession?.year_name,
    });
    if (existingDepartment) {
      throw new Error("Department already exists");
    }

    // Creating new department
    const newDepartment = await Department.create({
      session: activeSession?.year_name,
      department,
    });
    newDepartment.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating department: ${err.message}`);
  }
};

// Fetch departments
export const fetchDepartments = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const departments = await Department.find({
      session: activeSession?.year_name,
    });

    // Return
    return departments;
  } catch (err: any) {
    throw new Error(`Error fetching departments: ${err}`);
  }
};

// Modify department props
interface ModifyDepartmentProps {
  id: String;
  department: string;
}
// Modify department
export const modifyDepartment = async ({
  id,
  department,
}: ModifyDepartmentProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the department already exists
    const departments = await Department.find({
      session: activeSession?.year_name,
    });
    const existingDepartment = await Department.findById(id);
    if (
      existingDepartment.department !== department &&
      departments.map((s) => s.department).includes(department)
    ) {
      throw new Error("Department already exists");
    }

    // Update department
    await Department.findByIdAndUpdate(id, { department }, { new: true });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating department: ${err}`);
  }
};

// Delete department
export const deleteDepartment = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting department
    await Department.findByIdAndDelete(id);

    // Return
    return "Department Deleted";
  } catch (err) {
    throw new Error(`Error deleting department: ${err}`);
  }
};
