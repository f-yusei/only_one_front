'use client';

import React from 'react';
import { BoxGrid } from '../../../../components/Analysis'; // BoxGridコンポーネントをインポート
import { Text } from '@chakra-ui/react';
import {useParams } from 'next/navigation';
const WmAnalysisPage: React.FC = () => {
  // データ定義
  //const data = [true, false, true, false];
  const param = useParams();

  return (
    <div>
      <Text>{param.dormname} {param.floor} 洗濯機</Text>
      <BoxGrid type = "DM" dormitory={param.dormname as string} floor={param.floor as string} />
    </div>
  );
};

export default WmAnalysisPage;