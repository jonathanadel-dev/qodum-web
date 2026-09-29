'use client';
// Imports
import {useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {fetchSections} from '@/lib/actions/fees/globalMasters/defineClassDetails/section.actions';
import FormCom from '@/components/modules/fees/feeMaster/defineAndAssignConcession/assignConcession/FormCom';
import ViewCom from '@/components/modules/fees/feeMaster/defineAndAssignConcession/assignConcession/ViewCom';
import {fetchAdmittedStudents, fetchStudentByAdmNo} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const page = () => {


    // Is view opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Is loading heads
    const [isLoadingHeads, setIsLoadingHeads] = useState(false);
    

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
        class:'',
        affiliated_heads:{
            group_name:'',
            heads:[]
        }
    });


    // Heads
    const [heads, setHeads] = useState<any>([]);


    // Total number generator
    const totalNumberGenerator = (array:any) => {
        let sum = 0;
        for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
        return sum;
    };


    // Show button click
    const showButtonClick = async () => {
        setIsLoadingHeads(true);
        const student = await fetchStudentByAdmNo({adm_no:selectedStudent.admission_no});
        setSelectedStudent({
            id:student._id,
            image:student.student.image,
            name:student.student.name,
            address:student.student.h_no_and_streets,
            father_name:student.parents.father.father_name,
            mother_name:student.parents.mother.mother_name,
            contact_no:student.student.contact_person_mobile,
            admission_no:student.student.adm_no,
            class:student.student.class,
            affiliated_heads:{
                group_name:student.affiliated_heads.group_name,
                heads:student?.affiliated_heads?.heads?.map((h:any) => {
                    return {
                        ...h,
                        amounts:h?.amounts?.map((a:any) => {
                            const conc_amount = a.conc_amount ? Number(a.conc_amount) : 0;
                            const last_rec_amount = a.last_rec_amount ? Number(a.last_rec_amount) : 0;
                            return {
                                ...a,
                                name:a.name,
                                value:Number(a.value),
                                conc_amount:conc_amount,
                                last_rec_amount:last_rec_amount,
                                payable_amount:Number(a.value) - (last_rec_amount + conc_amount),
                                paid_amount:Number(a.value) - (last_rec_amount + conc_amount)
                            };
                        })
                    };
                })
            }
        });
        setIsLoadingHeads(false);
    };


    // Use effect
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
                    students={students}
                    selectedStudent={selectedStudent}
                    setSelectedStudent={setSelectedStudent}
                    setIsViewOpened={setIsViewOpened}
                    setIsLoading={setIsLoading}
                    showButtonClick={showButtonClick}
                    heads={heads}
                    setHeads={setHeads}
                    totalNumberGenerator={totalNumberGenerator}
                    isLoadingHeads={isLoadingHeads}
                />
            )}
        </div>
    );
};





// Export
export default page;