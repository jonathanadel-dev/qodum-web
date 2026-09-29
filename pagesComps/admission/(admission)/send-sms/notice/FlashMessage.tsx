// Imports
import axios from 'axios';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';
import {ChevronDown, SendHorizonal} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import MyDatePicker from '@/components/shared/CustomDatePicker';
import {uploadFlashMessageImage} from '@/lib/actions/image.actions';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
  






// Main function
const FlashMesage = () => {

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


    // Errors
    const [errors, setErrors] = useState({
        message:'',
        expires_on:'',
        schedule_date:''
    });


    // Message
    const [message, setMessage] = useState('');


    // Expires on
    const [expiresOn, setExpiresOn] = useState(moment());


    // Schedule date
    const [scheduleDate, setScheduleDate] = useState(moment());


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
            if(!message || expiresOn.isBefore(moment()) || (isScheduleSend && scheduleDate.isBefore(moment()))){
                setErrors({
                    expires_on:expiresOn.isBefore(moment()) ? 'Please select a future date' : '',
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
                await uploadFlashMessageImage({data:formData, message_id:randomNumber});
            };

        
            // Sending flash message
            if(isScheduleSend){
                const params = {
                    message,
                    expires_on:expiresOn,
                    // @ts-ignore
                    schedule_date:scheduleDate._d,
                    img:imageSrc ? `https://qodum.s3.amazonaws.com/flash-messages/${randomNumber}` : ''
                };
                const notificationLink = `${process.env.NEXT_PUBLIC_API_URL}/notifications/schedule-flash-message`;
                const res = await axios.post(notificationLink, params);
            }else{
                const params = {
                    message,
                    expires_on:expiresOn,
                    img:imageSrc ? `https://qodum.s3.amazonaws.com/flash-messages/${randomNumber}` : ''
                };
                const notificationLink = `${process.env.NEXT_PUBLIC_API_URL}/notifications/create-flash-message`;
                await axios.post(notificationLink, params);
            }


            // Reseting
            toast({title:'Sent Successfully!'});
            setMessage('');
            setImageSrc('');
            setFile(null);
            setExpiresOn(moment());
            setScheduleDate(moment());


            // Set is loading to false
            setIsSubmitLoading(false);
            
        }catch (err){
            console.log(err);
        };
    };


    // Use effect
    useEffect(() => {
        if(expiresOn.isAfter(moment()) || expiresOn.isSame(moment())){
            setErrors({...errors, expires_on:''});
        };
    }, [expiresOn]);
    useEffect(() => {
        if(scheduleDate.isAfter(moment()) || scheduleDate.isSame(moment())){
            setErrors({...errors, schedule_date:''});
        };
    }, [scheduleDate]);

    return (
        <>

            {/* Expires On */}
            <div className='relative w-full flex flex-col items-start justify-center mt-2 sm:flex-row sm:items-center'>
                <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>Expires On</p>
                <div className='w-full sm:basis-[70%]'>
                    <MyDatePicker
                        selectedDate={expiresOn}
                        setSelectedDate={setExpiresOn}
                    />
                </div>
                {errors.expires_on && <p className='absolute top-[100%] right-0 z-10 text-xs text-red-500'>{errors.expires_on}</p>}
            </div>


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
        </>
    );
};





// Export
export default FlashMesage;