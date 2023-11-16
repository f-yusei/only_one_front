'use client';
import { useParams } from 'next/navigation';
import React from 'react';

const IndividualConfirmationPage = () => {
  const param = useParams();
  return <div>{param.id}</div>;
};

export default IndividualConfirmationPage;
