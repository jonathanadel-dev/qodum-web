"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Term from "@/lib/models/admission/globalMasters/studentHealthMaster/Term.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create term Props
interface CreateTermProps {
  term_name: String;
}
// Create term
export const createTerm = async ({ term_name }: CreateTermProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the term name already exists
    const existingTerm = await Term.findOne({
      term_name,
      session: activeSession?.year_name,
    });
    if (existingTerm) {
      throw new Error("Term name already exists");
    }

    // Creating new term
    const newTerm = await Term.create({
      session: activeSession?.year_name,
      term_name,
    });
    newTerm.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating term: ${err.message}`);
  }
};

// Fetch term
export const fetchTerms = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const terms = await Term.find({ session: activeSession?.year_name });
    return terms;
  } catch (err: any) {
    throw new Error(`Error fetching terms: ${err}`);
  }
};

// Modify term props
interface ModifyTermProps {
  id: String;
  term_name: string;
}
// Modify term
export const modifyTerm = async ({ id, term_name }: ModifyTermProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the term name already exists
    const terms = await Term.find({ session: activeSession?.year_name });
    const existingTerm = await Term.findById(id);
    if (
      existingTerm.term_name !== term_name &&
      terms.map((i) => i.term_name).includes(term_name)
    ) {
      throw new Error("Term already exists");
    }

    // Updating term
    await Term.findByIdAndUpdate(id, { term_name }, { new: true });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating term: ${err}`);
  }
};

// Delete term
export const deleteTerm = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting term
    await Term.findByIdAndDelete(id);
    return "Term deleted";
  } catch (err) {
    throw new Error(`Error deleting term: ${err}`);
  }
};
