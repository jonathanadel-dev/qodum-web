"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import FinancialYear from "@/lib/models/accounts/globalMasters/defineSession/FinancialYear.model";

// Create Financial Year Props
interface CreateFinancialYearProps {
  year_name: String;
  start_date: {
    day: String;
    month: String;
    year: String;
  };
  end_date: {
    day: String;
    month: String;
    year: String;
  };
  is_active: Boolean;
}
// Create Financial Year
export const createFinancialYear = async ({
  year_name,
  start_date,
  end_date,
  is_active,
}: CreateFinancialYearProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Checking if the year name already exists
    const existingYear = await FinancialYear.findOne({ year_name });
    if (existingYear) {
      throw new Error("Financial year already exists");
    }

    // Creating new financial year
    const newFinancialYear = await FinancialYear.create({
      year_name,
      start_date: {
        day: start_date.day,
        month: start_date.month,
        year: start_date.year,
      },
      end_date: {
        day: end_date.day,
        month: end_date.month,
        year: end_date.year,
      },
      is_active,
    });

    // Checking if the it is active and setting all the other records to false if so
    if (is_active === true) {
      newFinancialYear.save();
      await FinancialYear.updateMany(
        { _id: { $ne: newFinancialYear._id } },
        { is_active: false }
      );
    } else {
      newFinancialYear.save();
    }

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error Creating Financial Year: ${err.message}`);
  }
};

// Fetch Financial Years
export const fetchFinancialYears = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching
    const financialYears = await FinancialYear.find();
    return financialYears;
  } catch (err: any) {
    throw new Error(`Error fetching financial years: ${err}`);
  }
};

// Modify Financial Years Props
interface ModifyFinancialYearsProps {
  id: String;
  year_name: string;
  start_date: {
    day: String;
    month: String;
    year: String;
  };
  end_date: {
    day: String;
    month: String;
    year: String;
  };
  is_active: Boolean;
}
// Modify Financial Years
export const modifyFinancialYears = async ({
  id,
  year_name,
  start_date,
  end_date,
  is_active,
}: ModifyFinancialYearsProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Checking if the year name already exists
    const financialYears = await FinancialYear.find();
    const existingYear = await FinancialYear.findById(id);
    if (
      existingYear?.year_name !== year_name &&
      financialYears.map((year) => year?.year_name).includes(year_name)
    ) {
      throw new Error("Financial year already exists");
    }

    if (is_active === true) {
      // Update Financial Year
      const updatedFinancialYear = await FinancialYear.findByIdAndUpdate(
        id,
        {
          year_name,
          start_date: {
            day: start_date.day,
            month: start_date.month,
            year: start_date.year,
          },
          end_date: {
            day: end_date.day,
            month: end_date.month,
            year: end_date.year,
          },
          is_active,
        },
        { new: true }
      ).then(async () => {
        try {
          await FinancialYear.updateMany(
            { _id: { $ne: id } },
            { is_active: false }
          );
        } catch (err: any) {
          console.log(`Error updating other years: ${err.message}`);
        }
      });
      return "Created";
    } else {
      // Update Financial Year with setting other years is active to false
      const updatedFinancialYear = await FinancialYear.findByIdAndUpdate(
        id,
        {
          year_name,
          start_date: {
            day: start_date.day,
            month: start_date.month,
            year: start_date.year,
          },
          end_date: {
            day: end_date.day,
            month: end_date.month,
            year: end_date.year,
          },
          is_active,
        },
        { new: true }
      );
      return "Created";
    }
  } catch (err) {
    throw new Error(`Error updating financial year: ${err}`);
  }
};

// Delete Financial Year
export const deleteFinancialYear = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting Financial Year
    await FinancialYear.findByIdAndDelete(id);
    return "Financial Year Deleted";
  } catch (err) {
    throw new Error(`Error deleting financial year: ${err}`);
  }
};

// Fetch active financial year *multiple api calls same
export const fetchActiveFinancialYear = async () => {
  try {
    // Db connection
    await connectToDb("accounts");

    // Fetching
    const financialYear = await FinancialYear.findOne({ is_active: true });

    // Check if the financial year exists
    if (!financialYear) {
      throw new Error("No active financial year found");
    }

    // Convert the Mongoose document to a plain JavaScript object
    const activeFinancialYear = {
      ...financialYear.toObject(),
      _id: financialYear._id.toString(),
    };

    // Return
    return activeFinancialYear;
  } catch (err: any) {
    throw new Error(`Error fetching financial year: ${err.message}`);
  }
};

// Create Financial Years
export const createFinancialYears = async ({ financial_years }: any) => {
  try {
    // Database connection
    await connectToDb("accounts");

    // Creating new financial years
    await FinancialYear.insertMany(financial_years);

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error Creating Financial Years: ${err.message}`);
  }
};
