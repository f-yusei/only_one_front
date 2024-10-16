'use client';
import { DormitoryMobileComponent } from '../components/MobileComponent';
import { useDashboardDataStatuses } from '../hooks/useDashboardData';
import { DormData } from '../types';

const UmiDashboardPage = () => {
  const dormData: DormData = {
    dormitory: 'SEA',
    type: 'ALL',
  };

  const { dashboardDataStatuses, error, isLoading } = useDashboardDataStatuses(dormData);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (dashboardDataStatuses === undefined || error) {
    return <div>{error}</div>;
  }

  const { showerStatusArray, washerStatusArray, dryerStatusArray } = dashboardDataStatuses;

  return (
    <DormitoryMobileComponent
      showerData={showerStatusArray}
      washerData={washerStatusArray}
      dryerData={dryerStatusArray}
      dormitory="SEA"
    />
  );
};

export default UmiDashboardPage;
