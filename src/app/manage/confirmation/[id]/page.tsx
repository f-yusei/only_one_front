'use client';
import { useCheckIsLoginNow } from '@/app/hooks/useCheckIsLoginNow';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const IndividualConfirmationPage = () => {
  const router = useRouter();

  const isLogined = useCheckIsLoginNow();
  if (!isLogined) {
    router.push('/login');
  }
  const param = useParams();
  return <div>{param.id}</div>;
};

export default IndividualConfirmationPage;
