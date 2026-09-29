// Imports
import {ChevronsUpDown} from 'lucide-react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import moment from 'moment';





// Main Function
const PaymentsList = ({payments, totalNumberGenerator, setReceiptPaymentData, setIsReceiptOpened}:any) => {

    // Print
    const printReceiptHandler = async (p:any) => {
        setReceiptPaymentData(p);
        setIsReceiptOpened(true);
    };

    return (
            <div className='w-full h-[90%] mt-10 flex flex-col items-center rounded-[4px] border-[0.5px] border-[#ccc]'>


                {/* Heads */}
                <div className='w-full h-full flex flex-col rounded-[4px] bg-[#F7F7F7] overflow-x-scroll custom-sidebar-scrollbar'>
                    {/* Headers */}
                    <ul className='w-full min-w-[850px] flex flex-row text-[10px] bg-[#435680] text-white border-b-[0.5px] border-[#ccc] cursor-pointer sm:text-[10px] md:text-md'>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 py-2 border-r-[.5px] border-[#ccc]'>
                            Receipt No.
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Fees Type
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[12.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Receipt Date
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[10%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Name
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[11.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Paid Amount
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[13.5%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Cheque/DD/NEFT
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                            Print Receipt
                            <ChevronsUpDown size={12} />
                        </li>
                        <li className='basis-[15%] flex flex-row items-center justify-between px-2'>
                            Print Certificate
                            <ChevronsUpDown size={12} />
                        </li>
                    </ul>
                    {/* Values */}
                        {
                            payments?.length < 1 ? (
                                <p className='w-full min-w-[850px] flex flex-row p-2 text-sm bg-[#F3F8FB]'>
                                    No payments
                                </p>
                            ) : !payments[0]?.receipt_no ? (
                                <LoadingIcon />
                            ) : payments?.map((p:any, index:number) => (
                                <ul
                                    key={index}
                                    className={`w-full min-w-[850px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md ${Math.floor((payments.indexOf(p) + 1) / 2) * 2 !== payments.indexOf(p) + 1 ? 'bg-[#F3F8FB]' : 'bg-white'}`}
                                >
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {p.receipt_no}
                                    </li>
                                    <li className='basis-[10%] flex-grow flex flex-row items-center justify-between px-2 border-r-[.5px] border-[#ccc]'>
                                        {p.fee_type === 'All fee types' ? 'All' : p.fee_type}
                                    </li>
                                    <li className='basis-[12.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {moment(p.received_date).format('D-MMM-yy')}
                                    </li>
                                    <li className='basis-[10%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {p.student}
                                    </li>
                                    <li className='basis-[11.5%] flex-grow flex flex-row items-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                        {totalNumberGenerator(p.paid_heads.map((h:any) => totalNumberGenerator(h.amounts.filter((a:any) => p.installments.includes(a.name)).map((a:any) => Number(a.paid_amount)))))}
                                    </li>
                                    <li className='basis-[13.5%] flex-grow flex flex-row items-center px-2 border-r-[.5px] border-[#ccc]'>
                                        {p?.paymode_details?.cheque_no}
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center justify-center px-2 py-[2px] border-r-[.5px] border-[#ccc]'>
                                        <span
                                            className='flex items-center justify-center w-full h-6 text-[11px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF] cursor-pointer
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                            onClick={() => printReceiptHandler(p)}
                                        >
                                            Print Receipt
                                        </span>
                                    </li>
                                    <li className='basis-[15%] flex-grow flex flex-row items-center justify-center px-2 py-[2px]]'>
                                        <span
                                            className='flex items-center justify-center w-full h-6 text-[11px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[0.5px] rounded-full border-[#E2E4FF] cursor-pointer
                                            hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                            // onClick={() => selectHandler(transportGroup)}
                                        >
                                            Print Certificate
                                        </span>
                                    </li>
                                </ul>
                            ))
                        }
                </div>


            </div>
    );
};





// Export
export default PaymentsList;