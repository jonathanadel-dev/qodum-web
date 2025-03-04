"use server";
// Imports
import moment from "moment";
import { connectToDb } from "@/lib/mongoose";
import RouteStop from "@/lib/models/fees/transport/RouteStop.model";
import Subject from "@/lib/models/admission/globalMasters/Subject.model";
import Head from "@/lib/models/fees/feeMaster/defineFeeMaster/FeeHead.model";
import TransportGroup from "@/lib/models/fees/transport/TransportGroup.model";
import Class from "@/lib/models/fees/globalMasters/defineClassDetails/Class.model";
import { fetchInstallments } from "../../fees/feeMaster/feeMaster/installment.actions";
import AdmittedStudent from "@/lib/models/admission/admission/AdmittedStudent.model";
import Installment from "@/lib/models/fees/feeMaster/defineFeeMaster/FeeInstallment.model";
import AcademicYear from "@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model";
import VehicleDetails from "@/lib/models/fees/transport/VehicleDetails.model";
import Student from "@/lib/models/admission/admission/Student.model";

// Total number generator
const totalNumberGenerator = (array: any) => {
  let sum = 0;
  for (let i = 0; i < array?.length; i++) {
    sum += array[i];
  }
  return sum;
};

// Is session transfered
export const isStudentsSesssionTransfered = async () => {
  try {
    // Database connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Records
    const records = await AdmittedStudent.find({
      session: activeSession?.year_name,
    });

    // Return
    return records.length > 0 ? 0 : 1;
  } catch (err) {
    throw new Error("Error");
  }
};

// Students session transfer
export const studentsSesssionTransfer = async ({
  next_session,
  classes,
}: any) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Records
    classes.map(async (c: any) => {
      await AdmittedStudent.findOneAndUpdate(
        { "student.class": c.class_name },
        {
          "student.class": c.next_class,
          "student.section": c.next_section,
          session: next_session,
        }
      );
    });

    // Return
    return "Transfered";
  } catch (err) {
    throw new Error("Error");
  }
};

// Fetching un transfered classes
export const fetchUnTransferedClasses = async ({
  current_session,
  next_session,
}: any) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Records
    const students = await AdmittedStudent.find({ session: current_session });
    const studentsClassesNames = students.map((s: any) => s.student.class);

    // Classes
    const classes = await Class.find({
      class_name: { $in: studentsClassesNames },
    });

    // Return
    return JSON.parse(JSON.stringify(classes));
  } catch (err) {
    throw new Error("Error");
  }
};

// Create admitted student props
interface CreateAdmittedStudentProps {
  // Student
  student: {
    // Admission data
    section: String;
    adm_no: String;
    pen_no: String;
    par_id: String;
    roll_no: String;
    bill_no: String;
    is_university: Boolean;
    re_adm_no: String;
    is_minority: Boolean;
    is_disability: Boolean;
    dis_disc: String;
    is_new: Boolean;
    is_active: Boolean;
    reason: String;
    is_only_child: Boolean;
    student_status: String;
    house: String;
    doa: Date;
    doj: Date;
    admitted_class: String;
    // 1
    image: String;
    // 2
    stream: String;
    subjects: string[];
    optional_subject: String;
    class: String;
    board: String;
    name: String;
    middle_name: String;
    last_name: String;
    dob: Date;
    place_of_birth: String;
    gender: String;
    contact_person_name: String;
    contact_person_mobile: Number;
    contact_person_email: String;
    secondary_contact_no: Number;
    h_no_and_streets: String;
    locality: String;
    email: String;
    city: String;
    mobile: Number;
    state: String;
    pin_code: Number;
    aadhar_card_no: Number;
    whats_app_no: Number;
    religion: String;
    parish: String;
    caste: String;
    category: String;
    blood_group: String;
    cadet_type: String;
    club: String;
    is_ews: Boolean;
    is_rte: Boolean;
    sibling: Boolean;
    transport: String;
    nationality: String;
  };

  // Parents
  parents: {
    // Father
    father: {
      father_name: String;
      middle_name: String;
      last_name: String;
      profession: String;
      designation: String;
      residence_address: String;
      office_address: String;
      email: String;
      alternate_email: String;
      dob: Date;
      mobile: Number;
      phone: Number;
      company_name: String;
      business_details: String;
      qualification: String;
      service_in: String;
      office_phone: Number;
      office_mobile: Number;
      office_extension: String;
      office_email: String;
      office_website: String;
      annual_income: String;
      parent_status: String;
    };
    // Mother
    mother: {
      mother_name: String;
      middle_name: String;
      last_name: String;
      profession: String;
      designation: String;
      residence_address: String;
      office_address: String;
      email: String;
      alternate_email: String;
      dob: Date;
      mobile: Number;
      phone: Number;
      company_name: String;
      business_details: String;
      qualification: String;
      service_in: String;
      office_phone: Number;
      office_mobile: Number;
      office_extension: String;
      office_email: String;
      office_website: String;
      annual_income: String;
      anniversary_date: Date;
    };
  };

  // Other details
  others: {
    // 1
    student_other_details: {
      medical_history: String;
      descriptions: String;
      allergies: String;
      allergies_causes: String;
      family_doctor_name: String;
      family_doctor_phone: Number;
      family_doctor_address: String;
      distance_from_home: String;
      no_of_living_year: Number;
      only_child: String;
      general_description: String;
    };
    // 2
    student_staff_relation: {
      staff_ward: String;
      staff_name: String;
    };
    // 3
    is_alumni: {
      is_alumni: Boolean;
      academic_session: String;
      class_name: String;
      admission_number: Number;
    };
    // 4
    previous_school_details: any;
  };

  // Guardian details
  guardian_details: {
    // 1
    guardian_name: String;
    profession: String;
    designation: String;
    company_name: String;
    business_details: String;
    qualification: String;
    // 2
    if_single_parent: {
      student_lives_with: String;
      legal_custody_of_the_child: String;
      correspondence_to: String;
      check_id_applicable: String;
      separation_reason: String;
    };
  };

