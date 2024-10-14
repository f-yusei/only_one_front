'use client';
import { DormitoryMobileComponent } from '../components/MobileComponent';
import { useDashboardDataStatuses } from '../hooks/useDashboardData';
import { DormData } from '../types';

const YamaDashboardPage = () => {
  const dormData: DormData = {
    dormitory: 'MOU',
    floor: null,
    type: 'ALL',
  };
  const { dashboardDataStatuses, isError, isLoading } = useDashboardDataStatuses(dormData);
  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!dashboardDataStatuses) {
    return <div>そもそもデータ取得できてねーぞ</div>;
  }
  if (isError) {
    return <div>なんかエラー出たぞ</div>;
  }

  if (!dashboardDataStatuses.showerStatusArray) {
    return <div>シャワーのデータがねえぞおおおおおおおおお</div>;
  }

  if (!dashboardDataStatuses.washerStatusArray) {
    return <div>洗濯機のデータがねえぞおおおおおおおおお</div>;
  }

  if (!dashboardDataStatuses.dryerStatusArray) {
    return <div>乾燥機のデータがねえぞおおおおおおおおお</div>;
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
