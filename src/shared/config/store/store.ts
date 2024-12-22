import { configureStore } from '@reduxjs/toolkit'
import { workerReducer } from '@/entities/worker'
import { cacheMiddleware, getCachedData } from '@/shared/lib/store/middleware/cacheMiddleware'

const cachedData = getCachedData()

export const store = configureStore({
  reducer: {
    worker: workerReducer
  },
  preloadedState: cachedData ? {
    worker: cachedData
  } : undefined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cacheMiddleware.middleware)
}) 