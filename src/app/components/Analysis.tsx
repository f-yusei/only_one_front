'use client';

import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartOptions, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type BoxGridProps = {
  data: boolean[];
};


export const BoxGrid: React.FC<BoxGridProps> = ({ data }) => {
  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // 1分ごとに時間を更新
    return () => clearInterval(interval);
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} p={5}>
      {data.map((value, index) => (
        <Box
          key={index}
          w="150px"
          h="150px"
          bg={value ? 'blue.200' : 'white'}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="lg">データ {index + 1}</Text>
          <Text fontSize="sm">{currentTime}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

interface LineChartProps {
  data: number[][];
  labels: string[];
  options?: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ data, labels, options }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '1日',
        data: data[0],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: '1週間',
        data: data[1],
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: '1ヶ月',
        data: data[2],
        fill: false,
        borderColor: 'rgba(192, 192, 75, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: '半年',
        data: data[3],
        fill: false,
        borderColor: 'rgba(192, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
  };
  return <Line data={chartData} options={options} />;
};

interface AnalysisProps {
  initialLabels: string[];
  initialData: number[][];
}

const Analysis: React.FC<AnalysisProps> = ({ initialLabels, initialData }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const currentHours = now.getHours();

    const start = new Date(now);
    start.setHours(currentHours - 4);
    start.setMinutes(0);

    const end = new Date(now);
    end.setHours(currentHours + 1);
    end.setMinutes(0);

    const formatTime = (date: Date) => {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    setStartTime(formatTime(start));
    setEndTime(formatTime(end));
    setCurrentTime(formatTime(now));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('chartjs-plugin-zoom').then((zoomPlugin) => {
        ChartJS.register(zoomPlugin.default);
      });
    }
  }, []);

  const filteredLabels = initialLabels.filter(label => label >= startTime && label <= endTime);
  const filteredData = initialData.map(data => data.slice(initialLabels.indexOf(startTime), initialLabels.indexOf(endTime) + 1));

  const options: ChartOptions<'line'> = {
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
          }
        },
        min: filteredLabels[0],
        max: filteredLabels[filteredLabels.length - 1],
      },
      y: {
        min: 0,
        max: 10,
      },
    },
    // plugins: {

    //   zoom: {
    //     zoom: {
    //       wheel: {
    //         enabled: true,
    //       },
    //       pinch: {
    //         enabled: true,
    //       },
    //       mode: 'x' as const,
    //     },
    //     pan: {
    //       enabled: true,
    //       mode: 'x' as const,
    //     },
    //   },
    // },
  };

  return (
    <div>
      <div>
        <label>開始時間:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>終了時間:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <div style={{ height: '200px', width: '95%' }}>
        <LineChart data={filteredData} labels={filteredLabels} options={options} />
      </div>
    </div>
  );
};

export default Analysis;
