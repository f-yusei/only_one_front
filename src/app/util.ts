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

const utill = {
  changeTypeToDisplayName,
  toQueryString,
};

export default utill;
