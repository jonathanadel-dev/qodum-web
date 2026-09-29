'use client';
// Imports
import axios from 'axios';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';
import {ChevronDown, SendHorizonal} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import { uploadClassNoticeImage } from '@/lib/actions/image.actions';
import {Select, SelectContent, SelectTrigger, SelectValue} from '@/components/ui/select';
import {fetchClasses} from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';





// Main function
const page = () => {

    // Toast
    const {toast} = useToast();


    // Is schedule send
    const [isScheduleSend, setIsScheduleSend] = useState(false);


    // Is submit loading
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);


    // File
    const [file, setFile] = useState(null);


    // Image source (For image preview)
    const [imageSrc, setImageSrc] = useState('');


    // Schedule date
    const [scheduleDate, setScheduleDate] = useState(moment());


    // Errors
    const [errors, setErrors] = useState({
        classes:'',
        title:'',
        message:'',
        schedule_date:''
    });


    // Classes
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);


    // Title
    const [title, setTitle] = useState('');


    // Message
    const [message, setMessage] = useState('');


    // Classes dropdown
    const classesDropdown = (
        <div style={{width:'100%', paddingTop:6, paddingBottom:6}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingBottom:4, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                <Checkbox
                    className='rounded-[2px] border-hash-color'
                    checked={classes.length === selectedClasses.length}
                    onClick={() => selectedClasses.length === classes.length ? setSelectedClasses([]) : setSelectedClasses(classes)}
                />
                <p style={{fontWeight:'600', fontSize:12, marginLeft:4}}>Select All</p>
            </div>


            {/* Classes */}
            {classes?.length > 0 && (
                <>
                    {classes?.map((r) => (
                        <div
                            key={r.class_name}
                            style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, marginLeft:10, paddingLeft:4, paddingTop:4, paddingBottom:4, borderLeftColor:'#0094DA', borderLeftWidth:1, borderBottomWidth:classes.indexOf(r) === classes.length - 1 ? 0 : 1, borderBottomColor:'#ccc'}}
                        >
                            <Checkbox
                                className='rounded-[2px] border-hash-color'
                                checked={selectedClasses.map((sr:any) => sr.class_name).includes(r.class_name)}
                                onClick={() => selectedClasses.map((sr:any) => sr.class_name).includes(r.class_name)
                                    ? setSelectedClasses(selectedClasses.filter((sr:any) => sr.class_name !== r.class_name))
                                    : setSelectedClasses([...selectedClasses, r])}
                            />
                            <p style={{fontWeight:'600', fontSize:12}}>{r.class_name}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );


    // Handle on change
    const handleOnChange = (e:any) => {
        console.log(e);
        setFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = function(onLoadEvent) {
            // @ts-ignore
            setImageSrc(onLoadEvent.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };


    // Send handler
    const sendHandler = async () => {
        try {

            // Setting is loading to true
            setIsSubmitLoading(true);


            // Empty validation
            if(selectedClasses.length === 0 || !title || !message || (isScheduleSend && scheduleDate.isBefore(moment()))){
                setErrors({
                    classes:selectedClasses.length === 0 ? 'Please select at least one recipient' : '',
                    title:!title ? 'Please enter title' : '',
                    message:!message ? 'Please enter message' : '',
                    schedule_date:(isScheduleSend && scheduleDate.isBefore(moment())) ? 'Please select a future date' : ''
                });
                setIsSubmitLoading(false);
                return;
            };


            // Random number
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;


            // Upload image
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadClassNoticeImage({data:formData, class_notice_id:randomNumber});
            };

        
            // Sending class notice
            if(isScheduleSend){
                selectedClasses.map(async c => {
                    const params = {
                        title,
                        body:message,
                        topic:c.class_name.replace(/\s+/g, ''),
                        type:'class_notice',
                        created_by:'admin',
                        class_notice_id:randomNumber,
                        // @ts-ignore
                        schedule_date:scheduleDate?._d,
                        img:imageSrc ? `https://qodum.s3.amazonaws.com/class-notices/${randomNumber}` : ''
                    };
                    const notificationLink = `${process.env.NEXT_PUBLIC_API_URL}/notifications/schedule-class-notice`;
                    await axios.post(notificationLink, params);
                });
            }else{
                selectedClasses.map(async c => {
                    const params = {
                        title,
                        body:message,
                        topic:c.class_name.replace(/\s+/g, ''),
                        type:'class_notice',
                        created_by:'admin',
                        class_notice_id:randomNumber,
                        img:imageSrc ? `https://qodum.s3.amazonaws.com/class-notices/${randomNumber}` : ''
                    };
                    const notificationLink = `${process.env.NEXT_PUBLIC_API_URL}/notifications/send-class-notice`;
                    await axios.post(notificationLink, params);
                });
            };


            // Reseting
            toast({title:'Sent Successfully!'});
            setSelectedClasses([]);
            setTitle('');
            setMessage('');
            setImageSrc('');
            setFile(null);
            setScheduleDate(moment());


            // Setting is loading to false
            setIsSubmitLoading(false);
         
        }catch (err){
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {

            // Classes
            const classesRes = await fetchClasses();
            setClasses(classesRes);

        };
        fetcher();
    }, []);
    useEffect(() => {
        if(classes.length > 0){
            setErrors({...errors, classes:''});
        };
    }, [selectedClasses]);
    useEffect(() => {
        if(scheduleDate.isAfter(moment()) || scheduleDate.isSame(moment())){
            setErrors({...errors, schedule_date:''});
        };
    }, [scheduleDate]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-hidden'>
            <div className='w-[90%] max-w-[500px] flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
                <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Send Class Notice</h2>     
                <div className='relative w-full flex flex-col pt-4 items-center px-2 sm:px-4 gap-2'>

                    {/* Schedule Date */}
                    {isScheduleSend && (
                        <div className='relative w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                            <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Schedule Date</p>
                            <div className='w-full sm:basis-[70%]'>
                                <MyDatePicker
                                    selectedDate={scheduleDate}
                                    setSelectedDate={setScheduleDate}
                                />
                            </div>
                            {errors.schedule_date && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.schedule_date}</p>}
                        </div>
                    )}


                    {/* Classes */}
                    <div className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:mt-2'>
                        <Select>
                            <p className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>Class</p>
                            <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                                <SelectValue
                                    placeholder={selectedClasses.length === 0 ? 'Select Classes' :selectedClasses.length === 1 ? '1 Selected Class' : `${selectedClasses.length} Classes Selected`}
                                    className='text-xs'
                                />
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </SelectTrigger>
                            <SelectContent>
                                {classesDropdown}
                            </SelectContent>
                        </Select>
                        {errors.classes && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.classes}</p>}
                    </div>


                    {/* Title */}
                    <div className='relative w-full h-10 flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                        <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Title</p>
                        <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                            <Input
                                value={title}
                                onChange={(v:any) => {setErrors({...errors, title:''});setTitle(v.target.value)}}
                                className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                            />
                        </div>
                        {errors.title && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.title}</p>}
                    </div>


                    {/* Message */}
                    <div className='relative w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                        <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Message</p>
                        <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                            <Textarea
                                value={message}
                                onChange={(v:any) => {setErrors({...errors, message:''});setMessage(v.target.value)}}
                                className='flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                            />
                        </div>
                        {errors.message && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.message}</p>}
                    </div>


                    {/* Image */}
                    <div className='mb-2 flex items-center justify-center cursor-pointer rounded-[5px] transition hover:opacity-90'>
                        <label
                            // @ts-ignore
                            for='image'
                            className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'
                        >
                            {imageSrc !== '' ? (
                                <img
                                    alt="Student's image"
                                    src={imageSrc}
                                    className='w-[125px] h-[125px] rounded-[5px]'
                                />
                            ) : (
                                <p style={{color:'#3D67B0'}}>Select Image</p>
                            )}
                        </label>
                        <input
                            type='file'
                            accept='image/*'
                            name='image'
                            id='image'
                            className='hidden'
                            onChange={(e:any) => {handleOnChange(e)}}
                        />
                    </div>


                    {/* Send button */}
                    <div className='flex flex-row items-center justify-center pb-4 mt-10 gap-2 ml-0'>
                        <div
                            className='flex justify-between gap-[1px] h-8'
                        >
                            <p
                                onClick={sendHandler}  
                                className='h-full flex items-center justify-center px-[8px] pr-2 border-r-[0.5px] border-r-[#ccc] text-xs text-white bg-gradient-to-r bg-[#3D67B0] transition border-[1px] border-white cursor-pointer
                                    hover:border-main-color hover:bg-[#e7f0f7] hover:text-main-color'
                                style={{borderTopLeftRadius:30, borderBottomLeftRadius:30}}
                            >
                                {isSubmitLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    'Send'
                                )}
                            </p>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className='h-full flex items-center justify-center px-[8px] border-r-[0.5px] border-r-[#ccc] text-xs text-white bg-gradient-to-r bg-[#3D67B0] transition border-[1px] border-white cursor-pointer
                                    hover:border-main-color hover:bg-[#e7f0f7] hover:text-main-color'
                                    style={{borderTopRightRadius:30, borderBottomRightRadius:30}}
                                >
                                    <ChevronDown size={20}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem
                                        className='bg-[#fff] gap-2'
                                        onClick={() => setIsScheduleSend(true)}
                                    >
                                        <SendHorizonal color='#3D67B0' size={20}/>
                                        <p className='text-xs'>Schedule Send</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};





// Export
export default page;