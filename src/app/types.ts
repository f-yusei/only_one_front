type DashboardData = {
  yamaWasherData: boolean[];
  umiWasherData: boolean[];
  yamaDryerData: boolean[];
  umiDryerData: boolean[];
  yamaShowerData: boolean[];
  umiShowerData: boolean[];
  numberOfUsingBathData: number[];
};

type gotDashboardData = {
  id: string;
  state: number;
  timestamp: string;
};

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

export type {
  DashboardData,
  DisplayWasherProps,
  DisplayDryerProps,
  DisplayShowerProps,
  DisplayPublicBathProps,
  gotDashboardData,
};
