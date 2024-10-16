'use client';

import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box bgColor="gray.100" height="100vh" width="100vw">
      <h1>エラーが発生しました</h1>
      <p>データ取得時にエラーが発生しました。しばらくしてからやり直してください。</p>
      <p>ステータスコード: {error.message || '不明'}</p>
      <button onClick={() => reset()}>リセットして再試行</button>
    </Box>
  );
}