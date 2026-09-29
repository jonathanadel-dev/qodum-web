// Imports
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {ChevronDown, ChevronsUpDown} from 'lucide-react';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {fetchHouses} from '@/lib/actions/admission/globalMasters/house.actions';
import {fetchStreams} from '@/lib/actions/admission/globalMasters/stream.actions';
import {fetchReligions} from '@/lib/actions/admission/globalMasters/religion.actions';
import {fetchCategories} from '@/lib/actions/admission/globalMasters/category.actions';
import {Command, CommandEmpty, CommandItem, CommandList} from '@/components/ui/command';
import {fetchBoards} from '@/lib/actions/fees/globalMasters/defineSchool/board.actions';
import {fetchTransportMediums} from '@/lib/actions/fees/transport/transportMedium.actions';
import {fetchTcCasts} from '@/lib/actions/admission/globalMasters/defineTcDetails/tcCaste.actions';
import {fetchOptionalSubjects} from '@/lib/actions/admission/globalMasters/optionalSubject.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';





// Main Function
const StudentsList = ({students, form, setStudents}: any) => {

    // Date states
    const [date, setDate] = useState(moment());


    // Clicked date student
    const [clickedDateStudent, setClickedDateStudent] = useState({});


    // Changing value
    let input;
    let values;
    let dropdownContent = [];
    switch (form.getValues().field) {
        case 'Admission No.':
            values = students.map((s:any) => s.student.adm_no);
            input = 'input';
            break;
        case 'Student Name':
            values = students.map((s:any) => s.student.name);
            input = 'input';
            break;
        case 'Student DOB':
            values = students.map((s:any) => moment(s.student.dob));
            input = 'date';
            break;
        case 'Student DOA':
            values = students.map((s:any) => moment(s.student.doa));
            input = 'date';
            break;
        case 'Student DOJ':
            values = students.map((s:any) => moment(s.student.doj));
            input = 'date';
            break;
        case 'Student Address':
            values = students.map((s:any) => s.student.h_no_and_streets);
            input = 'input';
            break;
        case 'Student Contact':
            values = students.map((s:any) => s.student.contact_person_name);
            input = 'input';
            break;
        case 'Blood Group':
            values = students.map((s:any) => s.student.blood_group);
            input = 'dropdown';
            dropdownContent = ['NA'];
            break;
        case 'Religion':
            values = students.map((s:any) => s.student.religion);
            input = 'dropdown';
            const religionFetcher = async () => {
                const religions = await fetchReligions();
                const names = religions.map((r:any) => r.religion_name);
                dropdownContent = names;
            };
            religionFetcher();
            break;
        case 'Nationality':
            values = students.map((s:any) => s.student.nationality);
            input = 'dropdown';
            dropdownContent = ['Indian', 'British'];
            break;
        case 'Gender':
            values = students.map((s:any) => s.student.gender);
            input = 'dropdown';
            dropdownContent = ['Male', 'Female'];
            break;
        case 'Active':
            values = students.map((s:any) => s.student.is_active);
            input = 'boolean';
            break;
        case 'Student Email':
            values = students.map((s:any) => s.student.email);
            input = 'input';
            break;
        case 'Contact Person Name':
            values = students.map((s:any) => s.student.contact_person_name);
            input = 'input';
            break;
        case 'Contact Person Mobile':
            values = students.map((s:any) => s.student.contact_person_mobile);
            input = 'input';
            break;
        case 'Contact Email':
            values = students.map((s:any) => s.student.contact_person_email);
            input = 'input';
            break;
        case 'Category':
            values = students.map((s:any) => s.student.category);
            input = 'dropdown';
            const categoryFetcher = async () => {
                const res = await fetchCategories();
                const names = res.map((c:any) => c.category_name);
                dropdownContent = names;
            };
            categoryFetcher();
            break;
        case 'Is New':
            values = students.map((s:any) => s.student.is_new);
            input = 'boolean';
            break;
        case 'Cast':
            values = students.map((s:any) => s.student.caste);
            input = 'dropdown';
            const casteFetcher = async () => {
                const res = await fetchTcCasts();
                const names = res.map((t:any) => t.caste_name);
                dropdownContent = names;
            };
            casteFetcher();
            break;
        case 'EWS':
            values = students.map((s:any) => s.student.is_ews);
            input = 'boolean';
            break;
        case 'General Description':
            values = students.map((s:any) => s.others.student_other_details.general_description);
            input = 'input';
            break;
        case 'Previous School':
            values = students.map((s:any) => s.others.previous_school_details.school_name);
            input = 'input';
            break;
        case 'Previous School DOL':
            values = students.map((s:any) => s.others.previous_school_details.passing_year);
            input = 'input';
            break;
        case 'Medical History':
            values = students.map((s:any) => s.others.student_other_details.medical_history);
            input = 'dropdown';
            dropdownContent = ['Yes', 'No'];
            break;
        case 'Emergency Contact Person Name':
            values = students.map((s:any) => s.student.contact_person_name);
            input = 'input';
            break;
        case 'Emergency Contact Person Mobile':
            values = students.map((s:any) => s.student.contact_person_mobile);
            input = 'input';
            break;
        case 'Emergency Contact Person Phone':
            // Not sure value
            values = students.map((s:any) => s.student.contact_person_mobile);
            input = 'input';
            break;
        case 'Emergency Contact Person Address':
            // Not sure value
            values = students.map((s:any) => s.student.h_no_and_streets);
            input = 'input';
            break;
        case 'Emergency Contact Person Relation':
            // Not sure value
            values = students.map((s:any) => s.student.contact_person_name);
            input = 'input';
            break;
        case 'Family Doctor Name':
            values = students.map((s:any) => s.others.student_other_details.family_doctor_name);
            input = 'input';
            break;
        case 'Family Doctor Phone':
            values = students.map((s:any) => s.others.student_other_details.family_doctor_phone);
            input = 'input';
            break;
        case 'Family Doctor Address':
            values = students.map((s:any) => s.others.student_other_details.family_doctor_address);
            input = 'input';
            break;
        case 'Father Name':
            values = students.map((s:any) => s.parents.father.father_name);
            input = 'input';
            break;
        case 'Father Designation':
            values = students.map((s:any) => s.parents.father.designation);
            input = 'dropdown';
            dropdownContent = ['N.A.', 'Principal', 'Teacher'];
            break;
        case 'Father Phone':
            values = students.map((s:any) => s.parents.father.phone);
            input = 'input';
            break;
        case 'Father DOB':
            values = students.map((s:any) => s.parents.father.dob);
            input = 'date';
            break;
        case 'Father R Address':
            values = students.map((s:any) => s.parents.father.residence_address);
            input = 'input';
            break;
        case 'Father Office Address':
            values = students.map((s:any) => s.parents.father.office_address);
            input = 'input';
            break;
        case 'Father Email 1':
            values = students.map((s:any) => s.parents.father.email);
            input = 'input';
            break;
        case 'Father Email 2':
            values = students.map((s:any) => s.parents.father.alternate_email);
            input = 'input';
            break;
        case 'Father Mobile':
            values = students.map((s:any) => s.parents.father.mobile);
            input = 'input';
            break;
        case 'Father Profession':
            values = students.map((s:any) => s.parents.father.profession);
            input = 'dropdown';
            dropdownContent = ['N.A.'];
            break;
        case 'Father Company Name':
            values = students.map((s:any) => s.parents.father.company_name);
            input = 'input';
            break;
        case 'Father Business Details':
            values = students.map((s:any) => s.parents.father.business_details);
            input = 'input';
            break;
        case 'Father Professional':
            // Not sure value
            values = students.map((s:any) => s.parents.father.profession);
            input = 'dropdown';
            dropdownContent = ['N.A.'];
            break;
        case 'Student Status':
            values = students.map((s:any) => s.student.student_status);
            input = 'dropdown';
            dropdownContent = ['Studying', 'TC', 'Left', 'Rusticate', 'Withdrawn', 'Repeater'];
            break;
        case 'Father Service In':
            values = students.map((s:any) => s.parents.father.service_in);
            input = 'input';
            break;
        case 'Father Office Phone':
            values = students.map((s:any) => s.parents.father.office_phone);
            input = 'input';
            break;
        case 'Father Office Mobile':
            values = students.map((s:any) => s.parents.father.office_mobile);
            input = 'input';
            break;
        case 'Father Office Extension':
            values = students.map((s:any) => s.parents.father.office_extension);
            input = 'input';
            break;
        case 'Father Office Email':
            values = students.map((s:any) => s.parents.father.office_email);
            input = 'input';
            break;
        case 'Father Office Website':
            values = students.map((s:any) => s.parents.father.office_website);
            input = 'input';
            break;
        case 'Mother Name':
            values = students.map((s:any) => s.parents.mother.mother_name);
            input = 'input';
            break;
        case 'Mother Designation':
            values = students.map((s:any) => s.parents.mother.designation);
            input = 'dropdown';
            dropdownContent = ['N.A.', 'Principal', 'Teacher'];
            break;
        case 'Mother Phone':
            values = students.map((s:any) => s.parents.mother.phone);
            input = 'input';
            break;
        case 'Mother DOB':
            values = students.map((s:any) => s.parents.mother.dob);
            input = 'date';
            break;
        case 'Mother R Address':
            values = students.map((s:any) => s.parents.mother.residence_address);
            input = 'input';
            break;
        case 'Mother Office Address':
            values = students.map((s:any) => s.parents.mother.office_address);
            input = 'input';
            break;
        case 'Mother Email 1':
            values = students.map((s:any) => s.parents.mother.email);
            input = 'input';
            break;
        case 'Mother Email 2':
            values = students.map((s:any) => s.parents.mother.alternate_email);
            input = 'input';
            break;
        case 'Mother Mobile':
            values = students.map((s:any) => s.parents.mother.mobile);
            input = 'input';
            break;
        case 'Mother Profession':
            values = students.map((s:any) => s.parents.mother.profession);
            input = 'dropdown';
            dropdownContent = ['N.A.'];
            break;
        case 'Mother Company Name':
            values = students.map((s:any) => s.parents.mother.company_name);
            input = 'input';
            break;
        case 'Mother Business Details':
            values = students.map((s:any) => s.parents.mother.business_details);
            input = 'input';
            break;
        case 'Mother Professional':
            // Not sure value
            values = students.map((s:any) => s.parents.mother.profession);
            input = 'dropdown';
            dropdownContent = ['N.A.'];
            break;
        case 'Mother Service In':
            values = students.map((s:any) => s.parents.mother.service_in);
            input = 'input';
            break;
        case 'Mother Office Phone':
            values = students.map((s:any) => s.parents.mother.office_phone);
            input = 'input';
            break;
        case 'Mother Office Mobile':
            values = students.map((s:any) => s.parents.mother.office_mobile);
            input = 'input';
            break;
        case 'Mother Office Extension':
            values = students.map((s:any) => s.parents.mother.office_extension);
            input = 'input';
            break;
        case 'Mother Office Email':
            values = students.map((s:any) => s.parents.mother.office_email);
            input = 'input';
            break;
        case 'Mother Office Website':
            values = students.map((s:any) => s.parents.mother.office_website);
            input = 'input';
            break;
        case 'Anniversary Date':
            values = students.map((s:any) => s.parents.mother.anniversary);
            input = 'date';
            break;
        case 'Father Income':
            values = students.map((s:any) => s.parents.father.annual_income);
            input = 'input';
            break;
        case 'Mother Income':
            values = students.map((s:any) => s.parents.mother.annual_income);
            input = 'input';
            break;
        case 'Board Roll No.':
            values = students.map((s:any) => s.student.roll_no);
            input = 'input';
            break;
        case 'Secondary Conctact No.':
            values = students.map((s:any) => s.student.secondary_contact_no);
            input = 'input';
            break;
        case 'Bill No.':
            values = students.map((s:any) => s.student.bill_no);
            input = 'input';
            break;
        case 'House':
            values = students.map((s:any) => s.student.house);
            input = 'dropdown';
            const housesFetcher = async () => {
                const res = await fetchHouses();
                const names = res.map((h:any) => h.house_name);
                dropdownContent = names;
            };
            housesFetcher();
            break;
        case 'Transport':
            values = students.map((s:any) => s.student.transport);
            input = 'dropdown';
            const transportFetcher = async () => {
                const res = await fetchTransportMediums();
                const names = res.map((t:any) => t.transport_medium);
                dropdownContent = names;
            };
            transportFetcher();
            break;
        case 'Roll No.':
            values = students.map((s:any) => s.student.roll_no);
            input = 'input';
            break;
        case 'Mother Middle Name':
            values = students.map((s:any) => s.parents.mother.middle_name);
            input = 'input';
            break;
        case 'Mother Last Name':
            values = students.map((s:any) => s.parents.mother.last_name);
            input = 'input';
            break;
        case 'Aadhar Card No.':
            values = students.map((s:any) => s.student.aadhar_card_no);
            input = 'input';
            break;
        case 'Stu Sec No.':
            // Not sure value
            values = students.map((s:any) => s.student.secondary_contact_no);
            input = 'input';
            break;
        case 'School Board':
            values = students.map((s:any) => s.student.board);
            input = 'dropdown';
            const boardsFetcher = async () => {
                const res = await fetchBoards();
                const names = res.map((b:any) => b.board_name);
                dropdownContent = names;
            };
            boardsFetcher();
            break;
        case 'Student Stream':
            values = students.map((s:any) => s.student.stream);
            input = 'dropdown';
            const streamsFetcher = async () => {
                const res = await fetchStreams();
                const names = res.map((s:any) => s.stream_name);
                dropdownContent = names;
            };
            streamsFetcher();
            break;
        case 'Optional Subject':
            values = students.map((s:any) => s.student.optional_subject);
            input = 'dropdown';
            const optionalSubjectsFetcher = async () => {
                const res = await fetchOptionalSubjects();
                const names = res.map((s:any) => s.subject_name);
                dropdownContent = names;
            };
            optionalSubjectsFetcher();
            break;
        case 'Is Minority':
            values = students.map((s:any) => s.student.is_minority);
            input = 'boolean';
            break;
        case 'Is Only Child':
            values = students.map((s:any) => s.student.is_only_child);
            input = 'boolean';
            break;
    };


    // Value change handler
    const valueChangeHandler = (s:any, v:any) => {
        switch (form.getValues().field) {
            case 'Admission No.':
                s.student.adm_no = v;
                break;
            case 'Student Name':
                s.student.name = v;
                break;
            case 'Student Address':
                s.student.h_no_and_streets = v;
                break;
            case 'Student Contact':
                s.student.contact_person_name = v;
                break;
            case 'Blood Group':
                s.student.blood_group = v;
                break;
            case 'Religion':
                s.student.religion = v;
                break;
            case 'Nationality':
                s.student.nationality = v;
                break;
            case 'Gender':
                s.student.gender = v;
                break;
            case 'Active':
                s.student.is_active = v;
                break;
            case 'Student Email':
                s.student.email = v;
                break;
            case 'Contact Person Name':
                s.student.contact_person_name = v;
                break;
            case 'Contact Person Mobile':
                s.student.contact_person_mobile = v;
                break;
            case 'Contact Email':
                s.student.contact_person_email = v;
                break;
            case 'Category':
                s.student.category = v;
                break;
            case 'Is New':
                s.student.is_new = v;
                break;
            case 'Cast':
                s.student.caste = v;
                break;
            case 'EWS':
                s.student.is_ews = v;
                break;
            case 'General Description':
                s.others.student_other_details.general_description = v;
                break;
            case 'Previous School':
                s.others.previous_school_details.school_name = v;
                break;
            case 'Previous School DOL':
                s.others.previous_school_details.passing_year = v;
                break;
            case 'Medical History':
                s.others.student_other_details.medical_history = v;
                break;
            case 'Emergency Contact Person Name':
                s.student.contact_person_name = v;
                break;
            case 'Emergency Contact Person Mobile':
                s.student.contact_person_mobile = v;
                break;
            case 'Emergency Contact Person Phone':
                // Not sure value
                s.student.contact_person_mobile = v;
                break;
            case 'Emergency Contact Person Address':
                // Not sure value
                s.student.h_no_and_streets = v;
                break;
            case 'Emergency Contact Person Relation':
                // Not sure value
                s.student.contact_person_name = v;
                break;
            case 'Family Doctor Name':
                s.others.student_other_details.family_doctor_name
                break;
            case 'Family Doctor Phone':
                s.others.student_other_details.family_doctor_phone = v;
                break;
            case 'Family Doctor Address':
                s.others.student_other_details.family_doctor_address = v;
                break;
            case 'Father Name':
                s.parents.father.father_name = v;
                break;
            case 'Father Designation':
                s.parents.father.designation = v;
                break;
            case 'Father Phone':
                s.parents.father.phone = v;
                break;
            case 'Father R Address':
                s.parents.father.residence_address = v;
                break;
            case 'Father Office Address':
                s.parents.father.office_address = v;
                break;
            case 'Father Email 1':
                s.parents.father.email = v;
                break;
            case 'Father Email 2':
                s.parents.father.alternate_email = v;
                break;
            case 'Father Mobile':
                s.parents.father.mobile = v;
                break;
            case 'Father Profession':
                s.parents.father.profession = v;
                break;
            case 'Father Company Name':
                s.parents.father.company_name = v;
                break;
            case 'Father Business Details':
                s.parents.father.business_details = v;
                break;
            case 'Father Professional':
                // Not sure value
                s.parents.father.profession = v;
                break;
            case 'Student Status':
                s.student.student_status = v;
                break;
            case 'Father Service In':
                s.parents.father.service_in = v;
                break;
            case 'Father Office Phone':
                s.parents.father.office_phone = v;
                break;
            case 'Father Office Mobile':
                s.parents.father.office_mobile = v;
                break;
            case 'Father Office Extension':
                s.parents.father.office_extension = v;
                break;
            case 'Father Office Email':
                s.parents.father.office_email = v;
                break;
            case 'Father Office Website':
                s.parents.father.office_website = v;
                break;
            case 'Mother Name':
                s.parents.mother.mother_name = v
                break;
            case 'Mother Designation':
                s.parents.mother.designation = v;
                break;
            case 'Mother Phone':
                s.parents.mother.phone = v;
                break;
            case 'Mother R Address':
                s.parents.mother.residence_address = v;
                break;
            case 'Mother Office Address':
                s.parents.mother.office_address = v;
                break;
            case 'Mother Email 1':
                s.parents.mother.email = v;
                break;
            case 'Mother Email 2':
                s.parents.mother.alternate_email = v;
                break;
            case 'Mother Mobile':
                s.parents.mother.mobile = v;
                break;
            case 'Mother Profession':
                s.parents.mother.profession = v;
                break;
            case 'Mother Company Name':
                s.parents.mother.company_name = v;
                break;
            case 'Mother Business Details':
                s.parents.mother.business_details = v;
                break;
            case 'Mother Professional':
                // Not sure value
                s.parents.mother.profession = v;
                break;
            case 'Mother Service In':
                s.parents.mother.service_in = v;
                break;
            case 'Mother Office Phone':
                s.parents.mother.office_phone = v;
                break;
            case 'Mother Office Mobile':
                s.parents.mother.office_mobile = v;
                break;
            case 'Mother Office Extension':
                s.parents.mother.office_extension = v;
                break;
            case 'Mother Office Email':
                s.parents.mother.office_email = v;
                break;
            case 'Mother Office Website':
                s.parents.mother.office_website = v;
                break;
            case 'Father Income':
                s.parents.father.annual_income = v;
                break;
            case 'Mother Income':
                s.parents.mother.annual_income = v;
                break;
            case 'Board Roll No.':
                s.student.roll_no = v;
                break;
            case 'Secondary Conctact No.':
                s.student.secondary_contact_no = v;
                break;
            case 'Bill No.':
                s.student.bill_no = v;
                break;
            case 'House':
                s.student.house = v;
                break;
            case 'Transport':
                s.student.transport = v;
                break;
            case 'Roll No.':
                s.student.roll_no = v;
                break;
            case 'Mother Middle Name':
                s.parents.mother.middle_name = v;
                break;
            case 'Mother Last Name':
                s.parents.mother.last_name = v;
                break;
            case 'Aadhar Card No.':
                s.student.aadhar_card_no = v;
                break;
            case 'Stu Sec No.':
                // Not sure value
                s.student.secondary_contact_no = v;
                break;
            case 'School Board':
                s.student.board = v;
                break;
            case 'Student Stream':
                s.student.stream = v;
                break;
            case 'Optional Subject':
                s.student.optional_subject = v;
                break;
            case 'Is Minority':
                s.student.is_minority = v;
                break;
            case 'Is Only Child':
                s.student.is_only_child = v;
                break;
        };
        setStudents([...students]);
    };


    // Use effect
    useEffect(() => {
        const s = students.filter((s:any) => s === clickedDateStudent)[0];
        if(s){
            switch (form.getValues().field){
                case 'Student DOB':
                    // @ts-ignore
                    s.student.dob = date?._d;
                    break;
                case 'Student DOA':
                    // @ts-ignore
                    s.student.doa = date?._d;
                    break;
                case 'Student DOJ':
                    // @ts-ignore
                    s.student.doj = date?._d;
                    break;
                case 'Father DOB':
                    // @ts-ignore
                    s.parents.father.dob = date?._d;
                    break;
                case 'Mother DOB':
                    // @ts-ignore
                    s.parents.mother.dob = date?._d;
                    break;
                case 'Anniversary Date':
                    // @ts-ignore
                    s.parents.mother.anniversary = date?._d;
                    break;
            };
        };
    }, [date]);

    return (
        <Command
            className='w-[100%] max-h-[90%] mt-4 flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8]'
        >

            {/* Header */}
            <div className='flex flex-row items-center justify-center  w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
                <h2>Students List</h2>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center bg-[#F1F1F1]'>


                {/* Heads */}
                <div className='w-full flex flex-col overflow-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[700px] flex flex-row text-[10px] bg-[#435680] border-b-[0.5px] border-[#ccc] text-white cursor-pointer sm:text-xs md:text-md'>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Adm No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Student's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Father's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                            Mother's Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[20%] flex flex-row items-center justify-between px-2'>
                            {form.getValues().field}
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                    <CommandList>
                        {students.map((student: any, index: number) => (
                            <CommandItem
                                key={index}
                                className={`w-full min-w-[700px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((students.indexOf(student) + 1) / 2) * 2 !== students.indexOf(student) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                            >
                                <li className='basis-[20%] flex flex-row items-center px-2 py-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.adm_no}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.student?.name}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.parents?.father?.father_name}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                    {student?.parents?.mother?.mother_name}
                                </li>
                                <li className='basis-[20%] flex-grow flex flex-row items-center px-2'>

                                    {input === 'input' && (
                                        <Input
                                            value={values[students.indexOf(student)]}
                                            onChange={(e:any) => valueChangeHandler(student, e.target.value)}
                                            className='h-[80%] flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    )}

                                    {input === 'date' && (
                                        <div className='relative w-full h-[80%] flex flex-col'>
                                            <div onClick={() => setClickedDateStudent(student)}>
                                                <MyDatePicker
                                                    setSelectedDate={setDate}
                                                    selectedDate={values[students.indexOf(student)]}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {input === 'dropdown' && (
                                        <Select
                                            value={values[students.indexOf(student)]}
                                            onValueChange={(v:any) => valueChangeHandler(student, v)}
                                        >
                                            <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                                <SelectValue placeholder='Please Select' className='text-[11px]' />
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {dropdownContent.length === 0 ? (
                                                    <p className='text-xs text-hash-color'>No items</p>
                                                ) : dropdownContent.map((i:any) => (
                                                    <SelectItem value={i} key={i}>{i}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {input === 'boolean' && (
                                        <div className='flex-1 flex items-center justify-center space-x-2'>
                                            <Switch
                                                id='is_enable'
                                                checked={values[students.indexOf(student)]}
                                                onClick={() => valueChangeHandler(student, !values[students.indexOf(student)])}
                                            />
                                        </div>
                                    )}

                            
                                </li>
                            </CommandItem>
                        ))}
                    </CommandList>
                    {students[0]?.student?.name !== undefined && <CommandEmpty>No results found</CommandEmpty>}
                </div>
            </div>
        </Command>
    );
};





// Export
export default StudentsList;