  // Documents
  documents: {
    document_type: String;
    document_name: String;
  }[];
}
// Create admitted student
export const createAdmittedStudent = async ({
  student,
  parents,
  others,
  guardian_details,
  documents,
}: CreateAdmittedStudentProps) => {
  try {
    // Database connection
    connectToDb("accounts");

    // Fetching active session naeme
    const activeSession = await AcademicYear.findOne({ is_active: 1 });
    if (!activeSession) return 0;

    // Checking if the admission number already exists
    const existingStudent = await AdmittedStudent.findOne({
      "student.adm_no": student.adm_no,
      session: activeSession?.year_name,
    });
    if (existingStudent) {
      throw new Error("Admission no. already exists");
    }

    // Class fees
    const theClass = await Class.findOne({ class_name: student.class });

    // Creating new student
    const newStudent = await AdmittedStudent.create({
      session: activeSession?.year_name,
      student,
      parents,
      others,
      guardian_details,
      health_details: {
        height: 0,
        weight: 0,
      },
      transport_details: {
        route: "",
        stop: "",
        vehicle: "",
        seat_no: 0,
        months: [],
      },
    });
    newStudent.save().then(async () => {
      await AdmittedStudent.findOneAndUpdate(
        { "student.adm_no": student.adm_no },
        {
          "student.subjects": student.subjects,
          documents,
          affiliated_heads: {
            group_name: theClass.affiliated_heads.group_name
              ? !student.is_new
                ? theClass.affiliated_heads.group_name
                : theClass.affiliated_special_heads.group_name
                ? `${theClass.affiliated_heads.group_name} (${theClass.affiliated_special_heads.group_name})`
                : theClass.affiliated_heads.group_name
              : "",
            heads: theClass.affiliated_heads.heads
              .concat(
                student.is_new ? theClass.affiliated_special_heads.heads : []
              )
              .sort((a: any, b: any) => a.priority_no - b.priority_no),
          },
        }
      );
    });

    // Updating subjects
    const subjectsAffected = await Subject.find({
      subject_name: student.subjects,
      is_university: true,
      session: activeSession?.year_name,
    });
    subjectsAffected.map(async (s) => {
      await Subject.updateMany(
        { subject_name: s.subject_name },
        { available_seats: s.available_seats - 1 }
      );
    });

    // Return
    return "Created";
  } catch (err: any) {
    console.log(`Error creating admitted student: ${err.message}`);
  }
};

// Fetch admitted students
export const fetchAdmittedStudents = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const students = await AdmittedStudent.find({
      session: activeSession?.year_name,
      "student.is_active": true,
    });
    return students;
  } catch (err: any) {
    throw new Error(`Error fetching admitted students: ${err}`);
  }
};

// Fetch fee entry students
export const fetchFeeEntryAdmittedStudents = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const students = await AdmittedStudent.find(
      { session: activeSession?.year_name, "student.is_active": true },
      {
        "student.name": 1,
        "student.class": 1,
        "student.is_active": 1,
        "parents.father.father_name": 1,
        "parents.mother.mother_name": 1,
      }
    );
    return JSON.parse(JSON.stringify(students));
  } catch (err: any) {
    throw new Error(`Error fetching admitted students: ${err}`);
  }
};

// Fetch admission dashboard admitted students
export const fetchFeesDashboardAdmittedStudents = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching
    const students = await AdmittedStudent.find(
      { session: activeSession?.year_name, "student.is_active": true },
      { "student.name": 1, "student.gender": 1, affiliated_heads: 1 }
    );
    return JSON.parse(JSON.stringify(students));
  } catch (err: any) {
    throw new Error(`Error fetching admitted students: ${err}`);
  }
};

// Fetch all admitted students
export const fetchAllAdmittedStudents = async () => {
  try {
   
      await connectToDb("accounts");

    const activeSession = await AcademicYear.findOne(
      { is_active: true },
      { year_name: 1 }
    ).lean();

    if (!activeSession) {
      return [];
    }

    const students = await AdmittedStudent.find(
      { session: activeSession.year_name }
    ).lean();
    
    return students; 
  } catch (err) {
    console.error("Error fetching admitted students:", err);
    throw new Error(`Error fetching admitted students: ${err.message}`);
  }
};


// Modify admitted student props
interface ModifyAdmittedStudentProps {
  id: String;
  // Student
  student: {
    // Admission data
    section: String;
    adm_no: string;
    pen_no: String;
    par_id: String;
    roll_no: String;
    bill_no: String;
    is_university: Boolean;
    re_adm_no: String;
    is_minority: Boolean;
    is_disability: Boolean;
    dis_disc: String;
    is_new: Boolean;
    is_active: Boolean;
    reason: String;
    is_only_child: Boolean;
    student_status: String;
    house: String;
    doa: Date;
    doj: Date;
    admitted_class: String;
    // 1
    image: String;
    // 2
    stream: String;
    subjects: string[];
    optional_subject: String;
    class: String;
    board: String;
    name: String;
    middle_name: String;
    last_name: String;
    dob: Date;
    place_of_birth: String;
    gender: String;
    contact_person_name: String;
    contact_person_mobile: Number;
    contact_person_email: String;
    secondary_contact_no: Number;
    h_no_and_streets: String;
    locality: String;
    email: String;
    city: String;
    mobile: Number;
    state: String;
    pin_code: Number;
    aadhar_card_no: Number;
    whats_app_no: Number;
    religion: String;
    parish: String;
    caste: String;
    category: String;
    blood_group: String;
    cadet_type: String;
    club: String;
    is_ews: Boolean;
    is_rte: Boolean;
    sibling: Boolean;
    transport: String;
    nationality: String;
  };

