type DashboardData = {
  washerData: boolean[];
  dryerData: boolean[];
  showerData: boolean[];
  numberOfUsingBath: number;
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
};
