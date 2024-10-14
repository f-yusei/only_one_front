'use client';
import { DashboardDetailResponse, DormData } from '../types';
import { useEffect, useState } from 'react';
import api from '@/api/api';

function getStatusArrayByFloor(data: DashboardDetailResponse | undefined): boolean[][] {
  const statusArrayByFloor: boolean[][] = [];

  if (data) {
    // floorごとに分類するオブジェクト
    const floorMap: { [key: number]: boolean[] } = {};

    data.forEach((item) => {
      if (!floorMap[item.floor]) {
        floorMap[item.floor] = []; // 新しいfloorの場合は初期化
      }
      floorMap[item.floor].push(item.status); // floorごとにstatusを追加
    });

    // floorごとのstatus配列をboolean[][]に変換
    Object.keys(floorMap).forEach((floor) => {
      statusArrayByFloor.push(floorMap[Number(floor)]);
    });
  }

  return statusArrayByFloor;
}

export const useDashboardDataStatuses = (dormData: DormData) => {
  const [dashboardDetailData, setDashboardDetailData] = useState<DashboardDetailResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await api.getDashboardDetail(dormData);
        setDashboardDetailData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const showerData = dashboardDetailData?.filter((item) => item.type === 'SW');
  const bathData = dashboardDetailData?.filter((item) => item.type === 'PB');
  const dryerData = dashboardDetailData?.filter((item) => item.type === 'DR');
  const washerData = dashboardDetailData?.filter((item) => item.type === 'WA');

  const showerStatusArray = showerData?.map((item) => item.status) || [];
  const bathStatusArray = bathData?.map((item) => item.status) || [];
  const dryerStatusArrayByFloor = getStatusArrayByFloor(dryerData);
  const washerStatusArrayByFloor = getStatusArrayByFloor(washerData);

  const dashboardDataStatuses = {
    showerStatusArray: showerStatusArray,
    dryerStatusArray: dryerStatusArrayByFloor,
    washerStatusArray: washerStatusArrayByFloor,
    bathStatusArray: bathStatusArray,
  };

  return { dashboardDataStatuses, isLoading, isError };
};