  // Parents
  parents: {
    // Father
    father: {
      father_name: String;
      middle_name: String;
      last_name: String;
      profession: String;
      designation: String;
      residence_address: String;
      office_address: String;
      email: String;
      alternate_email: String;
      dob: Date;
      mobile: Number;
      phone: Number;
      company_name: String;
      business_details: String;
      qualification: String;
      service_in: String;
      office_phone: Number;
      office_mobile: Number;
      office_extension: String;
      office_email: String;
      office_website: String;
      annual_income: String;
      parent_status: String;
    };
    // Mother
    mother: {
      mother_name: String;
      middle_name: String;
      last_name: String;
      profession: String;
      designation: String;
      residence_address: String;
      office_address: String;
      email: String;
      alternate_email: String;
      dob: Date;
      mobile: Number;
      phone: Number;
      company_name: String;
      business_details: String;
      qualification: String;
      service_in: String;
      office_phone: Number;
      office_mobile: Number;
      office_extension: String;
      office_email: String;
      office_website: String;
      annual_income: String;
      anniversary_date: Date;
    };
  };

  // Other details
  others: {
    // 1
    student_other_details: {
      medical_history: String;
      descriptions: String;
      allergies: String;
      allergies_causes: String;
      family_doctor_name: String;
      family_doctor_phone: Number;
      family_doctor_address: String;
      distance_from_home: String;
      no_of_living_year: Number;
      only_child: String;
      general_description: String;
    };
    // 2
    student_staff_relation: {
      staff_ward: String;
      staff_name: String;
    };
    is_alumni: {
      is_alumni: Boolean;
      academic_session: String;
      class_name: String;
      admission_number: Number;
    };
    // 3
    previous_school_details: any;
  };

  // Guardian details
  guardian_details: {
    // 1
    guardian_name: String;
    profession: String;
    designation: String;
    company_name: String;
    business_details: String;
    qualification: String;
    // 2
    if_single_parent: {
      student_lives_with: String;
      legal_custody_of_the_child: String;
      correspondence_to: String;
      check_id_applicable: String;
      separation_reason: String;
    };
  };

  // Documents
  documents: {
    document_type: String;
    document_name: String;
  }[];
}
// Modify admitted student
export const modifyAdmittedStudent = async ({
  id,
  student,
  parents,
  others,
  guardian_details,
  documents,
}: ModifyAdmittedStudentProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Checking if the admission no. already exists
    const students = await AdmittedStudent.find({
      session: activeSession?.year_name,
    });
    const existingStudent = await AdmittedStudent.findById(id);
    if (
      existingStudent.student.adm_no !== student.adm_no &&
      students.map((student) => student.student.adm_no).includes(student.adm_no)
    ) {
      throw new Error("Admission no. already exists");
    }

    // Fee groups check
    const theStudent = await AdmittedStudent.findById(id);
    const previousClass = await Class.findOne({
      class_name: theStudent?.student?.class,
    });
    const newClass = await Class.findOne({ class_name: student.class });
    const isNewClassFeeGroupSame =
      previousClass?.affiliated_heads?.group_name ===
      newClass?.affiliated_heads?.group_name;
    const studentPaidFees = totalNumberGenerator(
      theStudent?.affiliated_heads?.heads?.map((h: any) =>
        totalNumberGenerator(
          h?.amounts?.map((a: any) => Number(a?.last_rec_amount || 0))
        )
      )
    );
    if (theStudent?.affiliated_heads?.group_name) {
      if (isNewClassFeeGroupSame) {
        if (student.is_new && theStudent?.student?.is_new) {
          await AdmittedStudent.findByIdAndUpdate(
            id,
            { student, parents, others, guardian_details, documents },
            { new: true }
          );
        } else {
          if (!theStudent?.student?.is_new && student.is_new) {
            await AdmittedStudent.findByIdAndUpdate(
              id,
              {
                student,
                parents,
                others,
                guardian_details,
                documents,
                affiliated_heads: {
                  group_name: `${newClass.affiliated_heads.group_name} (${newClass.affiliated_special_heads.group_name})`,
                  heads: theStudent.affiliated_heads.heads
                    .concat(newClass.affiliated_special_heads.heads)
                    .sort((a: any, b: any) => a.priority_no - b.priority_no),
                },
              },
              { new: true }
            );
          } else {
            const studentPaidFeesInNewHeads = totalNumberGenerator(
              theStudent?.affiliated_heads?.heads
                ?.filter((h: any) =>
                  newClass?.affiliated_special_heads?.heads
                    ?.map((nh: any) => nh.head_name)
                    .includes(h?.head_name)
                )
                ?.map((h: any) =>
                  totalNumberGenerator(
                    h?.amounts?.map((a: any) => Number(a?.last_rec_amount || 0))
                  )
                )
            );
            if (studentPaidFeesInNewHeads > 0) {
              return 1;
            } else {
              await AdmittedStudent.findByIdAndUpdate(
                id,
                {
                  student,
                  parents,
                  others,
                  guardian_details,
                  documents,
                  affiliated_heads: {
                    group_name: `${newClass.affiliated_heads.group_name}`,
                    heads: theStudent.affiliated_heads.heads
                      .filter(
                        (h: any) =>
                          !newClass.affiliated_special_heads.heads
                            ?.map((nh: any) => nh.head_name)
                            .includes(h.head_name)
                      )
                      .sort((a: any, b: any) => a.priority_no - b.priority_no),
                  },
                },
                { new: true }
              );
            }
          }
        }
      } else {
        if (studentPaidFees > 0) {
          return 1;
        } else {
          await AdmittedStudent.findByIdAndUpdate(
            id,
            {
              student,
              parents,
              others,
              guardian_details,
              documents,
              affiliated_heads: {
                group_name: newClass?.affiliated_heads?.group_name
                  ? `${newClass?.affiliated_heads?.group_name || ""} ${
                      student.is_new
                        ? newClass.affiliated_special_heads.group_name
                          ? `(${newClass.affiliated_special_heads.group_name})`
                          : ""
                        : ""
                    }`
                  : "",
                heads: newClass.affiliated_heads.heads
                  .concat(
                    student.is_new
                      ? newClass.affiliated_special_heads.heads
                      : []
                  )
                  .sort((a: any, b: any) => a.priority_no - b.priority_no),
              },
            },
            { new: true }
          );
        }
      }
    } else {
      if (newClass?.affiliated_heads?.group_name) {
        await AdmittedStudent.findByIdAndUpdate(
          id,
          {
            student,
            parents,
            others,
            guardian_details,
            documents,
            affiliated_heads: {
              group_name: `${newClass.affiliated_heads.group_name || ""} ${
                student.is_new
                  ? newClass.affiliated_special_heads.group_name
                    ? `(${newClass.affiliated_special_heads.group_name})`
                    : ""
                  : ""
              }`,
              heads: newClass.affiliated_heads.heads
                .concat(
                  student.is_new ? newClass.affiliated_special_heads.heads : []
                )
                .sort((a: any, b: any) => a.priority_no - b.priority_no),
            },
          },
          { new: true }
        );
      } else {
        await AdmittedStudent.findByIdAndUpdate(
          id,
          { student, parents, others, guardian_details, documents },
          { new: true }
        );
      }
    }

    // Subjects handling
    const previousSubjects = await Subject.find({
      subject_name: existingStudent.student.subjects,
      is_university: true,
    });
    const newSubjects = await Subject.find({
      subject_name: student.subjects,
      is_university: true,
    });

    // Additional subjects
    const additionalSubjects = newSubjects.filter(
      (s) =>
        !previousSubjects
          .map((subject) => subject.subject_name)
          .includes(s.subject_name)
    );
    if (additionalSubjects.length > 0) {
      additionalSubjects.map(async (s) => {
        await Subject.updateMany(
          { subject_name: s.subject_name },
          { available_seats: s.available_seats - 1 }
        );
      });
    }

    // Substracted subjects
    const subtractedSubjects = previousSubjects.filter(
      (s) =>
        !newSubjects
          .map((subject) => subject.subject_name)
          .includes(s.subject_name)
    );
    if (subtractedSubjects.length > 0) {
      subtractedSubjects.map(async (s) => {
        await Subject.updateMany(
          { subject_name: s.subject_name },
          { available_seats: s.available_seats + 1 }
        );
      });
    }

    // Return
    return "Updated";
  } catch (err) {
    throw new Error(`Error updating admitted student: ${err}`);
  }
};

