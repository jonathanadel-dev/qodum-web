'use client';
// Imports
import moment from 'moment';
import {redirect, useSearchParams} from 'next/navigation';
import {AuthContext} from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';

import Dashboard from '@/pagesComps/admission/page';
// @ts-ignore
import DefineAcademicYear from '@/components/modules/shared/AcademicYear/index';
import DefineFinancialYear from '@/components/modules/shared/FinancialYear/index';
import DefineTCCaste from '@/pagesComps/admission/(globalMasters)/(define tc details)/define-tc-caste/page';
import DefineTermMaster from '@/pagesComps/admission/(globalMasters)/(define tc details)/term-master/page';
import HealthUnitMaster from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/health-unit-master/page';
import HealthMaster from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/health-master/page';
import DefineTerm from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/define-term/page';
import StudnetHealthEntry from '@/pagesComps/admission/(globalMasters)/(Student Health Master)/student-health-entry/page';
import DefineBloodGroup from '@/pagesComps/admission/(globalMasters)/define-blood-group/page';
import DefineNationality from '@/pagesComps/admission/(globalMasters)/define-nationality/page';
import DefineRemark from '@/pagesComps/admission/(globalMasters)/define-remark/page';
import DefineCategory from '@/pagesComps/admission/(globalMasters)/define-category/page';
import DefineReligion from '@/pagesComps/admission/(globalMasters)/define-religion/page';
import DefineCaste from '@/pagesComps/admission/(globalMasters)/define-caste/page';
import PossibleSiblings from '@/pagesComps/admission/(globalMasters)/possible-siblings/page';
import StationaryDetails from '@/pagesComps/admission/(globalMasters)/stationary-details/page';
import DefineParish from '@/pagesComps/admission/(globalMasters)/define-parish/page';
import DefineHouse from '@/pagesComps/admission/(globalMasters)/define-house/page';
import DefineStream from '@/pagesComps/admission/(globalMasters)/define-stream/page';
import DefineSubject from '@/pagesComps/admission/(globalMasters)/define-subject/page';
import DefineCadetType from '@/pagesComps/admission/(globalMasters)/define-cadet-type/page';
import DefineClub from '@/pagesComps/admission/(globalMasters)/define-club/page';
import DefineOptionalSubject from '@/pagesComps/admission/(globalMasters)/define-optional-subject/page';
import DefineDocumentType from '@/pagesComps/admission/(globalMasters)/define-document-type/page';
import ImportStudent from '@/pagesComps/admission/(globalMasters)/import-student/page';
import ChangeAcademic from '@/pagesComps/admission/(masterSettings)/change-academic/page';
import EnquiryNoSetting from '@/pagesComps/admission/(masterSettings)/enquiry-no-setting/page';
import AdmissionSetting from '@/pagesComps/admission/(masterSettings)/admission-setting/page';
import StudentClassPromotion from '@/pagesComps/admission/(masterSettings)/student-class-promotion/page';
import UpdateStudentDetails from '@/pagesComps/admission/(masterSettings)/update-student-details/page';
import ReportLayoutSetting from '@/pagesComps/admission/(masterSettings)/report-layout-setting/page';
import SessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/page';
import Enquiry from '@/pagesComps/admission/(admission)/enquiry/page';
import AdmissionFormRegistration from '@/pagesComps/admission/(admission)/admission-form-registration/page';
import DefineMeritCriteria from '@/pagesComps/admission/(admission)/(entrance test)/define-merit-criteria/page';
import SlotCreation from '@/pagesComps/admission/(admission)/(entrance test)/slot-creation/page';
import ManualListGeneration from '@/pagesComps/admission/(admission)/(entrance test)/manual-list-generation/page';
import Admission from '@/pagesComps/admission/(admission)/admission/page';
import CreateIDCard from '@/pagesComps/admission/(admission)/create-id-card/page';
import SendSMS from '@/pagesComps/admission/(admission)/send-sms/page';
import AccountSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/account/page';
import FeeSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/fee/page';
import PayrollSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/payroll/page';
import AdmissionSessionTransfer from '@/pagesComps/fees/(master settings)/session-transfer/admission/page';
import Notice from '@/pagesComps/admission/(admission)/send-sms/notice/index';
import ClassNotice from '@/pagesComps/admission/(admission)/send-sms/classNotice';
import AdmissionOpen from '@/pagesComps/admission/(masterSettings)/admission-open/page';
import RegistrationReport from '@/pagesComps/admission/(reports)/registration-report/page';
import AdmissionReport from '@/pagesComps/admission/(reports)/admission-report/page';
import MeritListReport from '@/pagesComps/admission/(reports)/merit-list-report/page';
import { updateUserPermissions } from '@/lib/actions/users/manageUsers/user.actions';





