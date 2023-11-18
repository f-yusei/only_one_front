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
  date: string;
  weeklyCleaningTableData: WeeklyCleaningTableDataToPost[];
  monthlyCleaningTableData: MonthlyCleaningTableDataToPost[];
};

type RollCallTableData = {
  day: string;
  name: string;
};

type RollCallTableDataToPost = {
  dormitory: string;
  date: string;
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
  day: string;
  F1studentNames: string[];
  F2studentNames: string[];
  F3studentNames: string[];
};

type MonthlyCleaningTableDataToPost = {
  day: string;
  names: string[];
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
};

export default StudentName;
