"use client";
// Imports
import { useEffect, useState } from "react";
import LoadingIcon from "@/components/utils/LoadingIcon";
import { fetchPayments } from "@/lib/actions/fees/manageFee/payment.actions";
import FeesCardsOne from "@/components/dashboards/feesDashboard/FeesCardsOne";
import CollectionSummary from "@/components/dashboards/feesDashboard/CollectionSummary";
import PaymodeSummaryCard from "@/components/dashboards/feesDashboard/PaymodeSummaryCard";
import EstimatedCollection from "@/components/dashboards/feesDashboard/EstimatedCollection";
import DefaulterStatistics from "@/components/dashboards/feesDashboard/DefaulterStastistics";
import { fetchClasses } from "@/lib/actions/fees/globalMasters/defineClassDetails/class.actions";
import { fetchStudentsRegistrationFees } from "@/lib/actions/admission/admission/student.actions";
import RecentTransactionsCard from "@/components/dashboards/feesDashboard/RecentTransactionsCard";
import TransactionHistoryOfLast30Days from "@/components/dashboards/feesDashboard/TransactionHistoryOfLast30Days";
import { fetchActiveAcademicYear } from "@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions";
import {
  feesDashboardDefaulterStudentsData,
  fetchFeesDashboardAdmittedStudents,
} from "@/lib/actions/admission/admission/admittedStudent.actions";

// Main function
const page = () => {
  // Is loading
  const [isLoading, setIsLoading] = useState(true);

  // Students
  const [students, setStudents] = useState<any>([]);
  const [boys, setBoys] = useState<any>();
  const [girls, setGirls] = useState<any>();

  // Academic year
  const [academicYear, setAcademicYear] = useState("");

  // Payments
  const [payments, setPayments] = useState<any>([]);

  // Classes
  const [classes, setClasses] = useState<any>([]);

  // Defaulter students data
  const [defaulterStudentsData, setDefaulterStudentsData] = useState<any>({});

  // Registration fees
  const [registrationFees, setRegistrationFees] = useState([{}]);

  // Total number generator
  const totalNumberGenerator = (array: any) => {
    let sum = 0;
    for (let i = 0; i < array?.length; i++) {
      sum += array[i];
    }
    return sum;
  };

  // Use effect
  useEffect(() => {
    const fetcher = async () => {
      // Fetching
      // const studentsRes = await fetchFeesDashboardAdmittedStudents();
      const activeAcademicYearRes = await fetchActiveAcademicYear();
      const paymentsRes = await fetchPayments();
      const classesRes = await fetchClasses();
      // const defaulterStudentsDataRes = await feesDashboardDefaulterStudentsData();
      const studentsRegistrationFeesRes = await fetchStudentsRegistrationFees();

      // Setting
      // setStudents([{}]);
      // setBoys(10);
      // setGirls(11);
      // setStudents(studentsRes);
      // setBoys(studentsRes?.filter((s:any) => s.student.gender === 'Male').length);
      // setGirls(studentsRes?.filter((s:any) => s.student.gender === 'Female').length);
      setAcademicYear(activeAcademicYearRes.year_name);
      setPayments(paymentsRes);
      setClasses(classesRes);
      // setDefaulterStudentsData(defaulterStudentsDataRes);
      // setDefaulterStudentsData([{}]);
      setRegistrationFees(studentsRegistrationFeesRes);

      // Loading done
      setIsLoading(false);
    };
    fetcher();
  }, [window.onload]);

  return (
    <section className="flex flex-col w-full px-4 py-2 gap-4">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingIcon />
        </div>
      ) : (
        <>
          {/* Cards Group One */}
          <FeesCardsOne
            students={students}
            boys={boys}
            girls={girls}
            academicYear={academicYear}
            totalNumberGenerator={totalNumberGenerator}
            registrationFees={registrationFees}
          />

          {/* Paymode Summary */}
          <PaymodeSummaryCard
            totalNumberGenerator={totalNumberGenerator}
            payments={payments}
            registrationFees={registrationFees}
          />

          {/* Transactions History */}
          <div>
            <TransactionHistoryOfLast30Days
              paymentsRes={payments}
              totalNumberGenerator={totalNumberGenerator}
              registrationFees={registrationFees}
            />
          </div>

          {/* Estimated collection and recent transactions */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="w-full xl:w-2/3">
              <EstimatedCollection
                students={students}
                totalNumberGenerator={totalNumberGenerator}
                registrationFees={registrationFees}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <RecentTransactionsCard
                payments={payments}
                students={students}
                registrationFees={registrationFees}
              />
            </div>
          </div>

          {/* Collection Summary Bar */}
          <CollectionSummary
            payments={payments}
            classes={classes}
            registrationFees={registrationFees}
            totalNumberGenerator={totalNumberGenerator}
          />

          {/* Fee Defaulters Bar */}
          <DefaulterStatistics defaulterStudentsData={defaulterStudentsData} />
        </>
      )}
    </section>
  );
};

// Export
export default page;