// Main function
const Home = () => {

  // Login user check
  const {user, login, logout} = useContext(AuthContext);


  // Params page
  const searchParams = useSearchParams();
  const page = searchParams.get('page');


  // Setting moment local to english
  moment.locale('en-gb');


  // Current page
  const {currentPage, setCurrentPage, openedPages, setOpenedPages} = useContext(GlobalStateContext);
  
  
  // Opened pages components
  const [openedPagesComponents, setOpenedPagesComponents] = useState([]);


  // Use effect
  useEffect(() => {

    if(!user) redirect('/sign-in');

    let openedPagesArray = [];

    if(openedPages.length === 0){
      openedPagesArray.push({name:'Dashboard', component:(
        <div className='h-full overflow-y-scroll custom-sidebar-scrollbar'>
          <Dashboard />
        </div>
      )});
      setCurrentPage('');
    };
    if(openedPages.includes('Define Academic Year')){
      openedPagesArray.push({name:'Define Academic Year', component:<DefineAcademicYear />});
    };
    if(openedPages.includes('Define Financial Year')){
      openedPagesArray.push({name:'Define Financial Year', component:<DefineFinancialYear />});
    };
    if(openedPages.includes('Define TC Caste')){
      openedPagesArray.push({name:'Define Financial Year', component:<DefineTCCaste />});
    };
    if(openedPages.includes('Define Term Master')){
      openedPagesArray.push({name:'Define Term Master', component:<DefineTermMaster />});
    };
    if(openedPages.includes('Health Unit Master')){
      openedPagesArray.push({name:'Health Unit Master', component:<HealthUnitMaster />});
    };
    if(openedPages.includes('Health Master')){
      openedPagesArray.push( {name:'Health Master', component:<HealthMaster />});
    };
    if(openedPages.includes('Define Term')){
      openedPagesArray.push( {name:'Define Term', component:<DefineTerm />});
    };
    if(openedPages.includes('Student Health Entry')){
      openedPagesArray.push({name:'Student Health Entry', component:<StudnetHealthEntry />});
    };
    if(openedPages.includes('Define Blood Group')){
      openedPagesArray.push({name:'Define Blood Group', component:<DefineBloodGroup />});
    };
    if(openedPages.includes('Define Nationality')){
      openedPagesArray.push({name:'Define Nationality', component:<DefineNationality />});
    };
    if(openedPages.includes('Define Remark')){
      openedPagesArray.push({name:'Define Remark', component:<DefineRemark />});
    };
    if(openedPages.includes('Define Category')){
      openedPagesArray.push({name:'Define Category', component:<DefineCategory />});
    };
    if(openedPages.includes('Define Religion')){
      openedPagesArray.push({name:'Define Religion', component:<DefineReligion />});
    };
    if(openedPages.includes('Define Caste')){
      openedPagesArray.push({name:'Define Caste', component:<DefineCaste />});
    };
    if(openedPages.includes('Possible Siblings')){
      openedPagesArray.push({name:'Possible Siblings', component:<PossibleSiblings />});
    };
    if(openedPages.includes('Stationary Details')){
      openedPagesArray.push({name:'Stationary Details', component:<StationaryDetails />});
    };
    if(openedPages.includes('Define Parish')){
      openedPagesArray.push({name:'Define Parish', component:<DefineParish />});
    };
    if(openedPages.includes('Define House')){
      openedPagesArray.push({name:'Define House', component:<DefineHouse />});
    };
    if(openedPages.includes('Define Stream')){
      openedPagesArray.push({name:'Define Stream', component:<DefineStream />});
    };
    if(openedPages.includes('Define Subject')){
      openedPagesArray.push({name:'Define Subject', component:<DefineSubject />});
    };
    if(openedPages.includes('Define Cadet Type')){
      openedPagesArray.push({name:'Define Cadet Type', component:<DefineCadetType />});
    };
    if(openedPages.includes('Define Club')){
      openedPagesArray.push({name:'Define Club', component:<DefineClub />});
    };
    if(openedPages.includes('Define Optional Subject')){
      openedPagesArray.push({name:'Define Optional Subject', component:<DefineOptionalSubject />});
    };
    if(openedPages.includes('Define Document Type')){
      openedPagesArray.push({name:'Define Document Type', component:<DefineDocumentType />});
    };
    if(openedPages.includes('Import Student')){
      openedPagesArray.push({name:'Import Student', component:<ImportStudent />});
    };
    if(openedPages.includes('Change Academic')){
      openedPagesArray.push({name:'Change Academic', component:<ChangeAcademic />});
    };
    if(openedPages.includes('Enquiry No Setting')){
      openedPagesArray.push({name:'Enquiry No Setting', component:<EnquiryNoSetting />});
    };
    if(openedPages.includes('Admission Setting')){
      openedPagesArray.push({name:'Admission Setting', component:<AdmissionSetting />});
    };
    if(openedPages.includes('Student Class Promotion')){
      openedPagesArray.push({name:'Student Class Promotion', component:<StudentClassPromotion />});
    };
    if(openedPages.includes('Update Student Details')){
      openedPagesArray.push({name:'Update Student Details', component:<UpdateStudentDetails />});
    };
    if(openedPages.includes('Report Layout Setting')){
      openedPagesArray.push({name:'Report Layout Setting', component:<ReportLayoutSetting />});
    };
    if(openedPages.includes('Session Transfer')){
      openedPagesArray.push({name:'Session Transfer', component:<SessionTransfer />});
    };
    if(openedPages.includes('Enquiry')){
      openedPagesArray.push({name:'Enquiry', component:<Enquiry />});
    };
    if(openedPages.includes('Admission Form Registration')){
      openedPagesArray.push({name:'Admission Form Registration', component:<AdmissionFormRegistration />});
    };
    if(openedPages.includes('Define Merit Criteria')){
      openedPagesArray.push({name:'Define Merit Criteria', component:<DefineMeritCriteria />});
    };
    if(openedPages.includes('Slot Creation')){
      openedPagesArray.push({name:'Slot Creation', component:<SlotCreation />});
    };
    if(openedPages.includes('Manual List Generation')){
      openedPagesArray.push({name:'Manual List Generation', component:<ManualListGeneration />});
    };
    if(openedPages.includes('Admission')){
      openedPagesArray.push({name:'Admission', component:<Admission />});
    };
    if(openedPages.includes('Create ID Card')){
      openedPagesArray.push({name:'Create ID Card', component:<CreateIDCard />});
    };
    if(openedPages.includes('Send SMS')){
      openedPagesArray.push({name:'Send SMS', component:<SendSMS />});
    };
    if(openedPages.includes('Account Manager Session Transfer')){
      openedPagesArray.push({name:'Account Manager Session Transfer', component:<AccountSessionTransfer />});
    };
    if(openedPages.includes('Fee Manager Session Transfer')){
      openedPagesArray.push({name:'Fee Manager Session Transfer', component:<FeeSessionTransfer />});
    };
    if(openedPages.includes('Payroll Manager Session Transfer')){
      openedPagesArray.push({name:'Payroll Manager Session Transfer', component:<PayrollSessionTransfer />});
    };
    if(openedPages.includes('Admission Manager Session Transfer')){
      openedPagesArray.push({name:'Admission Manager Session Transfer', component:<AdmissionSessionTransfer />});
    };
    if(openedPages.includes('Notice')){
      openedPagesArray.push({name:'Notice', component:<Notice />});
    };
    if(openedPages.includes('Class Notice')){
      openedPagesArray.push({name:'Class Notice', component:<ClassNotice />});
    };
    if(openedPages.includes('Admission Open')){
      openedPagesArray.push({name:'Admission Open', component:<AdmissionOpen />});
    };
    if(openedPages.includes('Registration Report')){
      openedPagesArray.push({name:'Registration Report', component:<RegistrationReport />});
    };
    if(openedPages.includes('Admission Report')){
      openedPagesArray.push({name:'Admission Report', component:<AdmissionReport />});
    };
    if(openedPages.includes('Merit List Report')){
      openedPagesArray.push({name:'Merit List Report', component:<MeritListReport />});
    };


    // // Setting active year in moment
    // const fetcher = async () => {
    //   const activeYearRes = await fetchActiveAcademicYear();
    //   setMomentDefaultYear(activeYearRes.year_name.split('-')[0]);
    // };
    // fetcher();


    setOpenedPagesComponents(openedPagesArray);


    // Checking user permissions
    const asyncFunc = async () => {
      localStorage.removeItem('payments');
      const loginUserRes = await updateUserPermissions({user_name:user.user_name});
      if(loginUserRes.success){
        login(loginUserRes.user);
      }else{
        logout();
      };
    };
    asyncFunc();
  }, [openedPages]);
  useEffect(() => {
    if(page){
      setOpenedPages([...openedPages, page]);
      setCurrentPage(page);
    };
  }, []);

  return(
    <div className='relative h-full w-full overflow-hidden'>
      {openedPagesComponents?.map((component:any) => (
        <div className={`absolute w-full h-full ${component.name === currentPage ? 'z-10' : 'z-0'}`}>
          {component.component}
        </div>
      ))}
    </div>
  );
};





// Export
export default Home;

