'use client';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CleaningAllData } from '@/app/types';
import { CollapseEx } from '@/app/components/CommonFunction';
import { useCheckIsLoginNow } from '@/app/hooks/useCheckIsLoginNow';

const TeacherConfirmationPage = () => {
  const router = useRouter();

  const isLogin = useCheckIsLoginNow();
  useEffect(() => {
    if (!isLogin) {
      router.push('/manage/login');
    }
  }, [isLogin, router]);
  const cleaningAllData: CleaningAllData = [
    {
      date: '2021-10-01',
      cleaningData: [
        {
          id: '1',
          times: 1,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 1,
        },
        {
          id: '2',
          times: 2,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 2,
        },
      ],
    },
    {
      date: '2021-10-02',
      cleaningData: [
        {
          id: '2',
          times: 1,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 1,
        },
      ],
    },
    {
      date: '2021-10-03',
      cleaningData: [
        {
          id: '3',
          times: 1,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 1,
        },
      ],
    },
    {
      date: '2021-10-04',
      cleaningData: [
        {
          id: '4',
          times: 1,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 1,
        },
      ],
    },
    {
      date: '2021-10-05',
      cleaningData: [
        {
          id: '5',
          times: 1,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 1,
        },
      ],
    },
    {
      date: '2021-10-06',
      cleaningData: [
        {
          id: '6',
          times: 1,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 1,
        },
      ],
    },
    {
      date: '2021-10-07',
      cleaningData: [
        {
          id: '7',
          times: 1,
          cleaningType: '週例清掃',
          dormitory: '山寮',
          floor: 1,
        },
      ],
    },
  ];

  const handleClick = (id: string) => {
    router.push(`/manage/confirmation/${id}`);
  };

  return (
    <Box>
      <VStack>
        {cleaningAllData.map((cleaningData) => {
          return (
            <CollapseEx key={cleaningData.date} day={cleaningData.date}>
              <HStack>
                {cleaningData.cleaningData.map((data) => {
                  return (
                    <Button key={data.id} onClick={() => handleClick(data.id)}>
                      <Text>{cleaningData.date}</Text>
                      <Text>
                        第{data.times}回 {data.dormitory} {data.cleaningType} {data.floor}階
                      </Text>
                    </Button>
                  );
                })}
              </HStack>
            </CollapseEx>
          );
        })}
      </VStack>
    </Box>
  );
};

export default TeacherConfirmationPage;
