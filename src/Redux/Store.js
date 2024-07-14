import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from './api/RootApi';
import updateSlice from './slices/updateSlice';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    update:updateSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
});

