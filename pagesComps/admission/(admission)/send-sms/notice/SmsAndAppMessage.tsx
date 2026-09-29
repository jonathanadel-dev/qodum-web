// Imports
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {useToast} from '@/components/ui/use-toast';
import {ChevronDown, SendHorizonal} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import {uploadNoticeImage} from '@/lib/actions/image.actions';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {fetchSmsTemplates} from '@/lib/actions/fees/globalMasters/smsTemplate.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import { fetchClassesNames } from '@/lib/actions/fees/globalMasters/defineClassDetails/class.actions';
import { fetchDepartments } from '@/lib/actions/payroll/globalMasters/department.actions';






// Main function
const SmsAndAppMessage = () => {

    // Toast
    const {toast} = useToast();


    // Is schedule send
    const [isScheduleSend, setIsScheduleSend] = useState(false);


    // Schedule date
    const [scheduleDate, setScheduleDate] = useState(moment());


    // Is submit loading
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);


    // File
    const [file, setFile] = useState(null);


    // Image source (For image preview)
    const [imageSrc, setImageSrc] = useState('');


    // Errors
    const [errors, setErrors] = useState({
        selected_sms_template:'',
        selected_recipients:'',
        title:'',
        message:'',
        schedule_date:''
    });


    // Sms templates
    const [smsTemplates, setSmsTemplates] = useState([]);
    const [selectedSmsTemplate, setSelectedSmsTemplate] = useState('');


    // Recipients
    const [allRecipients, setAllRecipients] = useState([]);
    const [recipients, setReceipients] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState([]);


    // Classes
    const [classes, setClasses] = useState([{}]);
    const [selectedRecipientsClasses, setSelectedRecipientsClasses] = useState([]);
    

    // Departments
    const [departments, setDepartments] = useState([{}]);
    const [selectedRecipientsDepartments, setSelectedRecipientsDepartments] = useState([]);


    // Title
    const [title, setTitle] = useState('');


    // Message
    const [message, setMessage] = useState('');


    // Recipients dropdown
    const recipientsDropdown = (
        <div style={{width:'100%', paddingTop:6, paddingBottom:6}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingBottom:4, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                <Checkbox
                    className='rounded-[2px] border-hash-color'
                    checked={recipients.length === selectedRecipients.length}
                    onClick={() => selectedRecipients.length === recipients.length ? setSelectedRecipients([]) : setSelectedRecipients(recipients)}
                />
                <p style={{fontWeight:'600', fontSize:12, marginLeft:4}}>Select All</p>
            </div>


            {/* Students */}
            {recipients?.filter((r:any) => r.role === 'Student').length > 0 && (
                <>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingBottom:4, marginTop:4, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                        <Checkbox
                            className='rounded-[2px] border-hash-color'
                            checked={recipients?.filter((r:any) => r.role === 'Student').length === selectedRecipients?.filter((r:any) => r.role === 'Student').length}
                            onClick={() => recipients?.filter((r:any) => r.role === 'Student').length === selectedRecipients?.filter((r:any) => r.role === 'Student').length ? setSelectedRecipients(selectedRecipients.filter((r:any) => r.role !== 'Student')) : setSelectedRecipients(recipients.filter((r:any) => r.role === 'Student'))}
                        />
                        <p style={{fontWeight:'600', fontSize:12, marginLeft:4}}>Students</p>
                    </div>
                    {recipients?.filter((r:any) => r.role === 'Student')?.map(r => (
                        <div
                            key={r.adm_no}
                            style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, marginLeft:10, paddingLeft:4, paddingTop:4, paddingBottom:4, borderLeftColor:'#0094DA', borderLeftWidth:1, borderBottomWidth:recipients.indexOf(r) === recipients.length - 1 ? 0 : 1, borderBottomColor:'#ccc'}}
                        >
                            <Checkbox
                                className='rounded-[2px] border-hash-color'
                                checked={selectedRecipients.map((sr:any) => sr.adm_no).includes(r.adm_no)}
                                onClick={() => selectedRecipients.map((sr:any) => sr.adm_no).includes(r.adm_no)
                                    ? setSelectedRecipients(selectedRecipients.filter((sr:any) => sr.adm_no !== r.adm_no))
                                    : setSelectedRecipients([...selectedRecipients, r])}
                            />
                            {r?.image ? (
                                <Image
                                    width={35}
                                    height={35}
                                    alt='Student Image'
                                    src={r?.image}
                                    style={{width:35, height:35, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#ccc', borderRadius:30}}
                                />
                            ) : (
                                <div style={{width:35, height:35, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#ccc', borderRadius:30}}>
                                    <p style={{fontSize:8, color:'gray'}}>No Photo</p>
                                </div>
                            )}
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <p style={{fontWeight:'600', fontSize:12}}>{r.name}</p>
                                <p style={{fontSize:11, color:'gray'}}>{r.role}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}


            {/* Teachers */}
            {recipients?.filter(r => r.role === 'Teacher').length > 0 && (
                <>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:6, paddingTop:2, paddingBottom:2, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                        <Checkbox
                            className='rounded-[2px] border-hash-color'
                            checked={recipients?.filter(r => r.role === 'Teacher').length === selectedRecipients?.filter(r => r.role === 'Teacher').length}
                            onClick={() => recipients?.filter(r => r.role === 'Teacher').length === selectedRecipients?.filter(r => r.role === 'Teacher').length ? setSelectedRecipients(selectedRecipients.filter(r => r.role !== 'Teacher')) : setSelectedRecipients(recipients.filter(r => r.role === 'Teacher'))}
                        />
                        <p style={{fontWeight:'600', fontSize:12, paddingLeft:4}}>Teachers</p>
                    </div>
                    {recipients?.filter(r => r.role === 'Teacher')?.map(r => (
                        <div
                            key={r.adm_no}
                            style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, marginLeft:10, paddingLeft:4, paddingTop:4, paddingBottom:4, borderLeftColor:'#0094DA', borderLeftWidth:1, borderBottomWidth:recipients.indexOf(r) === recipients.length - 1 ? 0 : 1, borderBottomColor:'#ccc'}}
                        >
                            <Checkbox
                                className='rounded-[2px] border-hash-color'
                                checked={selectedRecipients.map(sr => sr.adm_no).includes(r.adm_no)}
                                onClick={() => selectedRecipients.map(sr => sr.adm_no).includes(r.adm_no)
                                    ? setSelectedRecipients(selectedRecipients.filter(sr => sr.adm_no !== r.adm_no))
                                    : setSelectedRecipients([...selectedRecipients, r])}
                            />
                            {r?.image ? (
                                <Image
                                    width={35}
                                    height={35}
                                    alt='Teacher Image'
                                    src={r?.image}
                                    style={{width:35, height:35, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#ccc', borderRadius:30}}
                                />
                            ) : (
                                <div style={{width:35, height:35, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#ccc', borderRadius:30}}>
                                    <p style={{fontSize:8, color:'gray'}}>No Photo</p>
                                </div>
                            )}
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <p style={{fontWeight:'600', fontSize:12}}>{r.name}</p>
                                <p style={{fontSize:11, color:'gray'}}>{r.role}</p>
                            </div>
                        </div>
                    ))}
                </>  
            )}
        </div>
    );


    // Recipients classes dropdown
    const recipientsClassesDropdown = (
        <div style={{width:'100%', paddingTop:6, paddingBottom:6}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingBottom:4, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                <Checkbox
                    className='rounded-[2px] border-hash-color'
                    checked={classes.length === selectedRecipientsClasses.length}
                    onClick={() => selectedRecipientsClasses.length === classes.length ? setSelectedRecipientsClasses([]) : setSelectedRecipientsClasses(classes)}
                />
                <p style={{fontWeight:'600', fontSize:12, marginLeft:4}}>Select All</p>
            </div>

            {classes?.map((r:any) => (
                <div
                    key={r._id}
                    style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, marginLeft:10, paddingLeft:4, paddingTop:4, paddingBottom:4, borderLeftColor:'#0094DA', borderLeftWidth:1, borderBottomWidth:recipients.indexOf(r) === recipients.length - 1 ? 0 : 1, borderBottomColor:'#ccc'}}
                >
                    <Checkbox
                        className='rounded-[2px] border-hash-color'
                        checked={selectedRecipientsClasses.map(sr => sr.class_name).includes(r.class_name)}
                        onClick={() => selectedRecipientsClasses.map(sr => sr.class_name).includes(r.class_name)
                            ? setSelectedRecipientsClasses(selectedRecipientsClasses.filter(sr => sr.class_name !== r.class_name))
                            : setSelectedRecipientsClasses([...selectedRecipientsClasses, r])}
                    />
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <p style={{fontWeight:'600', fontSize:12}}>{r.class_name}</p>
                    </div>
                </div>
            ))}
        </div>
    );


    // Recipients departments dropdown
    const recipientsDepartmentsDropdown = (
        <div style={{width:'100%', paddingTop:6, paddingBottom:6}}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', paddingBottom:4, borderBottomWidth:1, borderBottomColor:'#ccc'}}>
                <Checkbox
                    className='rounded-[2px] border-hash-color'
                    checked={departments.length === selectedRecipientsDepartments.length}
                    onClick={() => selectedRecipientsDepartments.length === departments.length ? setSelectedRecipientsDepartments([]) : setSelectedRecipientsDepartments(departments)}
                />
                <p style={{fontWeight:'600', fontSize:12, marginLeft:4}}>Select All</p>
            </div>

            {departments?.map((r:any) => (
                <div
                    key={r._id}
                    style={{display:'flex', flexDirection:'row', alignItems:'center', gap:6, marginLeft:10, paddingLeft:4, paddingTop:4, paddingBottom:4, borderLeftColor:'#0094DA', borderLeftWidth:1, borderBottomWidth:recipients.indexOf(r) === recipients.length - 1 ? 0 : 1, borderBottomColor:'#ccc'}}
                >
                    <Checkbox
                        className='rounded-[2px] border-hash-color'
                        checked={selectedRecipientsDepartments.map(sr => sr.department).includes(r.department)}
                        onClick={() => selectedRecipientsDepartments.map(sr => sr.department).includes(r.department)
                            ? setSelectedRecipientsDepartments(selectedRecipientsDepartments.filter(sr => sr.department !== r.department))
                            : setSelectedRecipientsDepartments([...selectedRecipientsDepartments, r])}
                    />
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <p style={{fontWeight:'600', fontSize:12}}>{r.department}</p>
                    </div>
                </div>
            ))}
        </div>
    );


    // Handle on change
    const handleOnChange = (e:any) => {
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
            if(!selectedSmsTemplate || selectedRecipients.length === 0 || !title || !message || (isScheduleSend && scheduleDate.isBefore(moment()))){
                setErrors({
                    selected_sms_template:!selectedSmsTemplate ? 'Please select sms template' : '',
                    selected_recipients:selectedRecipients.length === 0 ? 'Please select at least one recipient' : '',
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
                await uploadNoticeImage({data:formData, notice_id:randomNumber});
            };

        
            // Sending notice
            if(isScheduleSend){
                selectedRecipients?.map(async (sr:any) => {
                    const params = {
                        title:title,
                        body:message,
                        topic:sr.adm_no.replace(/\//g, '_'),
                        type:'notice',
                        created_by:'admin',
                        notice_id:randomNumber,
                        // @ts-ignore
                        schedule_date:scheduleDate?._d,
                        img:imageSrc ? `https://qodum.s3.amazonaws.com/notices/${randomNumber}` : ''
                    };
                    const notificationLink = `${process.env.NEXT_PUBLIC_API_URL}/notifications/schedule-notice`;
                    await axios.post(notificationLink, params);
                });
            }else{
                selectedRecipients?.map(async (sr:any) => {
                    const params = {
                        title:title,
                        body:message,
                        topic:sr.adm_no.replace(/\//g, '_'),
                        type:'notice',
                        created_by:'admin',
                        notice_id:randomNumber,
                        img:imageSrc ? `https://qodum.s3.amazonaws.com/notices/${randomNumber}` : ''
                    };
                    const notificationLink = `${process.env.NEXT_PUBLIC_API_URL}/notifications/send-notice`;
                    await axios.post(notificationLink, params);
                });
            };


            // Reseting
            toast({title:'Sent Successfully!'});
            setSelectedSmsTemplate('');
            setSelectedRecipients([]);
            setScheduleDate(moment());
            setTitle('');
            setMessage('');
            setImageSrc('');
            setFile(null);


            // Setting is loading to true
            setIsSubmitLoading(false);
            
        }catch (err){
            console.log(err);
            setIsSubmitLoading(false);
        }
    };


    // Use effects
    useEffect(() => {
        const fetcher = async () => {

            // Sms templates
            const smsTemplatesRes = await fetchSmsTemplates();
            setSmsTemplates(smsTemplatesRes);

            // Classes
            const classesRes = await fetchClassesNames();
            setClasses(classesRes);

            // Departments
            const departmentsRes = await fetchDepartments();
            setDepartments(departmentsRes);

            // Students response
            const studentsLink = `${process.env.NEXT_PUBLIC_API_URL}/students/adm-nos`;
            const studentsRes = await axios.get(studentsLink);

            // Teachers response
            const teachersLink = `${process.env.NEXT_PUBLIC_API_URL}/teachers/adm-nos`;
            const teachersRes = await axios.get(teachersLink);
            setAllRecipients([...studentsRes.data, ...teachersRes.data]);
            setReceipients([...studentsRes.data, ...teachersRes.data]);

        };
        fetcher();
    }, []);
    useEffect(() => {
        if(selectedRecipients.length > 0){
            setErrors({...errors, selected_recipients:''});
        };
    }, [selectedRecipients]);
    useEffect(() => {
        if(scheduleDate.isAfter(moment()) || scheduleDate.isSame(moment())){
            setErrors({...errors, schedule_date:''});
        };
    }, [scheduleDate]);
    useEffect(() => {
        if(selectedRecipientsClasses.length > 0){
            setReceipients(allRecipients.filter((r:any) => r.role === 'Teacher' || selectedRecipientsClasses?.map((c:any) => c.class_name).includes(r.class_name)));
        };
        if(selectedRecipientsDepartments.length > 0){
            setReceipients(allRecipients.filter((r:any) => r.role === 'Student' || selectedRecipientsDepartments?.map((c:any) => c.department).includes(r.department)));
        };
    }, [selectedRecipientsClasses, selectedRecipientsDepartments]);

    return (
        <>

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


            {/* SMS Template */}
            <div className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:mt-0'>
                <Select
                    value={selectedSmsTemplate}
                    onValueChange={(v:any) => {setErrors({...errors, selected_sms_template:''});setSelectedSmsTemplate(v)}}
                >
                    <p className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>SMS Template</p>
                    <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                        <SelectValue placeholder='Select Template' className='text-xs'/>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            smsTemplates.length < 1 ? (
                                <p className='text-xs'>No templates</p>
                            ) : // @ts-ignore
                            !smsTemplates[0].sms_type ? (
                                <LoadingIcon />
                            ) : smsTemplates.map((item:any) => (
                                <SelectItem value={item.sms_type} key={item._id}>{item.sms_type}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                {errors.selected_sms_template && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.selected_sms_template}</p>}
            </div>


            {/* Recipients Classes */}
            <div className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:mt-2'>
                <Select>
                    <p className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>Recipients Classes</p>
                    <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                        <SelectValue
                            placeholder={selectedRecipientsClasses.length === 0 ? 'Select Classes' :selectedRecipientsClasses.length === 1 ? '1 Class Selected' : `${selectedRecipientsClasses.length} Classes Selected`}
                            className='text-xs'
                        />
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </SelectTrigger>
                    <SelectContent>
                        {recipientsClassesDropdown}
                    </SelectContent>
                </Select>
                {errors.selected_recipients && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.selected_recipients}</p>}
            </div>


            {/* Recipients Departments */}
            <div className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:mt-2'>
                <Select>
                    <p className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>Recipients Departments</p>
                    <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                        <SelectValue
                            placeholder={selectedRecipientsDepartments.length === 0 ? 'Select Departments' :selectedRecipientsDepartments.length === 1 ? '1 Department Selected' : `${selectedRecipientsDepartments.length} Departments Selected`}
                            className='text-xs'
                        />
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </SelectTrigger>
                    <SelectContent>
                        {recipientsDepartmentsDropdown}
                    </SelectContent>
                </Select>
                {errors.selected_recipients && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.selected_recipients}</p>}
            </div>


            {/* Recipients */}
            <div className='relative w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:mt-2'>
                <Select>
                    <p className='w-full text-xs text-start pr-2 text-[#726E71] sm:text-end sm:basis-[30%]'>Recipients</p>
                    <SelectTrigger className='w-full h-10 flex flex-row items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none sm:basis-[70%]'>
                        <SelectValue
                            placeholder={selectedRecipients.length === 0 ? 'Select Recipients' :selectedRecipients.length === 1 ? '1 Selected Recipient' : `${selectedRecipients.length} Recipients Selected`}
                            className='text-xs'
                        />
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </SelectTrigger>
                    <SelectContent>
                        {recipientsDropdown}
                    </SelectContent>
                </Select>
                {errors.selected_recipients && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.selected_recipients}</p>}
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
            <div className='flex flex-row items-center justify-center pb-4 mt-6 gap-2 ml-0'>
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
        </>
    );
};





// Export
export default SmsAndAppMessage;