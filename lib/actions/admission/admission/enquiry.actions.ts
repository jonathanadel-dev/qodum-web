"use server";
// Imports
import { connectToDb } from "@/lib/mongoose";
import Enquiry from "@/lib/models/admission/admission/Enquiry.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";

// Create enquiry props
interface CreateEnquiryProps {
  enquiry_no: String;
  enquiry_date: Date;
  visitor_name: String;
  visitor_address: String;
  mobile_no: Number;
  purpose_is_admission: Boolean;
  student_name: String;
  class_name: String;
  reason_to_visit: String;
  contact_person: String;
  reference_details: String;
}
// Create enquiry
export const createEnquiry = async ({
  enquiry_no,
  enquiry_date,
  visitor_name,
  visitor_address,
  mobile_no,
  purpose_is_admission,
  student_name,
  class_name,
  reason_to_visit,
  contact_person,
  reference_details,
}: CreateEnquiryProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the enquiry already exists
    const existinEnquiry = await Enquiry.findOne({
      enquiry_no,
      session: activeSession?.year_name,
    });
    if (existinEnquiry) {
      throw new Error("Enquiry already exists");
    }

    // Creating new enquiiry
    const newEnquiry = await Enquiry.create({
      session: activeSession?.year_name,
      enquiry_no,
      enquiry_date,
      visitor_name,
      visitor_address,
      mobile_no,
      purpose_is_admission,
      student_name,
      class_name,
      reason_to_visit,
      contact_person,
      reference_details,
    });
    newEnquiry.save();

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating enquiry: ${err.message}`);
  }
};

// Fetch enquiries
export const fetchEnquiries = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const enquiries = await Enquiry.find({ session: activeSession?.year_name });
    return enquiries;
  } catch (err: any) {
    throw new Error(`Error fetching enquiries: ${err}`);
  }
};

// Modify enquiry props
interface ModifyEnquiryProps {
  id: String;
  enquiry_no: string;
  enquiry_date: Date;
  visitor_name: String;
  visitor_address: String;
  mobile_no: Number;
  purpose_is_admission: Boolean;
  student_name: String;
  class_name: String;
  reason_to_visit: String;
  contact_person: String;
  reference_details: String;
}
// Modify enquiry
export const modifyEnquiry = async ({
  id,
  enquiry_no,
  enquiry_date,
  visitor_name,
  visitor_address,
  mobile_no,
  purpose_is_admission,
  student_name,
  class_name,
  reason_to_visit,
  contact_person,
  reference_details,
}: ModifyEnquiryProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the enquiry already exists
    const enquiries = await Enquiry.find({ session: activeSession?.year_name });
    const existingEnquiry = await Enquiry.findById(id);
    if (
      existingEnquiry.enquiry_no !== enquiry_no &&
      enquiries.map((e) => e.enquiry_no).includes(enquiry_no)
    ) {
      throw new Error("Enquiry already exists");
    }

    // Update propspectus
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      {
        enquiry_no,
        enquiry_date,
        visitor_name,
        visitor_address,
        mobile_no,
        purpose_is_admission,
        student_name,
        class_name,
        reason_to_visit,
        contact_person,
        reference_details,
      },
      { new: true }
    );

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating enquiry: ${err}`);
  }
};

// Delete enquiry
export const deleteEnquiry = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Deleting enquiry
    await Enquiry.findByIdAndDelete(id);
    return "Enquiry Deleted";
  } catch (err) {
    throw new Error(`Error deleting enquiry: ${err}`);
  }
};

// Fetch enquiries with admission purpose
export const fetchAdmissionEnquiries = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const enquiries = await Enquiry.find({
      purpose_is_admission: true,
      session: activeSession?.year_name,
    });
    return enquiries;
  } catch (err: any) {
    throw new Error(`Error fetching enquiries: ${err}`);
  }
};

// Fetch enquiry by enquiry number
export const fetchEnquiryByEnquiryNo = async ({
  enquiry_no,
}: {
  enquiry_no: String;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching student
    const enquiry = await Enquiry.findOne({
      enquiry_no,
      session: activeSession?.year_name,
    });

    // Return
    return enquiry;
  } catch (err) {
    throw new Error(`Error fetching enquiry: ${err}`);
  }
};

// Fetch enquiries count
export const fetchEnquiriesCount = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const enquiries = await Enquiry.countDocuments({
      session: activeSession?.year_name,
    });

    // Return
    return enquiries;
  } catch (err: any) {
    throw new Error(`Error fetching enquiries: ${err}`);
  }
};
