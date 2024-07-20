import React, { ReactNode, createContext, useState } from 'react';

interface IIdContextProps {
  id: number;
  currentList: (e: number) => void;
}

interface IIDProviderProps {
  children: ReactNode;
}

export const IdContext = createContext({} as IIdContextProps);

export function IdProvider({ children }: IIDProviderProps): JSX.Element {
  const [id, setId] = useState(0);

  const currentList = (e: number) => {
    setId(e);
  };

  return (
    <IdContext.Provider value={{ id, currentList }}>
      {children}
    </IdContext.Provider>
  );
}
