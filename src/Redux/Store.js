import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from './api/RootApi';
import updateSlice from './slices/updateSlice';
import sectionsSlice from './slices/SectionSlice';
import sectionStep from './slices/SectionStep';
import ChatSlice from './slices/ChatSlic';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    update:updateSlice,
    section:sectionsSlice,
    step:sectionStep,
    chat:ChatSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
});

