"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Document from "@/lib/models/admission/globalMasters/document/Document.model";
import DocumentType from "@/lib/models/admission/globalMasters/document/DocumentType.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create document props
interface CreateDocumentProps {
  document_type: String;
  document_name: String;
}
// Create document
export const createDocument = async ({
  document_type,
  document_name,
}: CreateDocumentProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the document already exists
    const existingDocument = await Document.findOne({
      document_name,
      session: activeSession?.year_name,
    });
    if (existingDocument) {
      throw new Error("Document name already exists");
    }

    // Creating new document
    const newDocument = await Document.create({
      session: activeSession?.year_name,
      document_type,
      document_name,
    });
    newDocument.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating document: ${err.message}`);
  }
};

// Fetch documents
export const fetchDocuments = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const documents = await Document.find({
      session: activeSession?.year_name,
    });
    return documents;
  } catch (err: any) {
    throw new Error(`Error fetching documents: ${err}`);
  }
};

// Modify document props
interface ModifyDocumentProps {
  id: String;
  document_type: String;
  document_name: string;
}
// Modify document
export const modifyDocument = async ({
  id,
  document_type,
  document_name,
}: ModifyDocumentProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the document name already exists
    const documents = await Document.find({
      session: activeSession?.year_name,
    });
    const existingDocument = await Document.findById(id);
    if (
      existingDocument.document_name !== document_name &&
      documents.map((d) => d.document_name).includes(document_name)
    ) {
      throw new Error("Document name already exists");
    }

    // Update document
    await Document.findByIdAndUpdate(
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

// Delete document
export const deleteDocument = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting document
    await Document.findByIdAndDelete(id);
    return "Document deleted";
  } catch (err) {
    throw new Error(`Error deleting document: ${err}`);
  }
};

// Fetch documents for admission
export const fetchDocumentsForAdmission = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const documents = await Document.find({
      session: activeSession?.year_name,
    });
    const documentTypes = await DocumentType.find({
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
    throw new Error(`Error fetching documents: ${err}`);
  }
};
