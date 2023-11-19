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
  account?: string;
  studentId?: string;
};

export type {
  DashboardData,
  DisplayWasherProps,
  DisplayDryerProps,
  DisplayShowerProps,
  DisplayPublicBathProps,
  gotDashboardData,
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
  WeeklyCleaningTableDataToPost,
  MonthlyCleaningTableDataToPost,
  UserData,
};

export default StudentName;
