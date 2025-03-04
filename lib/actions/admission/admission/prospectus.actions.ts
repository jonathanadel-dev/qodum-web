"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Prospectus from "@/lib/models/admission/admission/Prospectus.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create prospectus props
interface CreateProspectusProps {
  class_name: String;
  board: String;
  reg_no: Number;
  date: Date;
  session: String;
  student_name: String;
  student_middle_name: String;
  student_last_name: String;
  reference: String;
  date_of_birth: Date;
  gender: String;
  father_name: String;
  father_middle_name: String;
  father_last_name: String;
  mother_name: String;
  mother_middle_name: String;
  mother_last_name: String;
  con_person: String;
  con_mobile: Number;
  con_email: String;
  h_no_and_streets: String;
  state: String;
  city: String;
  pin_code: String;
  stationaries: string[];
  paymode: {
    name: String;
    cheque_no: Number;
    cheque_date: Date;
    cheque_bank: String;
    branch_name: String;
    deposit_bank: String;
    dd_no: Number;
  };
  is_online: Boolean;
}
// Create prospectus
export const createProspectus = async ({
  class_name,
  board,
  reg_no,
  date,
  session,
  student_name,
  student_middle_name,
  student_last_name,
  reference,
  date_of_birth,
  gender,
  father_name,
  father_middle_name,
  father_last_name,
  mother_name,
  mother_middle_name,
  mother_last_name,
  con_person,
  con_mobile,
  con_email,
  h_no_and_streets,
  state,
  city,
  pin_code,
  stationaries,
  paymode: {
    name,
    cheque_no,
    cheque_date,
    cheque_bank,
    branch_name,
    deposit_bank,
    dd_no,
  },
  is_online,
}: CreateProspectusProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the regsiter no. already exists
    const prospectuses = await Prospectus.find({
      session: activeSession?.year_name,
    });
    if (prospectuses.map((p: any) => p.reg_no).includes(reg_no)) {
      throw new Error("Register number already exists");
    }

    // Creating new prospectus
    const newProspectus = await Prospectus.create({
      class_name,
      board,
      reg_no,
      date,
      session,
      student_name,
      student_middle_name,
      student_last_name,
      reference,
      date_of_birth,
      gender,
      father_name,
      father_middle_name,
      father_last_name,
      mother_name,
      mother_middle_name,
      mother_last_name,
      con_person,
      con_mobile,
      con_email,
      h_no_and_streets,
      state,
      city,
      pin_code,
      paymode: {
        name,
        cheque_no,
        cheque_date,
        cheque_bank,
        branch_name,
        deposit_bank,
        dd_no,
      },
      is_online,
    });
    newProspectus.save().then(async () => {
      await Prospectus.findOneAndUpdate({ reg_no }, { stationaries });
    });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating prospectus: ${err.message}`);
  }
};

// Fetch Prospectuses
export const fetchProspectuses = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const prospectuses = await Prospectus.find({
      session: activeSession?.year_name,
    });
    return prospectuses;
  } catch (err: any) {
    throw new Error(`Error fetching prospectuses: ${err}`);
  }
};

// Modify prospectus props
interface ModifyProspectusProps {
  id: String;
  class_name: String;
  board: String;
  reg_no: number;
  date: Date;
  session: String;
  student_name: String;
  student_middle_name: String;
  student_last_name: String;
  reference: String;
  date_of_birth: Date;
  gender: String;
  father_name: String;
  father_middle_name: String;
  father_last_name: String;
  mother_name: String;
  mother_middle_name: String;
  mother_last_name: String;
  con_person: String;
  con_mobile: Number;
  con_email: String;
  h_no_and_streets: String;
  state: String;
  city: String;
  pin_code: String;
  stationaries: string[];
  paymode: {
    name: String;
    cheque_no: Number;
    cheque_date: Date;
    cheque_bank: String;
    branch_name: String;
    deposit_bank: String;
    dd_no: Number;
  };
  is_online: Boolean;
}
// Modify prospectus
export const modifyProspectus = async ({
  id,
  class_name,
  board,
  reg_no,
  date,
  session,
  student_name,
  student_middle_name,
  student_last_name,
  reference,
  date_of_birth,
  gender,
  father_name,
  father_middle_name,
  father_last_name,
  mother_name,
  mother_middle_name,
  mother_last_name,
  con_person,
  con_mobile,
  con_email,
  h_no_and_streets,
  state,
  city,
  pin_code,
  stationaries,
  paymode: {
    name,
    cheque_no,
    cheque_date,
    cheque_bank,
    branch_name,
    deposit_bank,
    dd_no,
  },
  is_online,
}: ModifyProspectusProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the register number already exists
    const prospectuses = await Prospectus.find({
      session: activeSession?.year_name,
    });
    const existingProspectus = await Prospectus.findById(id);
    if (
      existingProspectus.reg_no !== reg_no &&
      prospectuses.map((p) => p.reg_no).includes(reg_no)
    ) {
      throw new Error("Register number already exists");
    }

    // Update propspectus
    await Prospectus.findByIdAndUpdate(
      id,
      {
        class_name,
        board,
        reg_no,
        date,
        session,
        student_name,
        student_middle_name,
        student_last_name,
        reference,
        date_of_birth,
        gender,
        father_name,
        father_middle_name,
        father_last_name,
        mother_name,
        mother_middle_name,
        mother_last_name,
        con_person,
        con_mobile,
        con_email,
        h_no_and_streets,
        state,
        city,
        pin_code,
        stationaries,
        paymode: {
          name,
          cheque_no,
          cheque_date,
          cheque_bank,
          branch_name,
          deposit_bank,
          dd_no,
        },
        is_online,
      },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating prospectus: ${err}`);
  }
};

// Delete prospectus
export const deleteProspectus = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting prospectus
    await Prospectus.findByIdAndDelete(id);
    return "Prospectus Deleted";
  } catch (err) {
    throw new Error(`Error deleting prospectus: ${err}`);
  }
};
