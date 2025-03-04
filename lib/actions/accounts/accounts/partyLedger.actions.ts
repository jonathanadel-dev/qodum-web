"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import PartyLedger from "@/lib/models/accounts/accounts/PartyLedger.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create party ledger props
interface CreatePartyLedgerProps {
  account_name: String;
  account_no: Number;
  cin_no: Number;
  group: String;
  account_type: String;
  account_address: String;
  account_city: String;
  pin_code: Number;
  email: String;
  mobile: Number;
  pan: String;
  gstin: String;
  opening_balance: Number;
  opening_balance_type: String;
  assign_date: Date;
}
// Create party ledger
export const createPartyLedger = async ({
  account_name,
  account_no,
  cin_no,
  group,
  account_type,
  account_address,
  account_city,
  pin_code,
  email,
  mobile,
  pan,
  gstin,
  opening_balance,
  opening_balance_type,
  assign_date,
}: CreatePartyLedgerProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if party ledger already exists
    const existingPartyLedger = await PartyLedger.findOne({
      account_name,
      session: activeSession?.year_name,
    });
    if (existingPartyLedger) {
      throw new Error("Party ledger already exists");
    }

    // Creating new party ledger
    const newPartyLedger = await PartyLedger.create({
      session: activeSession?.year_name,
      account_name,
      account_no,
      cin_no,
      group,
      account_type,
      account_address,
      account_city,
      pin_code,
      email,
      mobile,
      pan,
      gstin,
      opening_balance,
      opening_balance_type,
      assign_date,
    });
    newPartyLedger.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error Creating Party Ledger: ${err.message}`);
  }
};

// Fetch Party Ledgers
export const fetchPartyLedgers = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const partyLedgers = await PartyLedger.find({
      session: activeSession?.year_name,
    });
    return partyLedgers;
  } catch (err: any) {
    throw new Error(`Error fetching party ledgers: ${err}`);
  }
};

// Modify Party Ledger Props
interface ModifyPartyLedgerProps {
  id: String;
  account_name: string;
  account_no: Number;
  cin_no: Number;
  group: String;
  account_type: String;
  account_address: String;
  account_city: String;
  pin_code: Number;
  email: String;
  mobile: Number;
  pan: String;
  gstin: String;
  opening_balance: Number;
  opening_balance_type: String;
  assign_date: Date;
}
// Modify Party Ledger
export const modifyPartyLedger = async ({
  id,
  account_name,
  account_no,
  cin_no,
  group,
  account_type,
  account_address,
  account_city,
  pin_code,
  email,
  mobile,
  pan,
  gstin,
  opening_balance,
  opening_balance_type,
  assign_date,
}: ModifyPartyLedgerProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the party ledger already exists
    const partyLedgers = await PartyLedger.find({
      session: activeSession?.year_name,
    });
    const existingPartyLedger = await PartyLedger.findById(id);
    if (
      existingPartyLedger.account_name !== account_name &&
      partyLedgers.map((ledger) => ledger.account_name).includes(account_name)
    ) {
      throw new Error("Party ledger already exists");
    }

    // Update Party Ledger
    await PartyLedger.findByIdAndUpdate(
      id,
      {
        account_name,
        account_no,
        cin_no,
        group,
        account_type,
        account_address,
        account_city,
        pin_code,
        email,
        mobile,
        pan,
        gstin,
        opening_balance,
        opening_balance_type,
        assign_date,
      },
      { new: true }
    );

    // Return
    return "Created";
  } catch (err) {
    throw new Error(`Error updating party ledger: ${err}`);
  }
};

// Delete Party Ledger
export const deletePartyLedger = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting Party Ledger
    await PartyLedger.findByIdAndDelete(id);
    return "Party Ledger Deleted";
  } catch (err) {
    throw new Error(`Error deleting party ledger: ${err}`);
  }
};
