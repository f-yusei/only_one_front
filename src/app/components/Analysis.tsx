'use client';

import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text,Grid,FormControl, FormLabel, Input,HStack, Heading } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ChartOptions,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '@/api/api';
import { DashboardDetailResponse, DormData } from '../types';
import utill from '../util';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export const BoxGrid: React.FC<DormData> = (dormData) => {
  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());
  const [dashboardData, setDashboardData] = useState<DashboardDetailResponse>();
  const [loading, setLoading] = useState(true); // ローディングの状態を管理

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // 1分ごとに時間を更新
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true); // データ取得中
  //     try {
  //       // APIからデータを取得 (例)
  //       const response = await api.getDashboardDetail(dormData);
  //       setDashboardData(response);
  //     } catch (error) {
  //       console.error('データ取得エラー:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [dormData]);

 const data = [false,false,true,false];
   
  return (
    <div>
      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
     <Box
      w="100%"
      p={5} // 全体のパディング
      bg="gray.50" // 背景色を薄いグレーに
      borderRadius="md"
      boxShadow="lg" // シャドウを追加
      mb={6} // 下にマージンを追加して他のコンポーネントとの距離を取る

    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center" // テキストを中央揃え
       
        mb={4} // 下にスペースを追加
        borderBottom="2px solid" // 下にボーダーを追加して見出しを強調
        borderColor="gray.300" // ボーダーの色
        pb={2} // ボーダーとの間にスペースを追加
      >
        現在の利用状況
      </Text>

      <SimpleGrid spacing={3}>
        <Grid 
          templateColumns="repeat(2, 1fr)" 
          gap={4} 
          w="90vw" 
          margin="0 auto"
        >
          {data.map((value, index) => (
            <Box
              key={index}
              w="100%"
              h="15vh" // 高さを少し増やす
              bg={value ? 'rgba(255, 255, 102, 0.3)' : 'white'}
              border="1px solid"
              borderColor='gray.500'
              borderRadius="md"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={6} // パディングを増やして余白を広げる
              boxShadow="md" // 各ボックスにもシャドウを追加
            >
              <Text fontSize="3xl" fontWeight="bold">
                {utill.changeTypeToDisplayName("DR")} {index + 1}
              </Text>

              {value ? (
                <>
                  <Text
                    fontSize="2xl" // フォントサイズを大きく
                    color="red.500"
                    fontWeight="bold"
                    mt={4} // 上にスペースを追加
                  >
                    使用中
                  </Text>
                  <Text fontSize="lg" color="gray.600">
                    経過時間: 15 分
                  </Text>
                </>
              ) : (
                <>
                  <Text fontSize="2xl" color="green.500" fontWeight="bold" mt={4} mb={6}>
                    使用可能
                  </Text>
                  <Text fontSize="lg" color="gray.600">
                    {/* 空のテキスト */}
                  </Text>
                </>
              )}
            </Box>
          ))}
        </Grid>
      </SimpleGrid>
    </Box>
    </div>
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
        label: '指定',
        data: data[0],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: '過去1週間',
        data: data[1],
        fill: false,
        borderColor: 'rgba(192, 75, 192, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: '過去1ヶ月',
        data: data[2],
        fill: false,
        borderColor: 'rgba(192, 192, 75, 1)',
        borderWidth: 1,
        pointRadius: 0,
      },
      {
        label: '過去半年',
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

  const filteredLabels = initialLabels.filter((label) => label >= startTime && label <= endTime);
  const filteredData = initialData.map((data) =>
    data.slice(initialLabels.indexOf(startTime), initialLabels.indexOf(endTime) + 1)
  );

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
            return label === currentTime ? `**${label}**` : label; // 修正箇所: テンプレートリテラルの使用
          },
        },
        min: filteredLabels[0],
        max: filteredLabels[filteredLabels.length - 1],
      },
      y: {
        min: 0,
        max: 4,
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
          mode: 'x' as const,
        },
        pan: {
          enabled: true,
          mode: 'x' as const,
        },
      },
    },
  };
  
  const today = new Date();
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  const formattedToday = today.toISOString().split('T')[0];
  const formattedSixMonthsAgo = sixMonthsAgo.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(formattedSixMonthsAgo);
  const [endDate, setEndDate] = useState(formattedToday);

  return (
    <Box
    w="100%"
    h="560px"
    p={5} // 全体のパディング
    bg="gray.50" // 背景色を薄いグレーに
    borderRadius="md"
    boxShadow="lg" // シャドウを追加
    mb={6} // 下にマージンを追加して他のコンポーネントとの距離を取る

  >
        <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center" // テキストを中央揃え
       
        mb={4} // 下にスペースを追加
        borderBottom="2px solid" // 下にボーダーを追加して見出しを強調
        borderColor="gray.300" // ボーダーの色
        pb={2} // ボーダーとの間にスペースを追加
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
              <Input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
              />
            </FormControl>

            <FormControl id="end-time">
              <FormLabel>終了時間:</FormLabel>
              <Input 
                type="time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)} 
              />
            </FormControl>
          </HStack>
        </Box>
        
        <div style={{ height: '100%', width: '100%' }}>
          <LineChart data={filteredData} labels={filteredLabels} options={options} />
        </div>
      </Box>
    </Box>
  );
};

export default Analysis;
