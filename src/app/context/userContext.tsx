import React, { useState, createContext, ReactNode } from 'react';

type UserData = {
  account?: string;
  studentId?: string;
};

type UserStoreContext = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

const initialState: UserData = {
  account: undefined,
  studentId: undefined,
};

type Props = {
  children: ReactNode;
};

export const UserStoreContext = createContext({} as UserStoreContext);

const UserContextProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserData>(initialState);

  return (
    <UserStoreContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserContextProvider;
