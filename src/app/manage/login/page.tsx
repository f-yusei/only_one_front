'use client';
import authApi from '@/api/authApi';
import { useAccountStore } from '@/app/state/user';
import { LoginData } from '@/app/types';
import { Link } from '@chakra-ui/next-js';
import { FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (data: LoginData) => {
    const res = await authApi.postLogin(data);
    useAccountStore.getState().setAccount(res);
  };

  return (
    <VStack height="80vh" alignItems="center" justifyContent="center">
      <form>
        <FormControl>
          <FormLabel>学籍番号</FormLabel>
          <Input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          onClick={() =>
            handleSubmit({
              studentId,
              password,
            })
          }
        >
          Login
        </Button>
      </form>
      <Link href="/manage/register" fontSize="0.9rem" color="blue.500" fontWeight="bold" mt={4}>
        パスワードを作成していませんか？パスワード登録はこちらから
      </Link>
    </VStack>
  );
}
