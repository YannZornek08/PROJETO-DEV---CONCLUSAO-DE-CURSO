import React, { createContext, useContext, useState, ReactNode } from "react";

type costumerContextType = {
  costumerId: string | null;
  setCostumerId: (id: string) => void;
};

const CostumerContext = createContext<costumerContextType>({
  costumerId: null,
  setCostumerId: () => {},
});

export const CostumerProvider = ({ children }: { children: ReactNode }) => {
  const [costumerId, setCostumerId] = useState<string | null>(null);
  return (
    <CostumerContext.Provider value={{ costumerId, setCostumerId }}>
      {children}
    </CostumerContext.Provider>
  );
}

export const useCostumer = () => useContext(CostumerContext);