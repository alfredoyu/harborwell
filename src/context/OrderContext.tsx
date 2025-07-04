import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Order, ShippingAddress } from '../types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  shippingAddress: ShippingAddress | null;
}

type OrderAction =
  | { type: 'SET_SHIPPING_ADDRESS'; payload: ShippingAddress }
  | { type: 'CREATE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'SET_CURRENT_ORDER'; payload: Order | null }
  | { type: 'CLEAR_CURRENT_ORDER' };

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
} | null>(null);

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_SHIPPING_ADDRESS':
      return { ...state, shippingAddress: action.payload };
    
    case 'CREATE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        currentOrder: action.payload
      };
    
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    
    case 'SET_CURRENT_ORDER':
      return { ...state, currentOrder: action.payload };
    
    case 'CLEAR_CURRENT_ORDER':
      return { ...state, currentOrder: null };
    
    default:
      return state;
  }
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
    currentOrder: null,
    shippingAddress: null
  });
  
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};