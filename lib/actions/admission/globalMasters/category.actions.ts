"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Category from "@/lib/models/admission/globalMasters/Category.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import { modifyAdmissionStates } from "../../payroll/globalMasters/admissionStates.actions";

// Create category Props
interface CreateCategoryProps {
  category_name: String;
  is_default: Boolean;
}
// Create category
export const createCategory = async ({
  category_name,
  is_default,
}: CreateCategoryProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the category name already exists
    const existingCategory = await Category.findOne({
      category_name,
      is_default,
      session: activeSession?.year_name,
    });
    if (existingCategory) {
      throw new Error("Category name already exists");
    }

    // Creating new category
    const newCategory = await Category.create({
      session: activeSession?.year_name,
      category_name,
      is_default,
    });

    // Checking if the is default is true and setting all the other records to false if so
    if (is_default === true) {
      newCategory.save();
      await Category.updateMany(
        { _id: { $ne: newCategory._id } },
        { is_default: false }
      );
    } else {
      newCategory.save();
    }

    // Update last updated at date
    await modifyAdmissionStates({ property: "categories_last_updated_at" });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating category: ${err.message}`);
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const categories = await Category.find({
      session: activeSession?.year_name,
    });
    return categories;
  } catch (err: any) {
    throw new Error(`Error fetching categories: ${err}`);
  }
};

// Fetch categories names
export const fetchCategoriesNames = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const categories = await Category.find(
      { session: activeSession?.year_name },
      { category_name: 1 }
    );
    return categories;
  } catch (err: any) {
    throw new Error(`Error fetching categories: ${err}`);
  }
};

// Modify category props
interface ModifyCategoryProps {
  id: String;
  category_name: string;
  is_default: Boolean;
}
// Modify category
export const modifyCategory = async ({
  id,
  category_name,
  is_default,
}: ModifyCategoryProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the category name already exists
    const categories = await Category.find({
      session: activeSession?.year_name,
    });
    const existingCategory = await Category.findById(id);
    if (
      existingCategory.category_name !== category_name &&
      categories
        .map((category) => category.category_name)
        .includes(category_name)
    ) {
      throw new Error("Category already exists");
    }

    if (is_default === true) {
      // Update category
      await Category.findByIdAndUpdate(
        id,
        { category_name, is_default },
        { new: true }
      ).then(async () => {
        try {
          await Category.updateMany(
            { _id: { $ne: id } },
            { is_default: false }
          );
        } catch (err: any) {
          console.log(`Error updating other categories: ${err.message}`);
        }
      });
      // Update last updated at date
      await modifyAdmissionStates({ property: "categories_last_updated_at" });
      return "Updated";
    } else {
      // Update category with setting other categories is default to false
      await Category.findByIdAndUpdate(
        id,
        { category_name, is_default },
        { new: true }
      );
      // Update last updated at date
      await modifyAdmissionStates({ property: "categories_last_updated_at" });
      return "Updated";
    }
  } catch (err) {
    throw new Error(`Error updating category: ${err}`);
  }
};

// Delete category
export const deleteCategory = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting category
    await Category.findByIdAndDelete(id);

    // Update last updated at date
    await modifyAdmissionStates({ property: "categories_last_updated_at" });

    // Return
    return "Category Deleted";
  } catch (err) {
    throw new Error(`Error deleting category: ${err}`);
  }
};
