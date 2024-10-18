'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, FormControl, FormLabel, Input, HStack } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { AnalysisProps, LineChartProps } from '../types';
import { useChart, useChartOptions } from '../hooks/useChart';
import util from '../util';
import { useDayInfo } from '../hooks/useDayInfo';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LineChart: React.FC<LineChartProps> = ({ data, labels, options }) => {
  const { chartData } = useChart(data, labels);
  return <Line data={chartData} options={options} />;
};

const Analysis: React.FC<AnalysisProps> = ({ initialLabels, initialData }) => {
  const { formattedToday, formattedSixMonthsAgo } = useDayInfo();

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [startDate, setStartDate] = useState(formattedSixMonthsAgo);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);
    const currentHours = now.getHours();

    start.setHours(currentHours - 4);
    start.setMinutes(0);

    end.setHours(currentHours + 1);
    end.setMinutes(0);

    setStartTime(util.formatTime(start));
    setEndTime(util.formatTime(end));
    setCurrentTime(util.formatTime(now));

    if (typeof window !== 'undefined') {
      import('chartjs-plugin-zoom').then((zoomPlugin) => {
        ChartJS.register(zoomPlugin.default);
      });
    }
  }, []);

  const startTimeIndex =
    (Number(startTime.split(':')[0]) * 60 + Number(startTime.split(':')[1])) / 5;
  const endTimeIndex = (Number(endTime.split(':')[0]) * 60 + Number(endTime.split(':')[1])) / 5;

  const filteredLabels = initialLabels.filter((_, index) => {
    return startTimeIndex <= index && index <= endTimeIndex;
  });
  const filteredData = initialData.map((aaa) => {
    return aaa.filter((_, index) => {
      return startTimeIndex <= index && index <= endTimeIndex;
    });
  });

  const options = useChartOptions(filteredLabels, currentTime);
  return (
    <Box w="100%" h="56vh" p={5} bg="gray.50" borderRadius="md" boxShadow="lg" mb={6} overflow="auto">
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        borderBottom="2px solid"
        borderColor="gray.300"
        pb={2}
      >
        過去の利用データ
      </Text>

      <Box height="30vh">
        <Box p={4}>
          <HStack spacing={4}>
            <FormControl id="start-date">
              <FormLabel>日付:</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={formattedToday} // 最大値を今日の日付に設定
              />
            </FormControl>

            <FormControl id="start-time">
              <FormLabel>開始時間:</FormLabel>
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </FormControl>

            <FormControl id="end-time">
              <FormLabel>終了時間:</FormLabel>
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </FormControl>
          </HStack>
        </Box>

        <Box style={{ height: '100%', width: '100%' }}>
          <LineChart data={filteredData} labels={filteredLabels} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default Analysis;
