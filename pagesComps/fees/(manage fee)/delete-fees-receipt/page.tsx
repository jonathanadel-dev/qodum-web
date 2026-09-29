'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import FormCom from '@/components/modules/fees/manageFee/deleteFeesReceipt/FormCom';
import ViewCom from '@/components/modules/fees/manageFee/deleteFeesReceipt/ViewCom';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchAdmittedStudents} from '@/lib/actions/admission/admission/admittedStudent.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';





// Main function
const page = () => {


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Is view opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Sections
    const [sections, setSections] = useState([{}]);


    // Students
    const [students, setStudents] = useState([{}]);


    // Selected student
    const [selectedStudent, setSelectedStudent] = useState<any>({
        id:'',
        image:'',
        name:'',
        address:'',
        father_name:'',
        mother_name:'',
        contact_no:'',
        admission_no:'',
        bill_no:'',
        class:'',
        payments:[],
        affiliated_heads:{
            group_name:'',
            heads:[]
        }
    });


    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const classesRes = await fetchClasses();
            const sectionsRes = await fetchSections();
            const studentsRes = await fetchAdmittedStudents();
            setClasses(classesRes);
            setSections(sectionsRes);
            setStudents(studentsRes);
        };
        fetcher();
    }, []);


    return (
        <div className='h-full flex flex-col items-center justify-start bg-white'>
            {isLoading ? (
                <LoadingIcon />
            ) : isViewOpened ? (
                <ViewCom
                    students={students}
                    setIsViewOpened={setIsViewOpened}
                    setSelectedStudent={setSelectedStudent}
                />
            ) : (
                <FormCom
                    classes={classes}
                    sections={sections}
                    selectedStudent={selectedStudent}
                    setSelectedStudent={setSelectedStudent}
                    setIsViewOpened={setIsViewOpened}
                    students={students}
                />
            )}
        </div>
    );
};





// Export
export default page;