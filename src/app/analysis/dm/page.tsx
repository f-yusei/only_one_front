'use client';

import React from 'react';
import { BoxGrid } from '../../components/Analysis'; // BoxGridコンポーネントをインポート

const DmAnalysisPage: React.FC = () => {
  // データ定義
  const data = [true, false, true, false];

  return (
    <div>
      <BoxGrid data={data} />
    </div>
  );
};

export default DmAnalysisPage;
