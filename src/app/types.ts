import { Dispatch, SetStateAction } from 'react';
import { OptionBase } from 'chakra-react-select';
import { StaticImageData } from 'next/image';


type DashboardData = {
  yamaWasherData: boolean[];
  umiWasherData: boolean[];
  yamaDryerData: boolean[];
  umiDryerData: boolean[];
  yamaShowerData: boolean[];
  umiShowerData: boolean[];
  numberOfUsingBathData: number[];
};

type WeekCleaningData = {
  cleanType: string;
  date: string;
  cleaningTimes: number;
  dormitory: string;
  floor: number;
  studentStatus: {
    student: string;
    status: string;
    agent: string;
  }[];
};

type MonthCleaningData = {
  cleanType: string;
  date: string;
  cleaningTimes: number;
  dormitory: string;
  studentStatus: {
    student: string;
    status: string;
    agent: string;
  }[];
};

type SpecialCleaningData = {
  cleanType: string;
  date: string;
  cleaningTimes: number;
  place: string;
  studentStatus: {
    student: string;
    status: string;
    agent: string;
  }[];
};

type CleaningData = {
  id: string;
  times: number;
  cleaningType: string;
  dormitory: string;
  floor: number;
};

type CleaningAllData = {
  date: string;
  cleaningData: CleaningData[];
}[];

type gotDashboardData = {
  id: string;
  state: number;
  timestamp: string;
};

type CleaningTableDataToPost = {
  dormitory: string;
  date: string; //yyyy-mm
  register: string;
  weeklyCleaningTableData: WeeklyCleaningTableDataToPost[];
  monthlyCleaningTableData: MonthlyCleaningTableDataToPost[];
};

type RollCallTableData = {
  day: string; //dd
  account: string;
};

type RollCallTableDataToPost = {
  dormitory: string;
  date: string; //yyyy-mm
  register: string;
  tableData: RollCallTableData[];
};

class StudentName implements OptionBase {
  constructor(
    public value: string,
    public label: string,
    public colorScheme: string
  ) { }
}

type StudentNameType = {
  value: string;
  label: string;
  colorScheme: string;
};

type WeeklyCleaningTableData = {
  times: string;
  date: string;
  F1studentNames: StudentName[];
  F2studentNames: StudentName[];
  F3studentNames: StudentName[];
};

type WeeklyCleaningTableDataToPost = {
  times: string;
  day: string; //dd
  studentAccounts: {
    f1: string[];
    f2: string[];
    f3: string[];
  };
};

type MonthlyCleaningTableDataToPost = {
  day: string; //dd
  accounts: string[];
};

type MonthlyCleaningTableData = {
  date: string;
  names: StudentName[];
};
type LoginData = {
  studentId: string;
  password: string;
};

//type for Props

type DisplayWasherProps = {
  washerData: boolean[];
};

type DisplayDryerProps = {
  dryerData: boolean[];
};

type DisplayShowerProps = {
  showerData: boolean[];
};

type DisplayPublicBathProps = {
  numberOfUsingBathData: number[];
};

type WeeklyCleaningTableProps = {
  isEditMode: boolean;
  tableData: WeeklyCleaningTableData[];
  setTableData: Dispatch<SetStateAction<WeeklyCleaningTableData[]>>;
};

type UserData = {
  account: string;
  studentId: string;
};

type StudentDataByFloor = {
  f1: string[];
  f2: string[];
  f3: string[];
  f4: string[];
  f5: string[];
};

type StudentDataAttendedMonthlyCleaning = {
  cleaningID: number;
  studentStatus: {
    student: string;
    status: number;
    agent: string;
  };
};

type WeeklyCleaningReport = {
  check1: number;
  check2: number;
  check3: number;
  check4: number;
  check5: number;
  comment: string;
};

type MonthlyCleaningReportAndSpecialCleaningReport = {
  did: string;
  comment: string;
};

type CleaningReport = {
  cleaningId: number;
  studentStatus: {
    student: string;
    status: number;
    agent: string;
  }[];
  cleanReport: WeeklyCleaningReport | MonthlyCleaningReportAndSpecialCleaningReport;
  registeredStudent: string;
};

type TeacherCleaningReport = {
  cleaningId: number;
  cleanReport: WeeklyCleaningReport | MonthlyCleaningReportAndSpecialCleaningReport;
  registeredTeacher: string;
};

type WashAndDryProps = {
  data: number[];
  image: StaticImageData;
  name: string;
};

type ShawerProps = {
  data: number;
  image: StaticImageData;
  name: string;
};

type BuildingProps = {
  Wash: WashAndDryProps;
  Dry: WashAndDryProps;
  Shawer: ShawerProps;
};

export type {
  MonthlyCleaningReportAndSpecialCleaningReport,
  WeeklyCleaningReport,
  DashboardData,
  DisplayShowerProps,
  DisplayPublicBathProps,
  StudentDataAttendedMonthlyCleaning,
  gotDashboardData,
  DisplayWasherProps,
  DisplayDryerProps,
  SpecialCleaningData,
  CleaningData,
  CleaningAllData,
  CleaningTableDataToPost,
  WeeklyCleaningTableData,
  WeeklyCleaningTableProps,
  MonthlyCleaningTableData,
  LoginData,
  RollCallTableData,
  RollCallTableDataToPost,
  StudentNameType,
  StudentName,
  WeeklyCleaningTableDataToPost,
  MonthlyCleaningTableDataToPost,
  UserData,
  StudentDataByFloor,
  CleaningReport,
  TeacherCleaningReport,
  MonthCleaningData,
  WeekCleaningData,
  WashAndDryProps,
  ShawerProps,
  BuildingProps,
};


