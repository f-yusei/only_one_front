'use client';
import { DashboardDetailResponse, DormData } from '../types';
import { useEffect, useState } from 'react';
import api from '@/api/api';
import util from '../util';

function getStatusArrayByFloor(data: DashboardDetailResponse | undefined): boolean[][] {
  const statusArrayByFloor: boolean[][] = [];

  if (data) {
    // floorごとに分類するオブジェクト
    const floorMap: { [key: number]: boolean[] } = {};

    data.forEach((item) => {
      if (!floorMap[item.floor]) {
        floorMap[item.floor] = []; 
      }
      floorMap[item.floor].push(util.numToBool(item.status));
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
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getDashboardDetail(dormData);
        setDashboardDetailData(result);
      } catch (error) {
        setError('利用状況データの取得に失敗しました。');
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const showerData = dashboardDetailData?.filter((item) => item.type === 'SW');
  const bathData = dashboardDetailData?.filter((item) => item.type === 'PB');
  const dryerData = dashboardDetailData?.filter((item) => item.type === 'DR');
  const washerData = dashboardDetailData?.filter((item) => item.type === 'WA');

  const showerStatusArray = showerData?.map((item) => util.numToBool(item.status)) || [];
  const dryerStatusArrayByFloor = getStatusArrayByFloor(dryerData);
  const washerStatusArrayByFloor = getStatusArrayByFloor(washerData);

  const dashboardDataStatuses = {
    showerStatusArray: showerStatusArray,
    dryerStatusArray: dryerStatusArrayByFloor,
    washerStatusArray: washerStatusArrayByFloor,
    bathData: bathData,
  };

  return { dashboardDataStatuses, isLoading, error };
};
