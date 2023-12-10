import { create } from 'zustand';
import { UserData } from '../types';

type Action = {
  setAccount: (account: string) => void;
};

export const useStore = create<UserData & Action>()((set) => ({
  account: 'noUser',
  studentId: 'noUser',
  setAccount: (account) => set((state) => ({ account: (state.account = account) })),
}));
