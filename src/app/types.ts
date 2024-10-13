import { Dispatch, SetStateAction } from 'react';
import { OptionBase } from 'chakra-react-select';

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
  ) {}
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
  washerData: boolean[][];
  dormitory: 'MOU' | 'SEA' | 'ALL' | 'CEN' | 'SPA';
};

type DisplayDryerProps = {
  dryerData: boolean[][];
  dormitory: 'MOU' | 'SEA' | 'ALL' | 'CEN' | 'SPA';
};

type DisplayShowerProps = {
  showerData: boolean[];
  dormitory: 'MOU' | 'SEA' | 'ALL' | 'CEN' | 'SPA';
};

type DisplayPublicBathProps = {
  numberOfUsingBathData: boolean[];
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

type DormData = {
  dormitory: string;
  floor: string | null;
  type: string;
};

type DashboardDetailResponse = {
  dormitory: string;
  floor: number;
  No: number;
  startedTime: Date | null;
  lastDataTime: Date;
  status: boolean;
  type: 'DR' | 'WA' | 'SW' | 'PB' | 'ALL';
}[];

type TransitionsApiResponse = {
  type: 'DR' | 'WA' | 'SW' | 'PB' | 'ALL';
  dormitory: 'MOU' | 'CEN' | 'SEA' | 'SPA' | 'ALL';
  floor: number; // 1 ~ 5
  No: number; // 1 ~ 4
  data: {
    labels: string[]; // example: hh:mm:ss
    datasets: Array<{
      label: string; // example: 一週間
      data: number[]; // example: 3.1
    }>;
  };
};

type ApiQueryParams = {
  id?: string; // Specify by IoTID. Example: WA_311
  dormitory?: 'MOU' | 'CEN' | 'SEA' | 'SPA' | 'ALL'; // Example: MOU, CEN, SEA, SPA or ALL
  floor?: '1' | '2' | '3' | '4' | '5' | 'ALL'; // Example: 1 ~ 5 or ALL
  type?: 'DR' | 'WA' | 'SW' | 'PB' | 'ALL'; // Example: DR, WA, SW, PB or ALL
  weekday?: string; // Example: MON, MONDAY, TUE, TUESDAY, etc.
  weekly?: string; // Flag for past week calculation. Example: TRUE
  monthly?: string; // Flag for past month calculation. Example: TRUE
  halfYear?: string; // Flag for past half-year calculation. Example: TRUE
  startTime?: string; // Example: YYYY-MM-DD-hh:mm:ss
  endTime?: string; // Example: YYYY-MM-DD-hh:mm:ss
  groupByDormitory?: string; // Example: TRUE
  groupByFloor?: string; // Example: TRUE
  groupByID?: string; // Example: TRUE
};

interface DormitoryMobileComponentProps {
  showerData: boolean[];
  washerData: boolean[][];
  dryerData: boolean[][];
  dormitory: 'MOU' | 'CEN' | 'SEA' | 'SPA' | 'ALL';
}

export type {
  MonthlyCleaningReportAndSpecialCleaningReport,
  WeeklyCleaningReport,
  DashboardData,
  DormData,
  DashboardDetailResponse,
  DisplayShowerProps,
  DisplayPublicBathProps,
  StudentDataAttendedMonthlyCleaning,
  gotDashboardData,
  DisplayWasherProps,
  DisplayDryerProps,
  SpecialCleaningData,
  CleaningData,
  TransitionsApiResponse,
  CleaningAllData,
  ApiQueryParams,
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
  DormitoryMobileComponentProps,
};
