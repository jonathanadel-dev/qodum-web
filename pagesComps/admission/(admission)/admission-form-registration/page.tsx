"use client";
// Imports
import { useEffect, useState } from "react";
import { fetchStudents } from "@/lib/actions/admission/admission/student.actions";
import { fetchAdmissionEnquiries } from "@/lib/actions/admission/admission/enquiry.actions";
import Receipt from "@/components/modules/admission/admission/admissionFormRegistration/receipt";
import FormCom from "@/components/modules/admission/admission/admissionFormRegistration/FormCom";
import ViewCom from "@/components/modules/admission/admission/admissionFormRegistration/ViewCom";
import EnquiryViewCom from "@/components/modules/admission/admission/admissionFormRegistration/EnquiryViewCom";
import LoadingIcon from "@/components/utils/LoadingIcon";

// Main function
const page = () => {
  // Is view component opened
  const [isViewOpened, setIsViewOpened] = useState("");

  // Is receipt opened
  const [isReceiptOpened, setIsReceiptOpened] = useState(false);

  // Is Loading
  const [isLoading, setIsLoading] = useState(false);

  // Pdf data
  const [pdfData, setPdfData] = useState({});

  // Students
  const [students, setStudents] = useState([{}]);

  // Admission Enquiries
  const [admissionEnquiries, setAdmissionEnquiries] = useState([{}]);

  // Update student
  const [updateStudent, setUpdateStudent] = useState({
    id: "",
    isDeleteClicked: false,

    // Student
    student: {
      // 1
      is_online: false,
      image: "",
      enquiry_no: "",
      reg_no: "",
      pros_no: "",
      amount: 0,
      date: new Date(),
      payment_mode:
        localStorage.getItem("pay_mode") !== null
          ? localStorage.getItem("pay_mode")
          : "",
      admission_account:
        localStorage.getItem("admission_account") !== null
          ? localStorage.getItem("admission_account")
          : "",
      post_account:
        localStorage.getItem("post_account") !== null
          ? localStorage.getItem("post_account")
          : "",
      // 2
      class: "",
      board: "",
      stream: "",
      subjects: [""],
      optional_subject: "",
      name: "",
      middle_name: "",
      last_name: "",
      dob: new Date(),
      place_of_birth: "",
      gender: "Male",
      contact_person_name: "",
      contact_person_mobile: 0,
      contact_person_email: "",
      secondary_contact_no: 0,
      h_no_and_streets: "",
      email: "",
      city: "",
      mobile: 0,
      state: "",
      pin_code: 0,
      aadhar_card_no: 0,
      religion: "",
      blood_group: "",
      caste: "",
      category: "",
      is_ews: false,
      sibling: false,
      transport: "",
      nationality: "",
    },

    // Parents
    parents: {
      // Father
      father: {
        father_name: "",
        middle_name: "",
        last_name: "",
        profession: "",
        designation: "",
        residence_address: "",
        office_address: "",
        email: "",
        alternate_email: "",
        dob: new Date(),
        mobile: 0,
        phone: 0,
        company_name: "",
        business_details: "",
        qualification: "",
        service_in: "",
        office_phone: 0,
        office_mobile: 0,
        office_extension: "",
        office_email: "",
        office_website: "",
        annual_income: "",
        parent_status: "",
      },
      // Mother
      mother: {
        mother_name: "",
        middle_name: "",
        last_name: "",
        profession: "",
        designation: "",
        residence_address: "",
        office_address: "",
        email: "",
        alternate_email: "",
        dob: new Date(),
        mobile: 0,
        phone: 0,
        company_name: "",
        business_details: "",
        qualification: "",
        service_in: "",
        office_phone: 0,
        office_mobile: 0,
        office_extension: "",
        office_email: "",
        office_website: "",
        annual_income: "",
        anniversary_date: new Date(),
      },
    },

    // Other details
    others: {
      // 1
      student_other_details: {
        medical_history: "",
        descriptions: "",
        allergies: "",
        allergies_causes: "",
        family_doctor_name: "",
        family_doctor_phone: 0,
        family_doctor_address: "",
        distance_from_home: "",
        no_of_living_year: 0,
        only_child: "",
        general_description: "",
      },
      // 2
      student_staff_relation: {
        staff_ward: "",
        staff_name: "",
      },
      // 3
      is_alumni: {
        is_alumni: false,
        academic_session: "",
        class_name: "",
        admission_number: 0,
      },
      // 4
      previous_school_details: [
        {
          school_name: "",
          board: "",
          passing_year: "",
          total_marks: "",
          percentage: "",
          result: "",
          is_alumni: "",
          father_name: "",
          father_passing_year: "",
          mother_name: "",
          mother_passing_year: "",
        },
        {
          school_name: "",
          board: "",
          passing_year: "",
          total_marks: "",
          percentage: "",
          result: "",
          is_alumni: "",
          father_name: "",
          father_passing_year: "",
          mother_name: "",
          mother_passing_year: "",
        },
        {
          school_name: "",
          board: "",
          passing_year: "",
          total_marks: "",
          percentage: "",
          result: "",
          is_alumni: "",
          father_name: "",
          father_passing_year: "",
          mother_name: "",
          mother_passing_year: "",
        },
      ],
    },

    // Guardian details
    guardian_details: {
      // 1
      guardian_name: "",
      profession: "",
      designation: "",
      company_name: "",
      business_details: "",
      qualification: "",
      // 2
      if_single_parent: {
        student_lives_with: "",
        legal_custody_of_the_child: "",
        correspondence_to: "",
        check_id_applicable: "",
        separation_reason: "",
      },
    },

    // Siblings
    siblings: [],

    // Paymode details
    paymode_details: {
      cheque_no: "",
      cheque_date: new Date(),
      cheque_bank: "",
      dd_no: "",
      dd_date: new Date(),
      dd_bank: "",
      branch_name: "",
      deposit_bank: "",
      neft_name: "",
    },
  });

  // Values from enquiry
  const [valuesFromEnquiry, setValuesFromEnquiry] = useState({
    enquiry_no: "",
    visitor_name: "",
    visitor_address: "",
    mobile_no: 0,
    student_name: "",
    class_name: "",
    contact_person: "",
  });

  // Selected subjects
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Previous schools details
  const [previousSchoolsDetails, setPreviousSchoolsDetails] = useState([
    {
      class: "",
      school_name: "",
      board: "",
      passing_year: "",
      total_marks: "",
      obtain_marks: "",
      percentage: "",
      result: "",
    },
  ]);

  // Siblings
  const [siblings, setSiblings] = useState([{}]);

  // Use effect
  useEffect(() => {
    const fetcher = async () => {
      const enquiriesRes = await fetchAdmissionEnquiries();
      const studentsRes = await fetchStudents();
      setAdmissionEnquiries(
        enquiriesRes.filter(
          (e: any) =>
            !studentsRes
              .map((s: any) => s.student?.enquiry_no)
              .includes(e?.enquiry_no)
        )
      );
      setStudents(studentsRes);
    };
    fetcher();
  }, [isViewOpened, updateStudent]);

  return (
    <div className="h-full flex flex-col items-center justify-start pt-2 bg-white overflow-hidden">
      {isLoading ? (
        <LoadingIcon />
      ) : isReceiptOpened ? (
        <Receipt pdfData={pdfData} setIsReceiptOpened={setIsReceiptOpened} />
      ) : isViewOpened === "admission" ? (
        <ViewCom
          students={students}
          setIsViewOpened={setIsViewOpened}
          setUpdateStudent={setUpdateStudent}
          setValuesFromEnquiry={setValuesFromEnquiry}
          setSelectedSubjects={setSelectedSubjects}
          setPreviousSchoolsDetails={setPreviousSchoolsDetails}
          setSiblings={setSiblings}
        />
      ) : isViewOpened === "enquiry" ? (
        <EnquiryViewCom
          setUpdateStudent={setUpdateStudent}
          enquiries={admissionEnquiries}
          setIsViewOpened={setIsViewOpened}
          setSelectedSubjects={setSelectedSubjects}
          setValuesFromEnquiry={setValuesFromEnquiry}
        />
      ) : (
        <FormCom
          isViewOpened={isViewOpened}
          setIsViewOpened={setIsViewOpened}
          students={students}
          updateStudent={updateStudent}
          valuesFromEnquiry={valuesFromEnquiry}
          setUpdateStudent={setUpdateStudent}
          admissionEnquiries={admissionEnquiries}
          setValuesFromEnquiry={setValuesFromEnquiry}
          selectedSubjects={selectedSubjects}
          setSelectedSubjects={setSelectedSubjects}
          previousSchoolsDetails={previousSchoolsDetails}
          setPreviousSchoolsDetails={setPreviousSchoolsDetails}
          siblings={siblings}
          setSiblings={setSiblings}
          setPdfData={setPdfData}
          setIsReceiptOpened={setIsReceiptOpened}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

// Export
export default page;