// Delete admitted student
export const deleteAdmittedStudent = async ({ id }: { id: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Adding subject available seats
    const student = await AdmittedStudent.findById(id);
    const subjects = await Subject.find({
      subject_name: student.student.subjects,
      is_university: true,
    });
    await VehicleDetails.findOneAndUpdate(
      { vehicle_name: student?.transport_details?.vehicle },
      { $inc: { reserved_seats: -1 } }
    );
    if (subjects.length > 0) {
      subjects.map(async (s) => {
        await Subject.updateMany(
          { subject_name: s.subject_name },
          { available_seats: s.available_seats + 1 }
        );
      });
    }

    // Deleting student
    await AdmittedStudent.findByIdAndDelete(id);

    // Return
    return "Student Deleted";
  } catch (err) {
    throw new Error(`Error deleting student: ${err}`);
  }
};

// Siblings search
export const siblingsSearch = async ({
  class_name,
  section,
  adm_no,
}: {
  class_name: String;
  section: String;
  adm_no: String;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching student
    const students = await AdmittedStudent.find({
      "student.class": class_name,
      "student.section": section,
      "student.adm_no": adm_no,
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Returing
    return students;
  } catch (err) {
    throw new Error(`Error fetching student: ${err}`);
  }
};

// Fetch student by admission no
export const fetchStudentByAdmNo = async ({ adm_no }: { adm_no: String }) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching student
    const student = await AdmittedStudent.findOne({
      "student.adm_no": adm_no,
      session: activeSession?.year_name,
    });
    // const studentRes = {
    //     ...student._doc,
    //     _id:student._doc._id.toString()
    // };

    // Return
    return JSON.parse(JSON.stringify(student));
  } catch (err) {
    throw new Error(`Error fetching student: ${err}`);
  }
};

