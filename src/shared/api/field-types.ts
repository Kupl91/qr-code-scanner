import { FieldType } from './types/field';

const BASE_URL = 'http://localhost:3001';

export const fieldTypesApi = {
  getFieldTypes: async (): Promise<FieldType[]> => {
    const response = await fetch(`${BASE_URL}/fieldTypes`);
    return response.json();
  },
  
  getFieldType: async (id: number): Promise<FieldType> => {
    const response = await fetch(`${BASE_URL}/fieldTypes/${id}`);
    return response.json();
  },
  
  createFieldType: async (data: Omit<FieldType, 'id'>): Promise<FieldType> => {
    const response = await fetch(`${BASE_URL}/fieldTypes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  updateFieldType: async (id: number, data: Partial<FieldType>): Promise<FieldType> => {
    const response = await fetch(`${BASE_URL}/fieldTypes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  deleteFieldType: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/fieldTypes/${id}`, {
      method: 'DELETE',
    });
  }
}; 