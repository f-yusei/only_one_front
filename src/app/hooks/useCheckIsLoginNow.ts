import { useAccountStore } from '../state/user';

export const useCheckIsLoginNow = () => {
  const account = useAccountStore((state) => state.account);
  if (account === 'ゲスト') {
    return false;
  } else {
    return true;
  }
};
