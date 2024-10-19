import { useTransitions } from '@/app/hooks/useTransitions';
import util from '@/app/util';
import { ApiQueryParams } from '../types';

export const useAnalysis = (paramData:ApiQueryParams,bathNumber?: string) => {
  const { transitions, isLoading, error } = useTransitions(paramData);

  if (isLoading || error || transitions === undefined) {
    return { labels: [], initialData: [], isLoading, error };
  }

  // フィルタリング処理をtypeによって分岐
  let filteredData;
  if (paramData.type === 'DR' || paramData.type === 'WA') {
    filteredData = transitions
      .filter((item) => item.dormitory !== null)
      .find((item) => item.floor?.toString() === paramData.floor);
  } else if (paramData.type === 'SW') {
    filteredData = transitions
      .filter((item) => item.dormitory !== null)
      .find((item) => item.dormitory?.toString() === paramData.dormitory);
  } else if (paramData.type === 'PB' && bathNumber) {
    filteredData = transitions
      .filter((item) => item.No !== null)
      .find((item) => item.No?.toString() === bathNumber);
  }

  if (filteredData === undefined) {
    return { labels: [], initialData: [], isLoading: false, error: 'データが正常に取得できませんでした。' };
  }

  const initialData = util.convertToDataArray(filteredData.data.datasets);
  const labels = filteredData.data.labels;

  return { labels, initialData, isLoading, error };
};
