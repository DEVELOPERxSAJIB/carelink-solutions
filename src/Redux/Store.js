import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from './api/RootApi';

export const store = configureStore({
  reducer: {
   
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
});

