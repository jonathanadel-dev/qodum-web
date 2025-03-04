"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import BankLedger from "@/lib/models/accounts/accounts/BankLedger.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create bank ledger props
interface CreateBankLedgerProps {
  account_name: String;
  account_no: Number;
  group: String;
  account_type: String;
  account_address: String;
  account_city: String;
  pin_code: Number;
  email: String;
  mobile: Number;
  opening_balance: Number;
  opening_balance_type: String;
  assign_date: Date;
}
// Create bank ledger
export const createBankLedger = async ({
  account_name,
  account_no,
  group,
  account_type,
  account_address,
  account_city,
  pin_code,
  email,
  mobile,
  opening_balance,
  opening_balance_type,
  assign_date,
}: CreateBankLedgerProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if bank ledger already exists
    const existingBankLedger = await BankLedger.findOne({
      account_name,
      session: activeSession?.year_name,
    });
    if (existingBankLedger) {
      throw new Error("Bank ledger already exists");
    }

    // Creating new bank ledger
    const newBankLedger = await BankLedger.create({
      session: activeSession?.year_name,
      account_name,
      account_no,
      group,
      account_type,
      account_address,
      account_city,
      pin_code,
      email,
      mobile,
      opening_balance,
      opening_balance_type,
      assign_date,
    });
    newBankLedger.save();

    // Update last updated at date
    await modifyAdmissionStates({ property: "post_accounts_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error Creating Bank Ledger: ${err.message}`);
  }
};

// Fetch Bank Ledgers
export const fetchBankLedgers = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const bankLedgers = await BankLedger.find({
      session: activeSession?.year_name,
    });
    return bankLedgers;
  } catch (err: any) {
    throw new Error(`Error fetching bank ledgers: ${err}`);
  }
};

// Modify Bank Ledger Props
interface ModifyBankLedgerProps {
  id: String;
  account_name: string;
  account_no: Number;
  group: String;
  account_type: String;
  account_address: String;
  account_city: String;
  pin_code: Number;
  email: String;
  mobile: Number;
  opening_balance: Number;
  opening_balance_type: String;
  assign_date: Date;
}
// Modify Bank Ledger
export const modifyBankLedger = async ({
  id,
  account_name,
  account_no,
  group,
  account_type,
  account_address,
  account_city,
  pin_code,
  email,
  mobile,
  opening_balance,
  opening_balance_type,
  assign_date,
}: ModifyBankLedgerProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the bank ledger already exists
    const bankLedgers = await BankLedger.find({
      session: activeSession?.year_name,
    });
    const existingBankLedger = await BankLedger.findById(id);
    if (
      existingBankLedger.account_name !== account_name &&
      bankLedgers.map((ledger) => ledger.account_name).includes(account_name)
    ) {
      throw new Error("Bank ledger already exists");
    }

    // Update Bank Ledger
    const updatedBankLedger = await BankLedger.findByIdAndUpdate(
      id,
      {
        account_name,
        account_no,
        group,
        account_type,
        account_address,
        account_city,
        pin_code,
        email,
        mobile,
        opening_balance,
        opening_balance_type,
        assign_date,
      },
      { new: true }
    );

    // Update last updated at date
    await modifyAdmissionStates({ property: "post_accounts_last_updated_at" });

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating bank ledger: ${err}`);
  }
};

// Delete Bank Ledger
export const deleteBankLedger = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting Bank Ledger
    await BankLedger.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "post_accounts_last_updated_at" });

    // Return
    return "Bank Ledger Deleted";
  } catch (err) {
    throw new Error(`Error deleting bank ledger: ${err}`);
  }
};
