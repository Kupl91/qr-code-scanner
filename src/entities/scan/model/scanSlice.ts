import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScanState, ScanResult } from './types';

const initialState: ScanState = {
  currentScan: null,
  isScanning: false,
  error: null,
};

export const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    startScanning: (state) => {
      state.isScanning = true;
      state.error = null;
    },
    stopScanning: (state) => {
      state.isScanning = false;
    },
    setScanResult: (state, action: PayloadAction<ScanResult>) => {
      state.currentScan = action.payload;
      state.isScanning = false;
    },
    clearScanResult: (state) => {
      state.currentScan = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isScanning = false;
    },
    saveScanResult: (state, action: PayloadAction<ScanResult>) => {
      state.currentScan = action.payload;
    },
  },
});

export const { startScanning, stopScanning, setScanResult, clearScanResult, setError, saveScanResult } = scanSlice.actions;
export default scanSlice.reducer; 