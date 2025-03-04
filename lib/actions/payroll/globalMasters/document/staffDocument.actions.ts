"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Document from "@/lib/models/admission/globalMasters/document/Document.model";
import DocumentType from "@/lib/models/admission/globalMasters/document/DocumentType.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import StaffDocument from "@/lib/models/payroll/globalMasters/document/StaffDocument.model";
import StaffDocumentType from "@/lib/models/payroll/globalMasters/document/StaffDocumentType.model";

// Create staff document props
interface CreateStaffDocumentProps {
  document_type: String;
  document_name: String;
}
// Create staff document
export const createStaffDocument = async ({
  document_type,
  document_name,
}: CreateStaffDocumentProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the document already exists
    const existingDocument = await StaffDocument.findOne({
      document_name,
      session: activeSession?.year_name,
    });
    if (existingDocument) {
      throw new Error("Document name already exists");
    }

    // Creating new document
    const newDocument = await StaffDocument.create({
      session: activeSession?.year_name,
      document_type,
      document_name,
    });
    newDocument.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating staff document: ${err.message}`);
  }
};

// Fetch staff documents
export const fetchStaffDocuments = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const documents = await StaffDocument.find({
      session: activeSession?.year_name,
    });
    return documents;
  } catch (err: any) {
    throw new Error(`Error fetching documents: ${err}`);
  }
};

// Modify staff document props
interface ModifyStaffDocumentProps {
  id: String;
  document_type: String;
  document_name: string;
}
// Modify staff document
export const modifyStaffDocument = async ({
  id,
  document_type,
  document_name,
}: ModifyStaffDocumentProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the document name already exists
    const documents = await StaffDocument.find({
      session: activeSession?.year_name,
    });
    const existingDocument = await StaffDocument.findById(id);
    if (
      existingDocument.document_name !== document_name &&
      documents.map((d) => d.document_name).includes(document_name)
    ) {
      throw new Error("Document name already exists");
    }

    // Update document
    await StaffDocument.findByIdAndUpdate(
      id,
      { document_type, document_name },
      { new: true }
    );

    // Return
    return "Modified";
  } catch (err) {
    throw new Error(`Error updating document: ${err}`);
  }
};

// Delete staff document
export const deleteStaffDocument = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting document
    await StaffDocument.findByIdAndDelete(id);
    return "Document deleted";
  } catch (err) {
    throw new Error(`Error deleting document: ${err}`);
  }
};

// Fetch staff documents for admission
export const fetchStaffDocumentsForAdmission = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const documents = await StaffDocument.find({
      session: activeSession?.year_name,
    });
    const documentTypes = await StaffDocumentType.find({
      session: activeSession?.year_name,
    });

    const filtered = documentTypes.map((dt) => {
      return {
        document_type: dt.document_type,
        document_names: documents.filter(
          (d) => d.document_type === dt.document_type
        ),
      };
    });

    // Return
    return filtered;
  } catch (err: any) {
    throw new Error(`Error fetching staff documents: ${err}`);
  }
};
