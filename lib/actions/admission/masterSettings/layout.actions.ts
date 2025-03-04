"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Layout from "@/lib/models/admission/masterSettings/Layout.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create layout props
interface CreateLayoutProps {
  // Report setting
  report_setting: {
    report_name: String;
    report_title: String;
  };

  // Header and footer setting
  header_and_footer_setting: {
    is_header_enable: Boolean;
    is_header_line_enable: Boolean;
    is_footer_enable: Boolean;
    is_footer_line_enable: Boolean;
    is_logo_enable: Boolean;
    is_row_no: Boolean;
    is_group: Boolean;
    is_sum: Boolean;
  };

  // Font size setting
  font_size_setting: {
    font_size: Number;
    is_total: String;
  };

  // Page prientation and layout setting
  page_orientation_and_layout_setting: {
    page_orientation: String;
    page_layout: String;
  };

  // Height and width setting
  height_and_width_setting: {
    page_width: Number;
    page_height: Number;
    footer_height: Number;
    header_height: Number;
    header_line_width: Number;
    logo_height: Number;
    column_width: Number;
    footer_line_height: Number;
    table_column_height: Number;
  };

  // Margin setting
  margin_setting: {
    page_margin_right: Number;
    page_margin_left: Number;
    page_margin_bottom: Number;
    page_margin_top: Number;
    logo_margin_left: Number;
    logo_margin_top: Number;
    table_margin_left: Number;
    table_margin_top: Number;
    footer_line_margin_top: Number;
    header_line_margin_top: Number;
  };
}
// Create layout
export const createLayout = async ({
  report_setting,
  header_and_footer_setting,
  font_size_setting,
  page_orientation_and_layout_setting,
  height_and_width_setting,
  margin_setting,
}: CreateLayoutProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the report name already exists
    const existingLayou = await Layout.findOne({
      "report_setting.report_name": report_setting.report_name,
      session: activeSession?.year_name,
    });
    if (existingLayou) {
      throw new Error("Report name already exists");
    }

    // Creating new layout
    const newLayout = await Layout.create({
      session: activeSession?.year_name,
      report_setting,
      header_and_footer_setting,
      font_size_setting,
      page_orientation_and_layout_setting,
      height_and_width_setting,
      margin_setting,
    });
    newLayout.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating layout: ${err.message}`);
  }
};

// Fetch layout
export const fetchLayouts = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const layouts = await Layout.find({ session: activeSession?.year_name });
    return layouts;
  } catch (err: any) {
    throw new Error(`Error fetching layouts: ${err}`);
  }
};

// Modify layout props
interface ModifyLayoutProps {
  id: String;
  // Report setting
  report_setting: {
    report_name: string;
    report_title: String;
  };

  // Header and footer setting
  header_and_footer_setting: {
    is_header_enable: Boolean;
    is_header_line_enable: Boolean;
    is_footer_enable: Boolean;
    is_footer_line_enable: Boolean;
    is_logo_enable: Boolean;
    is_row_no: Boolean;
    is_group: Boolean;
    is_sum: Boolean;
  };

  // Font size setting
  font_size_setting: {
    font_size: Number;
    is_total: String;
  };

  // Page prientation and layout setting
  page_orientation_and_layout_setting: {
    page_orientation: String;
    page_layout: String;
  };

  // Height and width setting
  height_and_width_setting: {
    page_width: Number;
    page_height: Number;
    footer_height: Number;
    header_height: Number;
    header_line_width: Number;
    logo_height: Number;
    column_width: Number;
    footer_line_height: Number;
    table_column_height: Number;
  };

  // Margin setting
  margin_setting: {
    page_margin_right: Number;
    page_margin_left: Number;
    page_margin_bottom: Number;
    page_margin_top: Number;
    logo_margin_left: Number;
    logo_margin_top: Number;
    table_margin_left: Number;
    table_margin_top: Number;
    footer_line_margin_top: Number;
    header_line_margin_top: Number;
  };
}
// Modify layout
export const modifyLayout = async ({
  id,
  report_setting,
  header_and_footer_setting,
  font_size_setting,
  page_orientation_and_layout_setting,
  height_and_width_setting,
  margin_setting,
}: ModifyLayoutProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });

    // Checking if the report name already exists
    const layouts = await Layout.find({ session: activeSession?.year_name });
    const existingLayout = await Layout.findById(id);
    if (
      existingLayout.report_setting.report_name !==
        report_setting.report_name &&
      layouts
        .map((l) => l.report_setting.report_name)
        .includes(report_setting.report_name)
    ) {
      throw new Error("Report name already exists");
    }

    // Update layout
    await Layout.findByIdAndUpdate(
      id,
      {
        report_setting,
        header_and_footer_setting,
        font_size_setting,
        page_orientation_and_layout_setting,
        height_and_width_setting,
        margin_setting,
      },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating layout: ${err}`);
  }
};

// Delete layout
export const deleteLayout = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting layout
    await Layout.findByIdAndDelete(id);
    return "Layout Deleted";
  } catch (err) {
    throw new Error(`Error deleting layout: ${err}`);
  }
};
