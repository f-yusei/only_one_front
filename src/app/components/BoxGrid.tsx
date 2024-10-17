import api from '@/api/api';
import { Box, SimpleGrid, Grid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { DormData, DashboardDetailResponse } from '../types';
import util from '../util';

export const BoxGrid: React.FC<DormData> = (dormData) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [dashboardData, setDashboardData] = useState<DashboardDetailResponse>();
  const [loading, setLoading] = useState(true);

  // 現在時刻を1分ごとに更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.getDashboardDetail(dormData);
        setDashboardData(response);
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [dormData]);

  const calculateElapsedMinutes = (startTime: Date | null): string => {
    if (!startTime) {
      return '';
    }
    const elapsedMilliseconds = currentTime.getTime() - startTime.getTime();
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60)); // ミリ秒を分に変換
    const response = elapsedMinutes.toString() + '分';

    return response;
  };

  if (dashboardData === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box w="100%" p={5} bg="gray.50" borderRadius="md" boxShadow="lg" mb={6}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            mb={4}
            borderBottom="2px solid"
            borderColor="gray.300"
            pb={2}
          >
            現在の利用状況
          </Text>

          <SimpleGrid spacing={3}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="90vw" margin="0 auto">
              {dashboardData.map((value, index) => (
                <Box
                  key={index}
                  w="100%"
                  h="15vh"
                  bg={value.status ? 'rgba(255, 255, 102, 0.3)' : 'white'}
                  border="1px solid"
                  borderColor="gray.500"
                  borderRadius="md"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={6}
                  boxShadow="md"
                >
                  <Text fontSize="3xl" fontWeight="bold">
                    {util.changeTypeToDisplayName('DR')} {index + 1}
                  </Text>

                  {value.status == 0 && value.startedTime ? (
                    <>
                      <Text fontSize="2xl" color="red.500" fontWeight="bold" mt={4}>
                        使用中
                      </Text>
                      {/* 経過分数の表示 */}
                      <Text fontSize="lg" color="gray.600">
                        経過時間: {calculateElapsedMinutes(new Date(value.startedTime))}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text fontSize="2xl" color="green.500" fontWeight="bold" mt={4} mb={6}>
                        使用可能
                      </Text>
                      <Text fontSize="lg" color="gray.600"></Text>
                    </>
                  )}
                </Box>
              ))}
            </Grid>
          </SimpleGrid>
        </Box>
      )}
    </div>
  );
};
