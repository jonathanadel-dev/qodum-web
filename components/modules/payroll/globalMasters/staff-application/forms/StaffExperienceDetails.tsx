// Imports
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Check, ChevronDown, Trash, X} from 'lucide-react';
import {FormControl, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {fetchSubjects} from '@/lib/actions/admission/globalMasters/subject.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import LoadingIcon from '@/components/shared/LoadingIcon';





// Main function
const StaffExperienceDetails = ({experienceDetails, setExperienceDetails, departments, designations}:any) => {

    // Subjects
    const [subjects, setSubjects] = useState([]);


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const subjectsRes = await fetchSubjects();
            setSubjects(subjectsRes);
        };
        fetcher();
    }, []);

    return (
        <div className='flex flex-col gap-4 px-4 pt-10'>
            <h2>Details of Experience:</h2>
            <div className='flex flex-col justify-center w-full h-full gap-4 pt-6 overflow-scroll custom-sidebar-scrollbar'>

                {experienceDetails.map((d:any) => (
                    <div className='min-w-[1500px] h-10 flex flex-row gap-2'>

                        {/* Intuition Name */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center'>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Intuition Name</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.intuition_name}
                                            onChange={(e:any) => {
                                                experienceDetails[experienceDetails.indexOf(d)].intuition_name = e.target.value;
                                                setExperienceDetails([...experienceDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Department */}
                        <div className='w-full h-8 flex flex-col items-start justify-center'>
                            <p className='basis-auto pr-2 text-xs text-end text-[#726E71] sm:basis-[30%]'>Department</p>
                            <div className='relative h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                <Select
                                    value={d.department}
                                    onValueChange={(v:any) => {
                                        experienceDetails[experienceDetails.indexOf(d)].department = v;
                                        setExperienceDetails([...experienceDetails]);
                                    }}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments?.length < 1 ? (
                                            <p>No departments</p>
                                            // @ts-ignore
                                        ) : !departments[0]?.department ? (
                                            <LoadingIcon />
                                        ) : departments?.map((item:any) => (
                                            <SelectItem value={item?.department} key={item?._id}>{item?.department}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {/* Designation */}
                        <div className='w-full h-8 flex flex-col items-start justify-center'>
                            <p className='basis-auto pr-2 text-xs text-end text-[#726E71] sm:basis-[30%]'>Designation</p>
                            <div className='relative h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                <Select
                                    value={d.designation}
                                    onValueChange={(v:any) => {
                                        experienceDetails[experienceDetails.indexOf(d)].designation = v;
                                        setExperienceDetails([...experienceDetails]);
                                    }}
                                >
                                    <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder='Please Select' className='text-[11px]' />
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {designations?.length < 1 ? (
                                            <p>No designations</p>
                                            // @ts-ignore
                                        ) : !designations[0]?.designation ? (
                                            <LoadingIcon />
                                        ) : designations?.map((item:any) => (
                                            <SelectItem value={item?.designation} key={item?._id}>{item?.designation}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {/* Subjects */}
                        <div className='w-full h-8 flex flex-col items-start justify-center'>
                            <p className='basis-auto pr-2 text-xs text-end text-[#726E71] sm:basis-[30%]'>Subjects</p>
                            <div className='relative h-full w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                <Select>
                                    <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                        <SelectValue placeholder={experienceDetails[experienceDetails.indexOf(d)].subjects?.length < 1 ? 'Select subjects' : experienceDetails[experienceDetails.indexOf(d)].subjects?.length === 1 ? '1 subject selected' : `${experienceDetails[experienceDetails.indexOf(d)].subjects?.length} subjects selected`} className='text-xs'/>
                                        <ChevronDown className='h-4 w-4 opacity-50' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <div className='flex flex-row'>
                                            <div
                                                // @ts-ignore
                                                onClick={() => {
                                                    experienceDetails[experienceDetails.indexOf(d)].subjects = subjects.map((s:any) => s.subject_name);
                                                    setExperienceDetails([...experienceDetails]);
                                                }}
                                                className='group flex flex-row items-center justify-center cursor-pointer'
                                            >
                                                <Check size={12}/>
                                                <p className='text-xs group-hover:underline'>All</p>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    experienceDetails[experienceDetails.indexOf(d)].subjects = [];
                                                    setExperienceDetails([...experienceDetails]);
                                                }}
                                                className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                            >
                                                <X size={12}/>
                                                <p className='text-xs group-hover:underline'>Clear</p>
                                            </div>
                                        </div>
                                        <ul className='mt-2'>
                                            {subjects.map((subject:any) => (
                                                <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                    <Checkbox
                                                        className='rounded-[2px] text-hash-color font-semibold'
                                                        checked={experienceDetails[experienceDetails.indexOf(d)]?.subjects?.map((s:any) => s).includes(subject.subject_name)}
                                                        // @ts-ignore
                                                        onClick={() => {
                                                            experienceDetails[experienceDetails.indexOf(d)].subjects?.includes(subject.subject_name)
                                                                ? experienceDetails[experienceDetails.indexOf(d)].subjects = experienceDetails[experienceDetails.indexOf(d)].subjects.filter((s:any) => s !== subject.subject_name)
                                                                : experienceDetails[experienceDetails.indexOf(d)].subjects = [...experienceDetails[experienceDetails.indexOf(d)].subjects, subject.subject_name]
                                                            setExperienceDetails([...experienceDetails]);
                                                        }}
                                                    />
                                                    <p className='text-xs font-semibold'>{subject.subject_name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {/* Role */}
                        <FormItem className='relative w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Role</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.role}
                                            onChange={(e:any) => {
                                                experienceDetails[experienceDetails.indexOf(d)].role = e.target.value;
                                                setExperienceDetails([...experienceDetails]);
                                            }}
                                            type='number'
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                        />
                                    </FormControl>
                                    <FormMessage className='absolute left-[35%] top-[90%] text-[11px]'/>
                                </div>
                            </div>
                        </FormItem>


                        {/* Total Experience */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Total Experience</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.total_experience}
                                            onChange={(e:any) => {
                                                experienceDetails[experienceDetails.indexOf(d)].total_experience = e.target.value;
                                                setExperienceDetails([...experienceDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Period */}
                        <FormItem className='w-full mt-2 lg:mt-0'>
                            <div className='w-full h-7 flex flex-col items-start justify-center '>
                                <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[35%]'>Period</FormLabel>
                                <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[65%]'>
                                    <FormControl>
                                        <Input
                                            value={d.period}
                                            onChange={(e:any) => {
                                                experienceDetails[experienceDetails.indexOf(d)].period = e.target.value;
                                                setExperienceDetails([...experienceDetails]);
                                            }}
                                            className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                        />
                                    </FormControl>
                                    <FormMessage className='mt-[-20px] text-[11px]' />
                                </div>
                            </div>
                        </FormItem>


                        {/* Remove button */}
                        <span
                            onClick={() => {
                                setExperienceDetails(experienceDetails.filter((s:any) => s !== d))
                            }}
                            className='flex items-center justify-center px-2 py-2 text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white cursor-pointer
                                    hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b]'
                        >
                            <Trash size={15} />
                        </span>

                    </div>
                ))}

                <div className='flex justify-center'>
                    <span
                        onClick={() => {
                            setExperienceDetails([
                                ...experienceDetails,
                                {
                                    intuition_name:'',
                                    department:'',
                                    designation:'',
                                    subjects:[],
                                    role:'',
                                    total_experience:'',
                                    period:''
                                }
                            ])
                        }}
                        className='text-lg px-3 py-1 text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] rounded-full transition border-[1px] border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        +
                    </span>
                </div>

            </div>
        </div>
    );
};





// Export
export default StaffExperienceDetails;