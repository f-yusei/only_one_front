'use client';

import React from 'react';
import { BoxGrid } from '../../../../components/Analysis'; // BoxGridコンポーネントをインポート
import { Text } from '@chakra-ui/react';
import {useParams } from 'next/navigation';
const DmAnalysisPage: React.FC = () => {
  // データ定義
  const data = [true, false, true, false];
  const param = useParams();

  return (
    <div>
      <Text>{param.dormname} {param.floor} 乾燥機</Text>
      <BoxGrid data={data} />
    </div>
  );
};

export default DmAnalysisPage;
