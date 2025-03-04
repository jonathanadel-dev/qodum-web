"use client";
// Imports
import { useEffect, useState } from "react";
import LoadingIcon from "@/components/utils/LoadingIcon";
import BarCom from "@/components/dashboards/shared/BarCom";
import DoughnutCom from "@/components/dashboards/shared/DoughnutCom";
import AdmissionCards from "@/components/dashboards/admissionDashboard/AdmissionCards";
import NewAdmissionsIn from "@/components/dashboards/admissionDashboard/NewAdmissionsIn";
import { fetchStudentsOnlineAndOfflineRegistrations } from "@/lib/actions/admission/admission/student.actions";
import ReligionWiseStudentStrength from "@/components/dashboards/admissionDashboard/ReligionWiseStudentStrength";
import {
  newStudentsAndGendersCounts,
  studentsAndGendersCounts,
} from "@/lib/actions/admission/admission/admittedStudent.actions";
import {
  studentStrengthBarData,
  studentComparisionBarData,
  standardStatisticsDoughnutData,
  transferDoughnutData,
  categoryDoughnutData,
} from "@/constants/charts/admissionCharts";

// Main function
const page = () => {
  // Is loading
  const [isLoading, setIsLoading] = useState(false);

  // Students count
  const [studentsCount, setStudentsCount] = useState<any>({
    all_students_count: 0,
    boys_count: 0,
    girls_count: 0,
  });

  // New students count
  const [newStudentsCount, setNewStudentsCount] = useState<any>({
    all_students_count: 0,
    boys_count: 0,
    girls_count: 0,
    previous_boys_count: 0,
    previous_girls_count: 0,
  });

  // Students online and offline count
  const [studentsOnlineAndOfflineCount, setStudentsOnlineAndOfflineCount] =
    useState<any>({
      all_students_count: 0,
      online_count: 0,
      offline_count: 0,
    });

  // Students religions data
  const [studentsReligionsData, setStudentsReligionsData] = useState<any>({
    all_students_count: 0,
    hindu_students_count: 0,
    christian_students_count: 0,
    muslim_students_count: 0,
    jewish_students_count: 0,
  });

  // Use effect
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const [
        studentsCountRes,
        newStudentsCountRes,
        studentsOnlineAndOfflineCountRes,
      ] = await Promise.all([
        studentsAndGendersCounts(),
        newStudentsAndGendersCounts(),
        fetchStudentsOnlineAndOfflineRegistrations(),
      ]);
      setStudentsCount(studentsCountRes);
      setNewStudentsCount(newStudentsCountRes);
      setStudentsOnlineAndOfflineCount(studentsOnlineAndOfflineCountRes);
      setStudentsReligionsData(studentsReligionsData);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  return (
    <section className="flex flex-col w-full px-4 gap-4">
      {isLoading ? (
        <div className="w-full flex justify-center">
          <LoadingIcon />
        </div>
      ) : (
        <>
          {/* Cards */}
          <AdmissionCards
            studentsCount={studentsCount}
            newStudentsCount={newStudentsCount}
            studentsOnlineAndOfflineCount={studentsOnlineAndOfflineCount}
          />

          {/* Student Strength Bar Data */}
          <div className="flex flex-col gap-4 lg:flex-row">
            <BarCom barData={studentStrengthBarData} />
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            {/* Student Comparision Bar Data */}
            <div className="w-full xl:w-3/5">
              <BarCom barData={studentComparisionBarData} />
            </div>

            {/* New Admissions In */}
            <div className="w-full xl:w-2/5">
              <NewAdmissionsIn newStudentsCount={newStudentsCount} />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Standard Wise Statistics */}
            <DoughnutCom data={standardStatisticsDoughnutData} text="296" />

            {/* Religion Wise Student Strength */}
            <ReligionWiseStudentStrength
              studentsReligionsData={studentsReligionsData}
            />
          </div>

          {/* Doughnuts Group 2 */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <DoughnutCom data={transferDoughnutData} text="910" />
            <DoughnutCom data={categoryDoughnutData} text="3850" />
          </div>
        </>
      )}
    </section>
  );
};

// Export
export default page;
