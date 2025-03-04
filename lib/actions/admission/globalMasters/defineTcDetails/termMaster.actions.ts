"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Term from "@/lib/models/admission/globalMasters/tcDetails/TermMaster.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create term master props
interface CreateTermMasterProps {
  term_name: String;
}
// Create term master
export const createTermMaster = async ({
  term_name,
}: CreateTermMasterProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the term name already exists
    const existinTermMaster = await Term.findOne({
      term_name,
      session: activeSession?.year_name,
    });
    if (existinTermMaster) {
      throw new Error("Term master already exists");
    }

    // Creating new term master
    const newTermMaster = await Term.create({
      session: activeSession?.year_name,
      term_name,
    });
    newTermMaster.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating term master: ${err.message}`);
  }
};

// Fetch term masters
export const fetchTermMasters = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const termMasters = await Term.find({ session: activeSession?.year_name });
    return termMasters;
  } catch (err: any) {
    throw new Error(`Error fetching term masters: ${err}`);
  }
};

// Modify term master props
interface ModifyTermMasterProps {
  id: String;
  term_name: string;
}
// Modify term master
export const modifyTermMaster = async ({
  id,
  term_name,
}: ModifyTermMasterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the term name already exists
    const termMasters = await Term.find({ session: activeSession?.year_name });
    const existingTermMaster = await Term.findById(id);
    if (
      existingTermMaster.term_name !== term_name &&
      termMasters.map((termMaster) => termMaster.term_name).includes(term_name)
    ) {
      throw new Error("Term master already exists");
    }

    // Updating term master
    const updatedTermMaster = await Term.findByIdAndUpdate(
      id,
      { term_name },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating term master: ${err}`);
  }
};

// Delete term master
export const deleteTcTermMaster = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting term master
    await Term.findByIdAndDelete(id);
    return "Term master deleted";
  } catch (err) {
    throw new Error(`Error deleting term master: ${err}`);
  }
};
