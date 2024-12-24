export interface BoxField {
  id: string;
  label: string;
  type: 'str' | 'select' | 'number' | 'textarea' | 'text' | 'date';
  value: string | number;
  options?: Array<{ label: string; value: string | number }>;
  required?: boolean;
}

export interface Box {
  id: string;
  productType: string;
  components: string[];
  serialNumber: string;
  location: string;
  status: string;
  fields: BoxField[];
}

export interface ScanBoxResponse {
  success: boolean;
  data?: Box;
  error?: string;
} 