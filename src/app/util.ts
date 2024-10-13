const changeTypeToDisplayName = (type: 'DR' | 'WA' | 'SW' | 'PB' | 'ALL'): string => {
  let changedName = '';
  switch (type) {
    case 'DR':
      changedName = '乾燥機';
      break;
    case 'WA':
      changedName = '洗濯機';
      break;
    case 'SW':
      changedName = 'シャワー室';
      break;
    case 'PB':
      changedName = '大浴場';
      break;
    default:
      break;
  }
  return changedName;
};
const changeDormToDisplayName = (dormitory: 'MOU' | 'SEA' | 'ALL' | 'CEN' | 'SPA'): string => {
  let changedName = '';
  switch (dormitory) {
    case 'MOU':
      changedName = '山寮';
      break;
    case 'SEA':
      changedName = '海寮';
      break;
    case 'CEN':
      changedName = '中寮';
    case 'SPA':
      changedName = '宙寮';
    default:
      break;
  }
  return changedName;
};

function toQueryString<T extends Record<string, string | number | boolean | undefined | null>>(
  params: T
): string {
  const queryParts: string[] = [];

  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  return queryParts.join('&');
}

const countTrueValues = (data: boolean[]) => {
  if (!data) {
    return 0;
  }
  return data.filter((value) => value).length;
};

function convertToDataArray(
  datasets: {
    label: string;
    data: number[];
  }[]
): number[][] {
  return datasets.map((dataset) => dataset.data);
}

const util = {
  changeTypeToDisplayName,
  changeDormToDisplayName,
  toQueryString,
  countTrueValues,
  convertToDataArray,
};

export default util;
