import { ChartOptions } from 'chart.js';

export const useChart = (data: (number | null)[][], labels: string[]) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '過去1週間',
        data: data[0],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: '過去1ヶ月',
        data: data[1],
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)',
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: '過去半年',
        data: data[2],
        fill: false,
        borderColor: 'rgba(192, 192, 75, 1)',
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: '指定',
        data: data[3],
        fill: false,
        borderColor: 'rgba(192, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return { chartData };
};

export const useChartOptions = (type: string, filteredLabels: string[], currentTime: string) => {
  const yMax = type === 'PB' ? 10 : 4;
  const options: ChartOptions<'line'> = {
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        offset: false,
        ticks: {
          align: 'center',
          maxTicksLimit: 6,
          callback: (value, index) => {
            const label = filteredLabels[index];
            return label === currentTime ? `**${label}**` : label;
          },
        },
        suggestedMin: filteredLabels[0],
        suggestedMax: filteredLabels[filteredLabels.length - 1],
      },
      y: {
        min: 0,
        max: yMax,
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  };
  return options;
};
