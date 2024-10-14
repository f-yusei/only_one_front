'use client';

import React from 'react';
import { BoxGrid } from '@/app/components/BoxGrid';
import { Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
const SrAnalysisPage: React.FC = () => {
  // データ定義
  const param = useParams<{ dormitory: string }>();

  return (
    <div>
      <Text>{param.dormitory} シャワー室</Text>
      <BoxGrid type="SW" dormitory={param.dormitory} floor={null} />
    </div>
  );
};

export default SrAnalysisPage;
