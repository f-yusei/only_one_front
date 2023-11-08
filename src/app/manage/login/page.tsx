'use client';
import { Link } from '@chakra-ui/next-js';
import { FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type LoginFormInputs = {
  studentId: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <VStack height="80vh" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>学籍番号</FormLabel>
          <Input type="studentId" {...register('studentId')} />
        </FormControl>
        <FormControl>
          <FormLabel>パスワード</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
      <Link href="/manage/register" fontSize="0.9rem" color="blue.500" fontWeight="bold" mt={4}>
        パスワードを作成していませんか？パスワード登録はこちらから
      </Link>
    </VStack>
  );
}
