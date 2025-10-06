import React, { createContext, useContext, useState, ReactNode } from "react";

type OrderContextType = {
  orderId: string | null;
  setOrderId: (id: string) => void;
};

const OrderContext = createContext<OrderContextType>({
  orderId: null,
  setOrderId: () => {},
});

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderId, setOrderId] = useState<string | null>(null);

  return (
    <OrderContext.Provider value={{ orderId, setOrderId }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
