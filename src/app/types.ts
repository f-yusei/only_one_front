type DashboardData = {
  washerData: boolean[];
  dryerData: boolean[];
  showerData: boolean[];
  numberOfUsingBath: number;
};

type gotDashboardData = {
  id: string;
  state: number;
  timestamp: string;
};

type DisplayWasherAndDryerProps = {
  washerData: boolean[];
  dryerData: boolean[];
};

type DisplayShowerProps = {
  showerData: boolean[];
};

type DisplayPublicBathProps = {
  numberOfUsingBath: number;
};

export type {
  DashboardData,
  DisplayWasherAndDryerProps,
  DisplayShowerProps,
  DisplayPublicBathProps,
  gotDashboardData,
};
