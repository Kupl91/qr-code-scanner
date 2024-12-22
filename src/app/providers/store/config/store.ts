import { configureStore } from '@reduxjs/toolkit';
import scanReducer from '@/entities/scan/model/scanSlice';

export const store = configureStore({
  reducer: {
    scan: scanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 