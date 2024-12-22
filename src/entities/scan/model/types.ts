export interface ScanField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date';
  value: string;
  required?: boolean;
}

export interface ScanResult {
  id: string;
  code: string;
  type: 'barcode' | 'qr';
  timestamp: number;
  fields: ScanField[];
}

export interface ScanState {
  currentScan: ScanResult | null;
  isScanning: boolean;
  error: string | null;
} 