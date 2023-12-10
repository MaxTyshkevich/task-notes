import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
