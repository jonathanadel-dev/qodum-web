// Imports
import {AuthContext} from '@/context/AuthContext';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import {Check, ChevronDown, X} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {Select, SelectContent, SelectTrigger, SelectValue} from '@/components/ui/select';
import {createAdmissionStates, fetchAdmissionStates} from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import {fetchClassesNames, updateClassesAdmissionStates} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {createGuidelines, fetchGuidline, modifyGuidelines} from '@/lib/actions/admission/masterSettings/admissionGuidelines.actions';





// Main function
function FormCom() {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Guide lines
    const [guideLines, setGuideLines] = useState('');


    // Classes
    const [classes, setClasses] = useState([{}]);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Is guideline loading
    const [isGuidlineLoading, setIsGuidelineLoading] = useState(false);


    // Admission states
    const [admissionStates, setAdmissionStates] = useState({is_staff_admission_opened:false});


    // Toast
    const {toast} = useToast();


    // Change admission state
    const changeAdmissionState = async () => {
        setIsLoading(true);
        await updateClassesAdmissionStates({classes_states:classes});
        toast({title:'Updated successfully'});
        setIsLoading(false);
    };


    // Guidline save handler
    const guidelineSaveHandler = async () => {
        try {

            // Set is guideline loading to true
            setIsGuidelineLoading(true);


            // Modify guide lines
            await modifyGuidelines({guidelines:guideLines});


            // Toast
            toast({title:'Guidelines saved successfully'});


            // Set is guideline loading to false
            setIsGuidelineLoading(false);

        }catch(err){
            console.log(err);
        };
    };


    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Admission Open');
        setPermissions(grantedPermissions);
    }, [user]);
    useEffect(() => {
        setIsLoading(true);
        const fetcher = async () => {
            const statesRes = await fetchAdmissionStates();
            const classesRes = await fetchClassesNames();
            setClasses(classesRes);
            if(!statesRes){
                await createAdmissionStates().then(async () => {
                    const statesRes = await fetchAdmissionStates(); 
                    setAdmissionStates(statesRes);
                });
            }else{
                setAdmissionStates(statesRes);
            };

            const guidelinesRes = await fetchGuidline();
            if(guidelinesRes.status === 'failure'){
                await createGuidelines({guidelines:guideLines});
            }else{
                setGuideLines(guidelinesRes.guidelines);
            };
            setIsLoading(false);
        };
        fetcher();
    }, []);

    return (
        <div className='w-[90%] max-h-[90%] max-w-[1000px] flex flex-col items-center gap-10 sm:w-[80%]'>
            {permissions.modify && (
                <>

                    <div className='w-full flex flex-row items-end justify-center gap-6'>

                        {/* Class */}
                        <div className='flex-1'>
                            <p className='text-xs text-[#726E71]'>Allow Admission For:</p>
                            <Select
                                disabled={!permissions.read_only}
                            >
                                <SelectTrigger className='w-full h-8 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                    <SelectValue placeholder='Classes' className='text-xs' />
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className='flex flex-row'>
                                        <div
                                            onClick={() => setClasses(classes.map((c:any) => {
                                                return{
                                                    ...c,
                                                    is_admission_opened:true
                                                };
                                            }))}
                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                        >
                                            <Check size={12} />
                                            <p className='text-xs group-hover:underline'>All</p>
                                        </div>
                                        <div
                                            onClick={() => setClasses(classes.map((c:any) => {
                                                return{
                                                    ...c,
                                                    is_admission_opened:false
                                                };
                                            }))}
                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                        >
                                            <X size={12} />
                                            <p className='text-xs group-hover:underline'>Clear</p>
                                        </div>
                                    </div>
                                    <ul className=''>
                                        {classes.length < 1 ? (
                                            <p className='text-xs text-hash-color'>No classes yet</p>
                                        ) : // @ts-ignore
                                        !classes[0]?.class_name ? (
                                            <LoadingIcon />
                                        ) : classes.map((c:any) => (
                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]'>
                                                <Checkbox
                                                    className='rounded-[2px] text-hash-color'
                                                    checked={c?.is_admission_opened}
                                                    // @ts-ignore
                                                    onClick={() => {
                                                        if(c?.is_admission_opened){
                                                            c.is_admission_opened = false;
                                                            setClasses([...classes]);
                                                        }else{
                                                            c.is_admission_opened = true;
                                                            setClasses([...classes]);
                                                        };
                                                    }}
                                                />
                                                <p className='pl-[2px] text-xs'>{c.class_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </SelectContent>
                            </Select>

                        </div>


                        {/* Button */}
                        <span
                            className='flex items-center justify-center min-w-[100px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                    hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            onClick={changeAdmissionState}
                        >
                            {isLoading ? (
                                <LoadingIcon />
                            ) : 'Update'
                        }
                        </span>

                    </div>


                    {/* Enter Admission Guide Lines */}
                    <div className='w-full flex flex-col items-start gap-4'>
                        <div className='w-full flex flex-col items-start justify-center'>
                            <p className='basis-auto pr-[4px] text-start text-[11px] text-[#726E71] sm:basis-[35%]'>Enter Admission Guide Lines</p>
                            <div className='w-full flex flex-col items-start gap-4 sm:basis-[65%]'>
                                <Textarea
                                    rows={4}
                                    value={guideLines}
                                    onChange={(e:any) => setGuideLines(e.target.value)}
                                    className='flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                />
                            </div>
                        </div>

                        {isGuidlineLoading ? (
                            <LoadingIcon />
                        ) : (
                            <span
                                className='flex items-center justify-center min-w-[150px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                onClick={guidelineSaveHandler}
                            >
                                Save
                            </span>
                        )}
                    </div>

                </>
            )}

        </div>
    )
}





// Export
export default FormCom;