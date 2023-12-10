import { create } from 'zustand';
import { UserData } from '../types';

type Action = {
  setAccount: (account: UserData) => void;
};

export const useAccountStore = create<UserData & Action>()((set) => ({
  account: 'ゲスト',
  studentId: 'ゲスト',
  setAccount: (account) =>
    set((state) => ({
      account: (state.account = account.account),
      studentId: (state.studentId = account.studentId),
    })),
}));
