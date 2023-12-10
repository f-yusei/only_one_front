'use client';
import { useCheckIsLoginNow } from '@/app/hooks/useCheckIsLoginNow';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const IndividualConfirmationPage = () => {
  const router = useRouter();

  const isLogin = useCheckIsLoginNow();
  useEffect(() => {
    if (!isLogin) {
      router.push('/manage/login');
    }
  }, [isLogin, router]);
  const param = useParams();
  return <div>{param.id}</div>;
};

export default IndividualConfirmationPage;
