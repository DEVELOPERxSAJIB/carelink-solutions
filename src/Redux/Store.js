import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from './api/RootApi';
import updateSlice from './slices/updateSlice';
import sectionsSlice from './slices/SectionSlice';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    update:updateSlice,
    section:sectionsSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
});

