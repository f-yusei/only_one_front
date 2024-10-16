'use client';
import { DormitoryMobileComponent } from '../components/MobileComponent';
import { useDashboardDataStatuses } from '../hooks/useDashboardData';
import { DormData } from '../types';

const YamaDashboardPage = () => {
  const dormData: DormData = {
    dormitory: 'MOU',
    type: 'ALL',
  };
  const { dashboardDataStatuses, isError, isLoading } = useDashboardDataStatuses(dormData);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (dashboardDataStatuses === undefined || isError) {
    return <div>正常にデータが取得できませんでした。</div>;
  }

  return (
    <DormitoryMobileComponent
      showerData={dashboardDataStatuses.showerStatusArray}
      washerData={dashboardDataStatuses.washerStatusArray}
      dryerData={dashboardDataStatuses.dryerStatusArray}
      dormitory="MOU"
    />
  );
};

export default YamaDashboardPage;
