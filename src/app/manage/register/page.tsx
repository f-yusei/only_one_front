'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

export default function RegisterPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // フォームのバリデーションを行う
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }
    // フォームの送信処理を行う
    console.log('studentId:', studentId);
    console.log('password:', password);
    console.log('confirmPassword:', confirmPassword);
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>学籍番号</FormLabel>
            <Input
              type="studentId"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>パスワード（確認）</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </FormControl>
          {error && (
            <FormControl isInvalid>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          )}
          <Button type="submit">登録する</Button>
        </Stack>
      </form>
      <Box mt={4}>
        <Link href="/manage/login" color="blue.500" fontWeight="bold">
          もうパスワードは登録しましたか？ ログインはこちら
        </Link>
      </Box>
    </Box>
  );
}
