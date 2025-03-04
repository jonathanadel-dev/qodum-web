"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import StaffDocumentType from "@/lib/models/payroll/globalMasters/document/StaffDocumentType.model";

// Create staff document type props
interface CreateStaffDocumentProps {
  document_type: String;
}
// Create staff document type
export const createStaffDocumentType = async ({
  document_type,
}: CreateStaffDocumentProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the document type already exists
    const existingDocument = await StaffDocumentType.findOne({
      document_type,
      session: activeSession?.year_name,
    });
    if (existingDocument) {
      throw new Error("Document type already exists");
    }

    // Creating new document type
    const newDocument = await StaffDocumentType.create({
      session: activeSession?.year_name,
      document_type,
    });
    newDocument.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating staff document type: ${err.message}`);
  }
};

// Fetch staff document types
export const fetchStaffDocumentTypes = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const staffDocumentTypes = await StaffDocumentType.find({
      session: activeSession?.year_name,
    });
    return staffDocumentTypes;
  } catch (err: any) {
    throw new Error(`Error fetching staff document types: ${err}`);
  }
};

// Modify staff document type props
interface ModifyStaffDocumentTypeProps {
  id: String;
  document_type: string;
}
// Modify staff document type
export const modifyStaffDocumentType = async ({
  id,
  document_type,
}: ModifyStaffDocumentTypeProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the document type already exists
    const staffDocuments = await StaffDocumentType.find({
      session: activeSession?.year_name,
    });
    const existingStaffDocumentType = await StaffDocumentType.findById(id);
    if (
      existingStaffDocumentType.document_type !== document_type &&
      staffDocuments.map((d) => d.document_type).includes(document_type)
    ) {
      throw new Error("Document type already exists");
    }

    // Update document type
    await StaffDocumentType.findByIdAndUpdate(
      id,
      { document_type },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating document type: ${err}`);
  }
};

// Delete staff document type
export const deleteStaffDocumentType = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting document type
    await StaffDocumentType.findByIdAndDelete(id);
    return "Document type deleted";
  } catch (err) {
    throw new Error(`Error deleting document type: ${err}`);
  }
};
