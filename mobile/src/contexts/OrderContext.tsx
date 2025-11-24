import React, { createContext, useContext, useState, ReactNode } from "react";

type OrderContextType = {
  orderId: string | null;
  setOrderId: (id: string) => void;
  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextType>({
  orderId: null,
  setOrderId: () => {},
  resetOrder: () => {},
});

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const orderOpen = !!orderId; // true se orderId não for null

  const resetOrder = () => {
    setOrderId(null);
  };

  return (
    <OrderContext.Provider value={{ orderId, setOrderId, resetOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
