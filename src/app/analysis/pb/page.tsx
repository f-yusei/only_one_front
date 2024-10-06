'use client';
import React from 'react';
import { Chart as ChartJS,  LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

import Analysis from '../../components/Analysis';  

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const generateLabels = () => {
const labels = [];
for (let i = 0; i < 24 * 12; i++) {
  const hour = Math.floor(i / 12);
  const minute = (i % 12) * 5;
  labels.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
}
return labels;
};

// データ生成関数
const generateData = (length: number) => {
return Array.from({ length }, () => Math.floor(Math.random() * 11));
};



const PbAnalysisPage: React.FC = () => {
  const labels = generateLabels();
  const data = [
    generateData(24 * 12),  // 1日
    generateData(24 * 12),  // 1週間
    generateData(24 * 12),  // 1ヶ月
    generateData(24 * 12),  // 半年
  ];

  return (
    <div>
      <Analysis initialLabels={labels} initialData={data} />
    </div>
  );
};

export default PbAnalysisPage;