// Fetch students by class and section
export const fetchStudentsByClassAndSection = async ({
  class_name,
  section,
}: {
  class_name: String;
  section: String;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching student
    const students = await AdmittedStudent.find({
      "student.class": class_name,
      "student.section": section,
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Return
    return students;
  } catch (err) {
    throw new Error(`Error fetching students: ${err}`);
  }
};

// Fetch students by class and section Transport
export const fetchStudentsByClassAndSectionTransport = async ({
  class_name,
  section,
}: {
  class_name: String;
  section: String;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Students
    const students = await AdmittedStudent.find({
      "student.class": class_name,
      "student.section": section,
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Return
    return students;
  } catch (err) {
    throw new Error(`Error fetching students: ${err}`);
  }
};

// Modify students' health details props
interface ModifyStudentsHealthDetails {
  students: any;
}
// Modify students' health details
export const modifyStudentsHealthDetails = async ({
  students,
}: ModifyStudentsHealthDetails) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Updating students
    students.map(async (student: any) => {
      await AdmittedStudent.updateMany(
        { "student.adm_no": student.adm_no },
        {
          "health_details.height": student.height,
          "health_details.weight": student.weight,
          session: activeSession?.year_name,
        }
      );
    });

    // Return
    return "Students updated";
  } catch (err) {
    throw new Error(`Error updating students: ${err}`);
  }
};

// Fetch students by all data props
interface fetchStudentsByAllDataProps {
  name: String;
  father_name: String;
  adm_no: String;
  mobile: String;
  class_name: String;
  section_name: String;
}
// Fetch students by all data
export const fetchStudentsByAllData = async ({
  name,
  father_name,
  adm_no,
  mobile,
  class_name,
  section_name,
}: fetchStudentsByAllDataProps) => {
  try {
    // Connect to DB
    connectToDb("accounts");

    // Get active session
    const activeSession = await AcademicYear.findOne({ is_active: true });
    if (!activeSession) throw new Error("No active session found.");

    // Base query
    let query: any = {
      session: activeSession.year_name,
      "student.is_active": true,
    };

    // Search conditions
    let searchConditions: any[] = [];

    // If any of the search parameters are provided, add them to the search conditions
    if (name || father_name || adm_no || mobile || class_name || section_name) {
      // Handle name (partial match)
      if (name) {
        searchConditions.push({
          "student.name": { $regex: name, $options: "i" },
        });
      }

      // Handle father's name (partial match)
      if (father_name) {
        searchConditions.push({
          "parents.father.father_name": { $regex: father_name, $options: "i" },
        });
      }

      // Handle admission number (flexible partial match for numeric part)
      if (adm_no) {
        // Extract only the numeric part from the input
        const numericPart = adm_no.replace(/\D/g, ""); // Removes all non-numeric characters

        // Match the numeric part anywhere in the `adm_no` field
        searchConditions.push({
          "student.adm_no": {
            $regex: numericPart,
            $options: "i",
          },
        });
      }

      // Handle mobile (exact match, only if the input is a valid number)
      if (mobile && !isNaN(Number(mobile))) {
        searchConditions.push({ "student.mobile": Number(mobile) });
      }

      // Handle class name (partial match)
      if (class_name) {
        searchConditions.push({
          "student.class": { $regex: class_name, $options: "i" },
        });
      }

      // Handle section name (partial match)
      if (section_name) {
        searchConditions.push({
          "student.section": { $regex: section_name, $options: "i" },
        });
      }

      // Combine search conditions with $or
      query["$or"] = searchConditions;
    }

    // Fetch students
    const students = await AdmittedStudent.find(query, {
      "student.name": 1,
      "student.class": 1,
      "student.image": 1,
      "student.adm_no": 1,
      "parents.father.father_name": 1,
      affiliated_heads: 1,
    }).lean();

    return students;
  } catch (err) {
    throw new Error(`Error fetching students: ${err}`);
  }
};

// Fetch students by all data fee entry props
interface fetchStudentsByAllDataFeeEntryProps {
  name: String;
  father_name: String;
  adm_no: String;
  mobile: String;
  class_name: String;
  section_name: String;
}
// Fetch students by all data
export const fetchStudentsByAllDataFeeEntry = async ({
  name,
  father_name,
  adm_no,
  mobile,
  class_name,
  section_name,
}: fetchStudentsByAllDataFeeEntryProps) => {
  try {
    // Connect to DB
    connectToDb("accounts");

    // Get active session
    const activeSession = await AcademicYear.findOne({ is_active: true });
    if (!activeSession) throw new Error("No active session found.");

    // Base query
    let query: any = {
      session: activeSession.year_name,
      "student.is_active": true,
    };

    // Search conditions
    let searchConditions: any[] = [];

    // If any of the search parameters are provided, add them to the search conditions
    if (name || father_name || adm_no || mobile || class_name || section_name) {
      // Handle name (partial match)
      if (name) {
        searchConditions.push({
          "student.name": { $regex: name, $options: "i" },
        });
      }

      // Handle father's name (partial match)
      if (father_name) {
        searchConditions.push({
          "parents.father.father_name": { $regex: father_name, $options: "i" },
        });
      }

      // Handle admission number (flexible partial match for numeric part)
      if (adm_no) {
        // Extract only the numeric part from the input
        const numericPart = adm_no.replace(/\D/g, ""); // Removes all non-numeric characters

        // Match the numeric part anywhere in the `adm_no` field
        searchConditions.push({
          "student.adm_no": {
            $regex: numericPart,
            $options: "i",
          },
        });
      }

      // Handle mobile (exact match, only if the input is a valid number)
      if (mobile && !isNaN(Number(mobile))) {
        searchConditions.push({ "student.mobile": Number(mobile) });
      }

      // Handle class name (partial match)
      if (class_name) {
        searchConditions.push({
          "student.class": { $regex: class_name, $options: "i" },
        });
      }

      // Handle section name (partial match)
      if (section_name) {
        searchConditions.push({
          "student.section": { $regex: section_name, $options: "i" },
        });
      }

      // Combine search conditions with $or
      query["$or"] = searchConditions;
    }

    // Fetch students
    const students = await AdmittedStudent.find(query, {
      "student.name": 1,
      "student.class": 1,
      "student.image": 1,
      "student.adm_no": 1,
      "parents.father.father_name": 1,
      affiliated_heads: 1,
    }).lean();

    return students;
  } catch (err) {
    console.error("Error fetching students:", err);
    throw new Error(`Error fetching students: ${err}`);
  }
};

// Fetch student by classes
export const fetchStudentsByClasses = async ({
  classes,
}: {
  classes: string[];
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching students
    const students = await AdmittedStudent.find({
      "student.class": { $in: classes },
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Return
    return students;
  } catch (err) {
    throw new Error(`Error fetching students: ${err}`);
  }
};

// Modify student affiliated heads props
interface ModifyStudentAffiliatedHeadsProps {
  id: String;
  affiliated_heads: any;
}
// Modify student affiliated heads
export const ModifyStudentAffiliatedHeads = async ({
  id,
  affiliated_heads,
}: ModifyStudentAffiliatedHeadsProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Updating
    await AdmittedStudent.findByIdAndUpdate(id, { affiliated_heads });

    // Return
    return "Modified";
  } catch (err) {
    throw new Error(`Error updating student affiliated heads: ${err}`);
  }
};

// Fetch students count by class and section
export const fetchStudentsCountByClassAndSection = async ({
  class_name,
  section,
}: {
  class_name: String;
  section: String;
}) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Res
    let res;

    // Class res
    const classRes = await AdmittedStudent.countDocuments({
      "student.class": class_name,
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Section res
    const sectionRes = await AdmittedStudent.countDocuments({
      "student.section": section === "" ? "empty" : section,
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // All res
    const allRes = await AdmittedStudent.countDocuments({
      "student.class": class_name,
      "student.section": section === "" ? "empty" : section,
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // All res
    if (classRes > 0 && !section) {
      res = classRes;
    } else if (section && classRes === 0) {
      res = sectionRes;
    } else if (classRes > 0 && section) {
      res = allRes;
    }

    // Return
    return JSON.parse(JSON.stringify(res)) || [0];
  } catch (err) {
    throw new Error(`Error fetching students count: ${err}`);
  }
};

// Modify student transport details props
interface ModifyStudentTransportDetailsProps {
  adm_no: any;
  transport_details: any;
}
// Modify students transport details
export const ModifyStudentsTransportDetails = async ({
  adm_no,
  transport_details,
}: ModifyStudentTransportDetailsProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Fetching installments
    const installments = await fetchInstallments();

    // Fetching route stop
    const routeStop = await RouteStop.findOne({
      stop_name: transport_details.stop,
      session: activeSession?.year_name,
    });

    // Transport group amount
    const transportGroup = await TransportGroup.findOne({
      distance_name: routeStop.transport_groups.jan,
      session: activeSession?.year_name,
    });

    // Fetching transport fee
    const transportFee = await Head.findOne({
      type: "transport",
      session: activeSession?.year_name,
    });
    const submitTransporFee = {
      type_name: transportFee.affiliated_fee_type || "",
      head_name: transportFee.name || "",
      schedule_type: transportFee.pay_schedule || "",
      installment: "All installments",
      account: "---",
      post_account: "---",
      fee_type: transportFee.type || "",
      amounts: installments.map((i: any) => {
        return {
          name: i.name,
          value: transportGroup?.distance_amount || 0,
        };
      }),
    };

    // Updating
    await AdmittedStudent.findOneAndUpdate(
      { "student.adm_no": adm_no, session: activeSession?.year_name },
      {
        transport_details,
        $push: { "affiliated_heads.heads": submitTransporFee },
      }
    );

    // Updating vehicle details
    await VehicleDetails.findOneAndUpdate(
      { vehicle_name: transport_details.vehicle },
      { $inc: { reserved_seats: 1 } }
    );
  } catch (err) {
    throw new Error(`Error updating student transport details: ${err}`);
  }
};

// Fee defaulter list filter props
interface FeeDefaulterListFilterProps {
  school: String;
  wing: String;
  class_name: String;
  section: String;
  classes: any;
  board: String;
  fee_type: String;
  installments: any;
  from_date: Date;
  till_date: Date;
  heads: any;
  range: String;
  range_value: Number;
}
// Fee defaulter list filter
export const FeeDefaulterListFilter = async ({
  school,
  wing,
  class_name,
  section,
  classes,
  board,
  fee_type,
  installments,
  from_date,
  till_date,
  heads,
  range,
  range_value,
}: FeeDefaulterListFilterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Students
    const students = await AdmittedStudent.find({
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Installments
    const installmentsRes = await Installment.find({
      session: activeSession?.year_name,
    });
    const pastDueDateInstallments = installmentsRes
      ?.filter((i: any) => {
        const installmentDueDate = moment(
          `${i.due_date.day}-${i.due_date.month}-${i.due_date.year}`
        );
        return installmentDueDate.isBetween(from_date, till_date, null, "[]");
      })
      .map((i: any) => i.name)
      ?.filter((i: any) =>
        installments.map((item: any) => item.name).includes(i)
      );

    // Students filter
    const filteredStudnets = students
      // Installments filter
      ?.filter(
        (s: any) =>
          s.affiliated_heads.heads
            .map((h: any) => h.amounts.map((a: any) => a.name))
            ?.flat()
            ?.filter((i: any) => pastDueDateInstallments.includes(i)).length > 0
      )
      // Schools filter
      ?.filter((s: any) => (school === "All Schools" ? s : s))
      // Wing filter
      ?.filter((s: any) => (wing === "All Wings" ? s : s))
      // Class filter
      ?.filter((s: any) =>
        class_name === "Select All" ? s : s.student.class === class_name
      )
      // Section filter
      ?.filter((s: any) =>
        section === "Select All" ? s : s.student.section === section
      )
      // Classes filter
      ?.filter((s: any) =>
        classes.map((c: any) => c.class_name).includes(s.student.class)
      )
      // Board filter
      ?.filter((s: any) =>
        board === "All Boards" ? s : s.student.board === board
      )
      // Fee type filter
      ?.filter((s: any) =>
        fee_type === "All fee types"
          ? s
          : s.affiliated_heads.heads
              .map((h: any) => h.type_name)
              .includes(fee_type)
      )
      // Heads filter
      ?.filter(
        (s: any) =>
          s.affiliated_heads.heads?.filter((h: any) =>
            heads.map((head: any) => head.name).includes(h.head_name)
          ).length > 0
      );

    // Return
    return filteredStudnets;
  } catch (err) {
    throw new Error(`Error filtering defaulter list: ${err}`);
  }
};

// Student details filter props
interface StudentDetailsFilterProps {
  school: String;
  classes: any;
  sections: any;
  genders: any;
  religions: any;
  categories: any;
  seniorities: any;
  activities: any;
  statuses: any;
  is_ews: any;
  transports: any;
  is_sibling: any;
  streams: any;
  optional_subjects: any;
}
// Student details filter
export const studentDetailsFilter = async ({
  school,
  classes,
  genders,
  religions,
  categories,
  seniorities,
  activities,
  statuses,
  is_ews,
  transports,
  is_sibling,
  streams,
  optional_subjects,
  sections,
}: StudentDetailsFilterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Students
    const students = await AdmittedStudent.find({
      session: activeSession?.year_name,
    });

    // Filtered students
    const filteredStudents = students
      // Schools filter
      .filter((s: any) => (school === "All schools" ? s : s))
      // Classes filter
      .filter((s: any) => classes.includes(s.student.class))
      // Sections filter
      .filter((s: any) => sections.includes(s.student.section))
      // Genders filter
      .filter((s: any) => genders.includes(s.student.gender))
      // Religions filter
      .filter((s: any) => religions.includes(s.student.religion))
      // Categories filter
      .filter((s: any) => categories.includes(s.student.category))
      // Is new filter
      .filter((s: any) => {
        if (seniorities.includes("New") && seniorities.includes("Old")) {
          return s;
        } else if (seniorities.includes("New")) {
          return s.student.is_new;
        } else {
          return !s.student.is_new;
        }
      })
      // Is active filter
      .filter((s: any) => {
        if (activities.includes("Yes") && activities.includes("No")) {
          return s;
        } else if (activities.includes("Yes")) {
          return s.student.is_active;
        } else {
          return !s.student.is_active;
        }
      })
      // Status filter
      .filter((s: any) => statuses.includes(s.student.student_status))
      // Is ews filter
      .filter((s: any) => {
        if (is_ews.includes("Yes") && is_ews.includes("No")) {
          return s;
        } else if (is_ews.includes("Yes")) {
          return s.student.is_ews;
        } else {
          return !s.student.is_ews;
        }
      })
      // Transport filter
      .filter((s: any) => s)
      // Is sibling filter
      .filter((s: any) => {
        if (is_sibling.includes("Yes") && is_sibling.includes("No")) {
          return s;
        } else if (is_sibling.includes("Yes")) {
          return s.student.is_sibling;
        } else {
          return !s.student.is_sibling;
        }
      })
      // Streams filter
      .filter((s: any) => streams.includes(s.student.stream))
      // Optional subject filter
      .filter((s: any) =>
        optional_subjects.includes(s.student.optional_subject)
      );

    // Return
    return filteredStudents;
  } catch (err) {
    throw new Error(`Error filtering student details: ${err}`);
  }
};

// Class wise student strength filter props
interface ClassWiseStudentStrengthFilterProps {
  date_of_adm: Date;
  class_name: String;
  is_new_students: Boolean;
  section: String;
}
// Class wise student strength filter
export const classWiseStudentStrengthFilter = async ({
  date_of_adm,
  class_name,
  is_new_students,
  section,
}: ClassWiseStudentStrengthFilterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // Students
    const students = await AdmittedStudent.find({
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Filtered students
    const filteredStudents = students
      // Date of admission filter
      .filter((s: any) => s.student.doa < date_of_adm)
      // Class filter
      .filter((s: any) =>
        class_name === "All classes" ? s : s.student.class === class_name
      )
      // Is new filter
      .filter((s: any) => (is_new_students ? s.student.is_new : s))
      // Section filter
      .filter((s: any) =>
        section === "All sections" ? s : s.student.section === section
      );

    // Return
    return filteredStudents;
  } catch (err) {
    throw new Error(`Error filtering student details: ${err}`);
  }
};

// Fetch students count and genders counts
export const studentsAndGendersCounts = async () => {
  try {
    // Ensure DB connection
    connectToDb("accounts");

    // Fetch active session (only necessary field)
    const activeSession = await AcademicYear.findOne({ is_active: true }).select("year_name");
    if (!activeSession) throw new Error("No active session found");

    // Aggregation with optimized structure
    const [result] = await AdmittedStudent.aggregate([
      {
        $match: {
          session: activeSession.year_name,
          "student.is_active": true,
        },
      },
      {
        $group: {
          _id: null,
          all_students_count: { $sum: 1 },
          boys_count: { $sum: { $cond: [{ $eq: ["$student.gender", "Male"] }, 1, 0] } },
          girls_count: { $sum: { $cond: [{ $eq: ["$student.gender", "Female"] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          all_students_count: 1,
          boys_count: 1,
          girls_count: 1,
        },
      },
    ]);

    // Return formatted counts
    return result || { all_students_count: 0, boys_count: 0, girls_count: 0 };
  } catch (err) {
    throw new Error(`Error fetching students and genders counts: ${err}`);
  }
};


// Fetch new students count and genders counts
export const newStudentsAndGendersCounts = async () => {
  try {
    // Db connection (ensure this is truly async if needed here)
    await connectToDb("accounts");

    // Active session
    const activeSession = await AcademicYear.findOne({ is_active: true });
    if (!activeSession) throw new Error("No active session found");

    // Single aggregation to compute all counts
    const counts = await AdmittedStudent.aggregate([
      {
        $match: {
          session: activeSession.year_name,
          "student.is_active": true,
        },
      },
      {
        $facet: {
          // All active students (new students only)
          allStudents: [
            { $match: { "student.is_new": true } },
            { $count: "total" },
          ],
          // Group by gender and is_new
          byGenderAndNew: [
            {
              $group: {
                _id: {
                  gender: "$student.gender",
                  isNew: "$student.is_new",
                },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    // Extract results
    const allStudentsCount = counts[0]?.allStudents[0]?.total || 0;
    const genderNewCounts = counts[0]?.byGenderAndNew || [];

    const boysCount = genderNewCounts.find(g => g._id.gender === "Male" && g._id.isNew)?.count || 0;
    const girlsCount = genderNewCounts.find(g => g._id.gender === "Female" && g._id.isNew)?.count || 0;
    const previousYearBoys = genderNewCounts.find(g => g._id.gender === "Male" && !g._id.isNew)?.count || 0;
    const previousYearGirls = genderNewCounts.find(g => g._id.gender === "Female" && !g._id.isNew)?.count || 0;

    // Return
    return {
      all_students_count: allStudentsCount,
      boys_count: boysCount,
      girls_count: girlsCount,
      previous_boys_count: previousYearBoys,
      previous_girls_count: previousYearGirls,
    };
  } catch (err) {
    throw new Error(`Error fetching students and genders counts: ${err}`);
  }
};


// Fees dashboard defaulter students data
export const feesDashboardDefaulterStudentsData = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // CLasses
    const classes = await Class.find({ session: activeSession?.year_name });

    // Installments
    const installments = await Installment.find({
      session: activeSession?.year_name,
    });

    // Installments overdues
    const installmentsOverdues = installments
      ?.filter(
        (i: any) =>
          new Date() >
          new Date(`${i.due_date.day}-${i.due_date.month}-${i.due_date.year}`)
      )
      .map((i: any) => i.name);

    // Students
    const students = await AdmittedStudent.find(
      { session: activeSession?.year_name, "student.is_active": true },
      { affiliated_heads: 1 }
    );

    // Defaulter students
    const defaulterStudents = students?.filter(
      (s: any) =>
        s?.affiliated_heads.heads?.filter(
          (h: any) =>
            h?.amounts?.filter(
              (a: any) =>
                installmentsOverdues.includes(a.name) &&
                Number(a.last_rec_amount) + Number(a.conc_amount) <
                  Number(a.value)
            ).length
        ).length > 0
    );

    // Total students count
    const totalStudentsCount = students.length;

    // Classes and defaulter
    const classesNames = classes.map((c: any) => c.class_name);

    // Classes number of defaulters
    const classesNumberOfDefaulters = classesNames.map(
      (c: any) =>
        defaulterStudents?.filter((s: any) => s.student.class === c).length
    );

    // Defaulter amount
    const defaulterAmount = totalNumberGenerator(
      defaulterStudents.map((s: any) =>
        totalNumberGenerator(
          s.affiliated_heads.heads.map((h: any) =>
            totalNumberGenerator(
              h.amounts
                ?.filter((a: any) => installmentsOverdues.includes(a.name))
                .map(
                  (a: any) =>
                    Number(a.value) - Number(a.last_rec_amount + a.conc_amount)
                )
            )
          )
        )
      )
    );

    // Return
    return {
      defaulter_students_count: defaulterStudents.length,
      total_students_count: totalStudentsCount,
      classes_names: classesNames,
      classes_number_of_defaulters: classesNumberOfDefaulters,
      defaulter_amount: defaulterAmount,
    };
  } catch (err) {
    throw new Error(
      `Error fetching fee dashboard defaulter students data: ${err}`
    );
  }
};

// Admission dashboard students religions data
export const admissionDashboardStudentsReligionsData = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // All students
    const allStudents = await AdmittedStudent.countDocuments({
      session: activeSession?.year_name,
      "student.is_active": true,
    });

    // Hindu students
    const hinduStudents = await AdmittedStudent.countDocuments({
      session: activeSession?.year_name,
      "student.religion": "Hinduism",
      "student.is_active": true,
    });

    // Christian students
    const christianStudents = await AdmittedStudent.countDocuments({
      session: activeSession?.year_name,
      "student.religion": "Christianity",
      "student.is_active": true,
    });

    // Muslim students
    const muslimStudents = await AdmittedStudent.countDocuments({
      session: activeSession?.year_name,
      "student.religion": "Islam",
      "student.is_active": true,
    });

    // Jewish students
    const jewishStudents = await AdmittedStudent.countDocuments({
      session: activeSession?.year_name,
      "student.religion": "Judaism",
      "student.is_active": true,
    });

    // Return
    return {
      all_students_count: allStudents,
      hindu_students_count: hinduStudents,
      christian_students_count: christianStudents,
      muslim_students_count: muslimStudents,
      jewish_students_count: jewishStudents,
    };
  } catch (err) {
    throw new Error(
      `Error fetching admission dashboard students religions data: ${err}`
    );
  }
};

// All students count
export const fetchAllStudentsCount = async () => {
  try {
    // Db connection
    connectToDb("accounts");

    // Acive session
    const activeSession = await AcademicYear.findOne({ is_active: true });

    // All students
    const allStudentsCount = await AdmittedStudent.countDocuments({
      session: activeSession?.year_name,
    });

    // Return
    return allStudentsCount;
  } catch (err) {
    throw new Error(`Error fetching all students count: ${err}`);
  }
};

// Registration report filter props
interface RegistrationReportFilterProps {
  session: String;
  date_from: Date;
  date_to: Date;
  class_name: String;
  user: String;
  mode: String;
}
// Registration report filter
export const registrationReportFilter = async ({
  session,
  date_from,
  date_to,
  class_name,
  user,
  mode,
}: RegistrationReportFilterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Students
    const students = await Student.find({ session });

    // Filtered students
    const filteredStudents = students
      // Dates filter
      .filter(
        (s: any) =>
          moment(s?.student?.date).format("DD-MM-YYYY") >=
            moment(date_from).format("DD-MM-YYYY") &&
          moment(s?.student?.date).format("DD-MM-YYYY") <=
            moment(date_to).format("DD-MM-YYYY")
      )
      // Class filter
      .filter((s: any) =>
        class_name === "All Classes" ? s : s?.student?.class === class_name
      )
      // User filter
      .filter((s: any) => s)
      // Mode filter
      .filter((s: any) =>
        mode === "Both"
          ? s
          : mode === "Online"
          ? s?.student?.is_online
          : !s?.student?.is_online
      );

    // Return
    return filteredStudents;
  } catch (err) {
    throw new Error(`Error filtering student details: ${err}`);
  }
};

// Admission report filter props
interface AdmissionReportFilterProps {
  session: String;
  school: String;
  class_name: String;
  stream: String;
  subject: String;
  date_from: Date;
  date_to: Date;
}
// Admission report filter
export const AdmissionReportFilter = async ({
  session,
  school,
  class_name,
  stream,
  subject,
  date_from,
  date_to,
}: AdmissionReportFilterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Students
    const students = await AdmittedStudent.find({ session });

    // Filtered students
    const filteredStudents = students
      // Dates filter
      .filter(
        (s: any) =>
          moment(s?.student?.date).format("DD-MM-YYYY") >=
            moment(date_from).format("DD-MM-YYYY") &&
          moment(s?.student?.date).format("DD-MM-YYYY") <=
            moment(date_to).format("DD-MM-YYYY")
      )
      // School filter
      .filter((s: any) => s)
      // Class filter
      .filter((s: any) =>
        class_name === "All Classes" ? s : s?.student?.class === class_name
      )
      // Stream filter
      .filter((s: any) =>
        stream === "All Streams" ? s : s?.student?.stream === stream
      )
      // Subjects filter
      .filter((s: any) =>
        subject === "All Subjects" ? s : s?.student?.subjects.includes(subject)
      );

    // Return
    return filteredStudents;
  } catch (err) {
    throw new Error(`Error filtering student details: ${err}`);
  }
};

// Merit List report filter props
interface MeritListReportFilterProps {
  session: String;
  class_name: String;
}
// Merit List report filter
export const meritListReportFilter = async ({
  session,
  class_name,
}: MeritListReportFilterProps) => {
  try {
    // Db connection
    connectToDb("accounts");

    // Students
    const students = await Student.find({
      session,
      "student.is_up_for_admission": true,
    });

    // Filtered students
    const filteredStudents = students
      // Class filter
      .filter((s: any) =>
        class_name === "All Classes" ? s : s?.student?.class === class_name
      );

    // Return
    return filteredStudents;
  } catch (err) {
    throw new Error(`Error filtering student details: ${err}`);
  }
};
