import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  language: 'EN' | 'ZH';
  currency: 'USD' | 'EUR' | 'GBP' | 'CNY';
  searchQuery: string;
}

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: 'EN' | 'ZH' }
  | { type: 'SET_CURRENCY'; payload: 'USD' | 'EUR' | 'GBP' | 'CNY' }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    language: 'EN',
    currency: 'USD',
    searchQuery: ''
  });
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};