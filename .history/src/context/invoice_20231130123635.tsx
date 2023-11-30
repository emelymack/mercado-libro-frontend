import { createContext, useContext, useState } from 'react';

const IdContext = createContext({
    id: "",
    setId: (newId: string) => {},
  })

export const IdProvider = ({ children }) => {
  const [id, setId] = useState("");

  return (
    <IdContext.Provider value={{ id, setId }}>
      {children}
    </IdContext.Provider>
  );
};

export const useId = () => useContext(IdContext);